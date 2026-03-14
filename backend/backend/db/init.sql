-- INITIAL SCHEMA FOR CAMPUS NAVIGATION

CREATE EXTENSION IF NOT EXISTS postgis;

-- Buildings Table (Polygon geometries)
CREATE TABLE IF NOT EXISTS buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    geometry geometry(Polygon, 4326) -- SRID 4326 for GPS coords
);

-- Floors Table (Linked to blueprints)
CREATE TABLE IF NOT EXISTS floors (
    id SERIAL PRIMARY KEY,
    building_id INTEGER REFERENCES buildings(id) ON DELETE CASCADE,
    floor_level VARCHAR(50) NOT NULL,
    blueprint_url VARCHAR(255)
);

-- Departments / POIs
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    building_id INTEGER REFERENCES buildings(id) ON DELETE CASCADE,
    floor_id INTEGER REFERENCES floors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    operating_hours VARCHAR(255),
    phone VARCHAR(50),
    search_vector tsvector -- For full text search
);

-- Routing Nodes (Graph Vertices)
CREATE TABLE IF NOT EXISTS routing_nodes (
    id SERIAL PRIMARY KEY,
    floor_id INTEGER REFERENCES floors(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('elevator', 'stairs', 'entrance', 'room', 'hallway')),
    geom geometry(Point, 4326),
    is_accessible BOOLEAN DEFAULT true,
    description VARCHAR(255) -- "Main Lobby Information Desk"
);

-- Routing Edges (Graph Edges)
CREATE TABLE IF NOT EXISTS routing_edges (
    id SERIAL PRIMARY KEY,
    node_a INTEGER REFERENCES routing_nodes(id) ON DELETE CASCADE,
    node_b INTEGER REFERENCES routing_nodes(id) ON DELETE CASCADE,
    distance FLOAT NOT NULL, -- Weight
    type VARCHAR(50) CHECK (type IN ('hallway', 'tunnel', 'stairs', 'elevator')),
    is_accessible BOOLEAN DEFAULT true,
    instructions TEXT -- E.g. "Walk straight down the hallway"
);

-- Search Index
CREATE INDEX IF NOT EXISTS dept_search_idx ON departments USING GIN (search_vector);
