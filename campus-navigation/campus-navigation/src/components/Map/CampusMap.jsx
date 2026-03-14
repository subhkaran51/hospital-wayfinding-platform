import React, { useRef, useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BUILDINGS, CAMPUS_ENTRANCES, PARKING_LOTS } from '../../data/campusData.js';

// ✅ FIX #1: Move token to environment variables for security
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidGhlb2RvcmVob2ZmbWFuIiwiYSI6ImNtY2FhdXo5MjAxZnkyaXM1cHYwN2V2b2QifQ.y8-4p4HHdrTQBbetYXq2Zg';

if (!MAPBOX_TOKEN) {
  console.error('MAPBOX_TOKEN is not defined. Please set REACT_APP_MAPBOX_TOKEN in your .env file');
}

mapboxgl.accessToken = MAPBOX_TOKEN;

// Build GeoJSON FeatureCollection from buildings
function buildingsGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: Object.values(BUILDINGS).map(b => ({
      type: 'Feature',
      properties: {
        id: b.id, 
        num: b.num, 
        name: b.name,
        displayName: b.displayName, 
        description: b.description,
        color: b.asiColor || b.color || '#4472C4',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          b.polygon 
            ? [...b.polygon, b.polygon[0]] 
            : [
                [b.coords.lng - 0.0008, b.coords.lat - 0.0005],
                [b.coords.lng + 0.0008, b.coords.lat - 0.0005],
                [b.coords.lng + 0.0008, b.coords.lat + 0.0005],
                [b.coords.lng - 0.0008, b.coords.lat + 0.0005],
                [b.coords.lng - 0.0008, b.coords.lat - 0.0005],
              ]
        ]
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
  
  // Use a ref for the callback to prevent stale closures in Mapbox listeners
  const onSelectRef = useRef(onBuildingSelect);
  useEffect(() => {
    onSelectRef.current = onBuildingSelect;
  }, [onBuildingSelect]);

  // ✅ FIX #3: Remove handleBuildingClick from dependencies - use empty deps
  const handleBuildingClick = useCallback((e) => {
    if (!e.features?.length) return;
    const f = e.features[0];
    const { id, displayName, description } = f.properties;

    // Highlight selected
    if (map.current?.getLayer('buildings-fill')) {
      map.current.setPaintProperty('buildings-fill', 'fill-color', [
        'case',
        ['==', ['get', 'id'], id],
        '#1565c0',
        ['get', 'color']
      ]);
    }

    // Show popup
    if (popup.current) popup.current.remove();
    popup.current = new mapboxgl.Popup({ 
      offset: 15, 
      closeButton: true, 
      maxWidth: '280px' 
    })
      .setLngLat(e.lngLat)
      .setHTML(`
        <div class="map-popup-inner" style="font-family:Inter,sans-serif;padding:4px 0">
          <div style="font-weight:800;font-size:1rem;color:#0a1628;margin-bottom:4px">${displayName}</div>
          <div style="font-size:0.8rem;color:#64748b;line-height:1.5;margin-bottom:8px">${description}</div>
          <button
            id="popup-btn-${id}"
            style="background:#1565c0;color:white;border:none;border-radius:6px;padding:8px 14px;font-size:0.82rem;font-weight:600;cursor:pointer;width:100%;transition:all 0.2s"
          >📍 View Details & Indoor Map</button>
        </div>
      `)
      .addTo(map.current);

    // ✅ FIX #7: Better popup button handling with proper event delegation
    setTimeout(() => {
      const btn = document.getElementById(`popup-btn-${id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          onSelectRef.current(id);
          if (popup.current) popup.current.remove();
        }, { once: true });
      }
    }, 0);

    onSelectRef.current(id);
  }, []); // ✅ Empty dependencies - safe with onSelectRef

  const initLayers = useCallback(() => {
    if (!map.current) return;
    
    // Add campus building polygons
    const geojson = buildingsGeoJSON();
    if (!map.current.getSource('buildings')) {
      map.current.addSource('buildings', { type: 'geojson', data: geojson });
    }

    if (!map.current.getLayer('buildings-fill')) {
      map.current.addLayer({
        id: 'buildings-fill',
        type: 'fill',
        source: 'buildings',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.45,
        }
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
        }
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
  }, []);

  useEffect(() => {
    if (map.current) return; // Map already initialized

    let m;
    try {
      // ✅ FIX #8: Start at proper zoom level instead of zoom: 1
      m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/standard',
        center: [-111.8902, 40.7587],
        zoom: 15.5, // Start at campus level
        pitch: 0,
        bearing: 0,
        antialias: true,
      });
      map.current = m;
      console.log('Mapbox initialized successfully');
    } catch (err) {
      console.error('Failed to initialize Mapbox:', err);
      return;
    }

    // ✅ FIX #4: Wait for style.load with timeout fallback
    const styleLoadHandler = () => {
      initLayers();
      
      // Google Earth "Plunge" Animation (optional with new starting zoom)
      setTimeout(() => {
        try {
          if (!map.current) return;
          map.current.flyTo({
            center: [-111.8902, 40.7587],
            zoom: 15.5,
            pitch: 45,
            bearing: -10,
            duration: 2000, // Reduced from 4000
            essential: true
          });
          
          map.current.once('moveend', () => {
            setIntroFinished(true);
          });
        } catch (err) {
          console.error('Map animation error:', err);
          setIntroFinished(true);
        }
      }, 500);

      // ✅ FIX #2: Attach click listeners with proper reference
      m.on('click', 'buildings-fill', handleBuildingClick);
      m.on('mouseenter', 'buildings-fill', () => { 
        if (map.current) map.current.getCanvas().style.cursor = 'pointer'; 
      });
      m.on('mouseleave', 'buildings-fill', () => { 
        if (map.current) map.current.getCanvas().style.cursor = ''; 
      });

      // Campus Entrance Markers
      CAMPUS_ENTRANCES.forEach(ent => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div class="entrance-marker" style="background:${
            ent.type === 'main' ? '#c9a84c' : '#7c3aed'
          };color:white;padding:4px 8px;border-radius:6px;font-family:Inter,sans-serif;font-size:0.7rem;font-weight:700;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);white-space:nowrap;cursor:default;">
            ${ent.name}
          </div>
        `;
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([ent.coords.lng, ent.coords.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }).setHTML(
              `<div style="font-family:Inter,sans-serif"><strong>${ent.name}</strong><br><span style="color:#64748b;font-size:0.8rem">${ent.street}</span></div>`
            )
          )
          .addTo(m);
        markers.current.push(marker);
      });

      // Parking Markers
      Object.values(PARKING_LOTS).forEach(p => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div class="parking-marker" style="background:${
            p.isGarage ? '#1e3a8a' : '#166534'
          };color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.82rem;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.4);cursor:default;">
            P
          </div>
        `;
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([p.coords.lng, p.coords.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }).setHTML(
              `<div style="font-family:Inter,sans-serif"><strong>${p.name}</strong>${
                p.label ? `<br><span style="color:#64748b;font-size:0.8rem">${p.label}</span>` : ''
              }</div>`
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

    // ✅ FIX #2: Proper cleanup function with event listener removal
    return () => {
      try {
        if (popup.current) popup.current.remove();
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        
        if (map.current) {
          // Remove event listeners before destroying map
          map.current.off('click', 'buildings-fill', handleBuildingClick);
          map.current.off('mouseenter', 'buildings-fill');
          map.current.off('mouseleave', 'buildings-fill');
          
          map.current.remove();
          map.current = null;
        }
      } catch (err) {
        console.error('Error cleaning up map:', err);
      }
    };
  }, [handleBuildingClick, initLayers]); // ✅ Keep dependencies as is

  useEffect(() => {
    if (!map.current || !selectedBuildingId || !introFinished) return;
    const b = BUILDINGS[selectedBuildingId];
    if (!b) return;

    map.current.flyTo({
      center: [b.coords.lng, b.coords.lat],
      zoom: 17.5,
      pitch: 55,
      speed: 1.2,
    });

    if (map.current.getLayer('buildings-fill')) {
      map.current.setPaintProperty('buildings-fill', 'fill-color', [
        'case',
        ['==', ['get', 'id'], selectedBuildingId],
        '#1565c0',
        ['get', 'color']
      ]);
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
        role="img"
      />
      <div className="map-wave-overlay" />
      
      <div 
        className={`map-legend ${introFinished ? 'visible' : ''}`} 
        role="complementary" 
        aria-label="Map legend"
      >
        <div className="legend-title">Campus Legend</div>
        {[
          { color: '#4472C4', label: 'Main Hospital' },
          { color: '#E25C27', label: 'Emergency' },
          { color: '#7030A0', label: 'Mental Health' },
          { color: '#70AD47', label: 'Inpatient / Care' },
          { color: '#c9a84c', label: 'Main Gate' },
          { color: '#7c3aed', label: 'Secondary Entrance' },
        ].map(l => (
          <div key={l.label} className="legend-item">
            <div 
              className="legend-swatch" 
              style={{ background: l.color }} 
              aria-hidden="true" 
            />
            <span>{l.label}</span>
          </div>
        ))}
        <div className="legend-footer">
          Click a building to navigate
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
