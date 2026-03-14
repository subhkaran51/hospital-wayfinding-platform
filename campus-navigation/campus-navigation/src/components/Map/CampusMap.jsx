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
    features: Object.values(BUILDINGS).map((b) => ({
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
      },
    })),
  };
}

const CampusMap = ({ onBuildingSelect, selectedBuildingId }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const popup = useRef(null);
  const [introFinished, setIntroFinished] = useState(false);

  const onSelectRef = useRef
