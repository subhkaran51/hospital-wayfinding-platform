import { ROUTING_NODES, ROUTING_EDGES, PARKING_LOTS, BUILDINGS, ALL_DEPARTMENTS, FLOOR_DATA, CAMPUS_ENTRANCES } from './campusData.js';

/**
 * Dijkstra shortest path implementation
 * Optimized with defensive checks for the 127 bug resolution.
 */
function dijkstraSafe(startId, endId, accessibleOnly) {
  if (!ROUTING_NODES[startId] || !ROUTING_NODES[endId]) {
    console.error(`Routing error: Missing node ${!ROUTING_NODES[startId] ? startId : endId}`);
    return null;
  }
  
  const nodeIds = Object.keys(ROUTING_NODES);
  const dist = {}; const prev = {}; const unvisited = new Set(nodeIds);
  nodeIds.forEach(id => { dist[id] = Infinity; prev[id] = null; });
  dist[startId] = 0;

  while (unvisited.size) {
    let u = null;
    // Basic priority queue selection
    for (const id of unvisited) {
      if (dist[id] !== Infinity && (u === null || dist[id] < dist[u])) u = id;
    }
    
    if (!u || dist[u] === Infinity || u === endId) break;
    unvisited.delete(u);

    const edges = ROUTING_EDGES.filter(e => e.from === u || e.to === u);
    for (const e of edges) {
      if (accessibleOnly && e.type === 'stairs') continue;
      const nb = e.from === u ? e.to : e.from;
      if (!unvisited.has(nb)) continue;

      const alt = dist[u] + (e.cost || 1);
      if (alt < dist[nb]) {
        dist[nb] = alt;
        prev[nb] = { node: u, edge: e };
      }
    }
  }

  const path = []; let curr = endId;
  while (curr) { path.unshift(curr); curr = prev[curr]?.node ?? null; }
  return path.length > 1 ? path : null;
}

function getStepIcon(type) {
  const icons = { elevator:'🛗', tunnel:'🚇', stairs:'🪜', entrance:'🚪', parking:'🅿️', walking:'🚶', corridor:'➡️' };
  return icons[type] || '➡️';
}

function generateInstructions(path) {
  const steps = [];
  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i], toId = path[i+1];
    const edge = ROUTING_EDGES.find(e => (e.from===fromId&&e.to===toId)||(e.to===fromId&&e.from===toId));
    if (!edge) continue;
    const toNode = ROUTING_NODES[toId];
    steps.push({
      stepNum: i+1,
      type: edge.type,
      instruction: edge.instruction || `Proceed to ${toNode?.label || toId}`,
      landmark: toNode?.landmark || null,
      building: toNode?.building || null,
      floor: toNode?.floor || null,
      icon: getStepIcon(edge.type),
    });
  }
  return steps;
}

/**
 * Compute the shortest path between two points
 * @param {string} targetId - ID of the destination (dept or room)
 * @param {boolean} accessibleOnly - Whether to use only accessible paths
 * @param {string} arrivalType - 'emergency', 'scheduled', or 'tunnel'
 */
export function computeRoute(targetId, accessibleOnly = false, arrivalType = 'scheduled') {
  if (!targetId) return null;
  
  const dept = ALL_DEPARTMENTS.find(d => d.id === targetId || d.spatialId === targetId);
  const targetNode = dept ? dept.spatialId : targetId;

  // Resolve starting point
  let startNode = 'park-garage'; // Default
  const bldId = dept?.building || (targetId.startsWith('ASI-') ? targetId.split('-')[1] : null);
  
  if (bldId && BUILDINGS[bldId]) {
    if (arrivalType === 'emergency') {
      const ent = CAMPUS_ENTRANCES.find(e => e.building === bldId && e.type === 'emergency');
      if (ent) startNode = `ent-emergency-${bldId}`;
      else startNode = `ent-main-${bldId}`;
    } else if (arrivalType === 'tunnel') {
      startNode = `tunnel-${bldId}`;
    } else {
      startNode = `ent-main-${bldId}`;
    }
  }

  // Final fallback verification
  if (!ROUTING_NODES[startNode]) startNode = 'ent-main';
  if (!ROUTING_NODES[targetNode]) {
    console.warn(`Route target ${targetNode} not found in routing graph.`);
    return null;
  }

  const path = dijkstraSafe(startNode, targetNode, accessibleOnly);
  if (!path) return null;

  const steps = generateInstructions(path);
  let totalCost = 0;
  for (let i = 1; i < path.length; i++) {
    const e = ROUTING_EDGES.find(ed => (ed.from===path[i-1]&&ed.to===path[i])||(ed.to===path[i-1]&&ed.from===path[i]));
    totalCost += e?.cost || 1;
  }

  const pathBuildings = [...new Set(path.map(id => ROUTING_NODES[id]?.building).filter(Boolean))];
  const pathFloors = [...new Set(path.map(id => ROUTING_NODES[id]?.floor).filter(Boolean))];

  return { 
    department: dept, 
    steps, 
    estimatedMinutes: Math.max(2, totalCost * 2), 
    path, 
    buildings: pathBuildings, 
    floors: pathFloors, 
    accessibleOnly 
  };
}

export function searchDepartments(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return ALL_DEPARTMENTS.filter(d =>
    d.name.toLowerCase().includes(q) ||
    (d.tags || []).some(t => t.toLowerCase().includes(q)) ||
    d.buildingName.toLowerCase().includes(q)
  ).slice(0, 10);
}

export function recommendParking(buildingId) {
  if (!buildingId || !BUILDINGS[buildingId]) return PARKING_LOTS['P-GARAGE'];
  const b = BUILDINGS[buildingId];
  
  // Use explicit mapping if available
  if (b.parking && b.parking.length > 0) {
    return PARKING_LOTS[b.parking[0]] || PARKING_LOTS['P-GARAGE'];
  }
  
  // Distance-based heuristic
  let nearest = PARKING_LOTS['P-GARAGE'];
  let minDiff = Infinity;
  Object.values(PARKING_LOTS).forEach(p => {
    const diff = Math.abs(p.coords.lng - b.coords.lng) + Math.abs(p.coords.lat - b.coords.lat);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = p;
    }
  });
  return nearest;
}

export function getBuildingFloorData(buildingId, floor) {
  const fd = FLOOR_DATA[buildingId] || FLOOR_DATA['_generic'] || {};
  return fd[floor] || null;
}
