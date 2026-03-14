// campus-navigation/campus-navigation/src/components/Map/CampusMap.jsx
import React, { useRef, useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BUILDINGS, CAMPUS_ENTRANCES, PARKING_LOTS } from '../../data/campusData.js';
import logger from '../../utils/logger.js';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  throw new Error('MAPBOX_TOKEN is required');
}

mapboxgl.accessToken = MAPBOX_TOKEN;

function buildingsGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: Object.values(BUILDINGS).map(b => ({
      type: 'Feature',
      id: b.id,
      properties: {
        id: b.id,
        num: b.num,
        name: b.name,
        displayName: b.displayName,
        description: b.description,
        color: b.color,
        height: b.height,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [b.polygon],
      }
    }))
  };
}

const CampusMap = ({ onBuildingSelect, selectedBuildingId }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const popup = useRef(null);
  const [introFinished, setIntroFinished] = useState(false);

  const onSelectRef = useRef(onBuildingSelect);
  useEffect(() => {
    onSelectRef.current = onBuildingSelect;
  }, [onBuildingSelect]);

  const handleBuildingClick = useCallback((e) => {
    if (!e.features?.length) return;
    const f = e.features[0];
    const { id, displayName, description } = f.properties;

    if (map.current?.getLayer('buildings-3d')) {
      map.current.setPaintProperty('buildings-3d', 'fill-extrusion-color', [
        'case',
        ['==', ['get', 'id'], id],
        '#1565c0',
        ['get', 'color']
      ]);
    }

    if (popup.current) popup.current.remove();
    popup.current = new mapboxgl.Popup({
      offset: 15,
      closeButton: true,
      maxWidth: '280px'
    })
      .setLngLat(e.lngLat)
      .setHTML(`
        <div class="map-popup-inner" style="font-family:Inter,sans-serif;padding:12px">
          <div style="font-weight:800;font-size:1rem;color:#0a1628;margin-bottom:8px">${displayName}</div>
          <div style="font-size:0.85rem;color:#64748b;line-height:1.5;margin-bottom:12px">${description}</div>
          <button class="popup-view-btn" style="background:#1565c0;color:white;border:none;border-radius:6px;padding:10px 16px;font-size:0.85rem;font-weight:600;cursor:pointer;width:100%;transition:all 0.2s">
            📍 View Details & Indoor Map
          </button>
        </div>
      `)
      .addTo(map.current);

    const popupElement = popup.current.getElement();
    if (popupElement) {
      const btn = popupElement.querySelector('.popup-view-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          onSelectRef.current(id);
          if (popup.current) popup.current.remove();
        }, { once: true });
      }
    }

    onSelectRef.current(id);
  }, []);

  const initLayers = useCallback(() => {
    if (!map.current) return;

    try {
      const geojson = buildingsGeoJSON();

      if (!map.current.getSource('buildings')) {
        map.current.addSource('buildings', {
          type: 'geojson',
          data: geojson
        });
      }

      if (!map.current.getLayer('buildings-3d')) {
        map.current.addLayer({
          id: 'buildings-3d',
          type: 'fill-extrusion',
          source: 'buildings',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              14,
              0,
              14.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.6,
          },
        }, 'water');
      }

      if (!map.current.getLayer('buildings-fill')) {
        map.current.addLayer({
          id: 'buildings-fill',
          type: 'fill',
          source: 'buildings',
          maxzoom: 14,
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.3,
          },
        });
      }

      if (!map.current.getLayer('buildings-outline')) {
        map.current.addLayer({
          id: 'buildings-outline',
          type: 'line',
          source: 'buildings',
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 2.5,
            'line-opacity': 0.9,
          },
        });
      }

      if (!map.current.getLayer('buildings-labels')) {
        map.current.addLayer({
          id: 'buildings-labels',
          type: 'symbol',
          source: 'buildings',
          layout: {
            'text-field': ['get', 'num'],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 14,
            'text-anchor': 'center',
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': 'rgba(0,0,0,0.7)',
            'text-halo-width': 2,
          }
        });
      }

      map.current.on('click', 'buildings-3d', handleBuildingClick);
      map.current.on('mouseenter', 'buildings-3d', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'buildings-3d', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      logger.info('Campus map layers initialized');
    } catch (err) {
      logger.error('Error initializing layers:', err);
    }
  }, [handleBuildingClick]);

  useEffect(() => {
    if (map.current) return;

    let m;
    try {
      m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/standard',
        center: [-111.8902, 40.7587],
        zoom: 15.5,
        pitch: 45,
        bearing: -10,
        antialias: true,
      });
      map.current = m;
      logger.info('Mapbox initialized');
    } catch (err) {
      logger.error('Failed to initialize Mapbox:', err);
      return;
    }

    const styleLoadHandler = () => {
      initLayers();

      setTimeout(() => {
        try {
          if (!map.current) return;
          map.current.flyTo({
            center: [-111.8902, 40.7587],
            zoom: 15.5,
            pitch: 45,
            bearing: -10,
            duration: 2000,
            essential: true
          });

          map.current.once('moveend', () => {
            setIntroFinished(true);
          });
        } catch (err) {
          logger.error('Map animation error:', err);
          setIntroFinished(true);
        }
      }, 500);

      // Add entrance markers
      CAMPUS_ENTRANCES.forEach(ent => {
        const el = document.createElement('div');
        el.style.cssText = `
          background: ${ent.type === 'main' ? '#c9a84c' : '#7c3aed'};
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,.3);
          white-space: nowrap;
        `;
        el.textContent = ent.name;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([ent.coords.lng, ent.coords.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }).setHTML(
              `<strong>${ent.name}</strong><br><span style="color:#64748b;font-size:0.8rem">${ent.street}</span>`
            )
          )
          .addTo(m);
        markers.current.push(marker);
      });

      // Add parking markers
      Object.values(PARKING_LOTS).forEach(p => {
        const el = document.createElement('div');
        el.style.cssText = `
          background: ${p.isGarage ? '#1e3a8a' : '#166534'};
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.82rem;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,.4);
        `;
        el.textContent = 'P';

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([p.coords.lng, p.coords.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }).setHTML(
              `<strong>${p.name}</strong>${p.label ? `<br><span style="color:#64748b;font-size:0.8rem">${p.label}</span>` : ''}`
            )
          )
          .addTo(m);
        markers.current.push(marker);
      });
    };

    if (m.isStyleLoaded?.()) {
      styleLoadHandler();
    } else {
      m.on('style.load', styleLoadHandler);
    }

    m.addControl(new mapboxgl.NavigationControl(), 'top-right');
    m.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-right');
    m.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    return () => {
      try {
        if (popup.current) popup.current.remove();
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        if (map.current) {
          map.current.off('click', 'buildings-3d', handleBuildingClick);
          map.current.off('mouseenter', 'buildings-3d');
          map.current.off('mouseleave', 'buildings-3d');
          map.current.remove();
          map.current = null;
        }
      } catch (err) {
        logger.error('Error cleaning up map:', err);
      }
    };
  }, [initLayers, handleBuildingClick]);

  useEffect(() => {
    if (!map.current || !selectedBuildingId || !introFinished) return;
    const b = BUILDINGS[selectedBuildingId];
    if (!b) return;

    try {
      map.current.flyTo({
        center: [b.coords.lng, b.coords.lat],
        zoom: 17.5,
        pitch: 55,
        speed: 1.2,
      });

      if (map.current.getLayer('buildings-3d')) {
        map.current.setPaintProperty('buildings-3d', 'fill-extrusion-color', [
          'case',
          ['==', ['get', 'id'], selectedBuildingId],
          '#1565c0',
          ['get', 'color']
        ]);
      }
    } catch (err) {
      logger.error('Error selecting building:', err);
    }
  }, [selectedBuildingId, introFinished]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#010b19'
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0
        }}
        aria-label="Interactive 3D Campus Map — George E. Whalen VA Medical Center"
        role="region"
      />
    </div>
  );
};

export default CampusMap;
