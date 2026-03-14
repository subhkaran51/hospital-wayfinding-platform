
import json
import re

# File path
file_path = r'e:\Project\full_project_backup\src\campus-navigation\src\data\campusData.js'

def audit_campus_data():
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Very rough extraction of JS objects using regex (since it's a JS file)
    # This is brittle, but helps find obvious missing IDs or broken refs.
    
    # 1. Search for ROOM IDs in FLOOR_DATA
    room_ids_in_floors = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
    
    # 2. Search for spatial IDs
    spatial_ids = re.findall(r"spatialId:\s*['\"]([^'\"]+)['\"]", content)
    
    # 3. Search for nodes in ROUTING_NODES
    nodes = re.findall(r"ROUTING_NODES = \{([\s\S]+?)\};", content)
    node_ids = []
    if nodes:
        node_ids = re.findall(r"['\"]?([^'\":\s]+)['\"]?:\s*\{", nodes[0])

    # 4. Search for edges in ROUTING_EDGES
    edges = re.findall(r"ROUTING_EDGES = \[([\s\S]+?)\];", content)
    broken_edges = []
    if edges:
        edge_data = re.findall(r"from:\s*['\"]([^'\"]+)['\"],\s*to:\s*['\"]([^'\"]+)['\"]", edges[0])
        for fr, to in edge_data:
            if fr not in node_ids:
                broken_edges.append(f"Broken edge 'from': {fr}")
            if to not in node_ids:
                broken_edges.append(f"Broken edge 'to': {to}")

    # 5. Check ALL_DEPARTMENTS
    depts = re.findall(r"ALL_DEPARTMENTS = \[([\s\S]+?)\];", content)
    broken_depts = []
    if depts:
        # Check if dept node (id) matches a room id or routing node
        dept_ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", depts[0])
        for d_id in dept_ids:
            # Note: ALL_DEPARTMENTS 'id' is for search, but 'spatialId' connects it.
            pass

    print(f"Audit Results:")
    print(f"Total Room IDs: {len(room_ids_in_floors)}")
    print(f"Total Spatial IDs: {len(spatial_ids)}")
    print(f"Total Routing Nodes: {len(node_ids)}")
    print(f"Broken Edges: {len(broken_edges)}")
    for be in broken_edges: print(f" - {be}")
    
    # Check for duplicate spatial IDs
    dupes = set([x for x in spatial_ids if spatial_ids.count(x) > 1])
    print(f"Duplicate Spatial IDs: {len(dupes)}")
    for d in dupes: print(f" - {d}")

audit_campus_data()
