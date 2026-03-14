
import { ROUTING_NODES, ROUTING_EDGES, ALL_DEPARTMENTS, FLOOR_DATA, BUILDINGS } from './src/data/campusData.js';

function audit() {
  console.log('--- Campus Navigation Data Audit ---');
  let errors = 0;

  // 1. Check for Duplicate Node IDs
  const nodes = Object.keys(ROUTING_NODES);
  console.log(`Total Routing Nodes: ${nodes.length}`);

  // 2. Check for Broken Edges
  console.log('Checking Edges...');
  ROUTING_EDGES.forEach((edge, i) => {
    if (!ROUTING_NODES[edge.from]) {
      console.error(`Error: Edge ${i} has broken 'from' node: ${edge.from}`);
      errors++;
    }
    if (!ROUTING_NODES[edge.to]) {
      console.error(`Error: Edge ${i} has broken 'to' node: ${edge.to}`);
      errors++;
    }
  });

  // 3. Check for Searchable Departments vs Nodes
  console.log('Checking Departments...');
  ALL_DEPARTMENTS.forEach(dept => {
    let foundInFloors = false;
    Object.values(FLOOR_DATA).forEach(building => {
      Object.values(building).forEach(floor => {
        if (floor.rooms) {
          if (floor.rooms.find(r => r.spatialId === dept.spatialId)) foundInFloors = true;
        }
      });
    });
    if (!foundInFloors) {
      console.warn(`Warning: Department ${dept.name} (${dept.spatialId}) not found in any Floor Plan.`);
      errors++;
    }
  });

  // 4. Check for duplicate spatial IDs in Floor Plans
  const allSpatialIds = [];
  Object.entries(FLOOR_DATA).forEach(([bId, floors]) => {
    Object.entries(floors).forEach(([fId, data]) => {
      if (data.rooms) {
        data.rooms.forEach(room => {
          if (room.spatialId) {
            if (allSpatialIds.includes(room.spatialId)) {
              console.error(`Error: Duplicate Spatial ID found: ${room.spatialId} (Bldg ${bId}, Floor ${fId})`);
              errors++;
            }
            allSpatialIds.push(room.spatialId);
          }
        });
      }
    });
  });

  // 5. Check Building vs Floor levels
  console.log('Checking Building/Floor consistency...');
  Object.entries(BUILDINGS).forEach(([bId, bData]) => {
    if (!bData.levels) {
      console.error(`Error: Building ${bId} has no 'levels' defined.`);
      errors++;
    } else {
      bData.levels.forEach(lvl => {
        if (!FLOOR_DATA[bId] || !FLOOR_DATA[bId][lvl]) {
          console.warn(`Warning: Building ${bId} Level ${lvl} is defined in BUILDINGS but missing from FLOOR_DATA.`);
          errors++;
        }
      });
    }
  });

  // 6. Check Department Building references
  console.log('Checking Department Building references...');
  ALL_DEPARTMENTS.forEach(dept => {
    if (!BUILDINGS[dept.building]) {
      console.error(`Error: Department ${dept.name} references non-existent building: ${dept.building}`);
      errors++;
    }
  });

  console.log(`\nAudit Complete. Total Potential Bugs Found: ${errors}`);
}

audit();
