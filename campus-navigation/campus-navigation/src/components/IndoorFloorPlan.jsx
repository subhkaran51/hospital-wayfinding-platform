import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Navigation, Accessibility, Info, MapPin } from 'lucide-react';
import { BUILDINGS, FLOOR_DATA } from '../data/campusData.js';

// ASI Blueprint color mapping matching the real floor plan sheets
const ROOM_BG = {
  emergency:      '#fecaca',  // Red (Bldg 14 / Bldg 1 ER)
  department:     '#bfdbfe',  // Blue (Bldg 1 clinical)
  therapy:        '#bbf7d0',  // Green
  service:        '#f1f5f9',  // Light grey
  tunnel:         '#7dd3fc',  // Bright blue
  elevator:       '#c4b5fd',  // Purple
  waiting:        '#fef08a',  // Yellow
  nurse:          '#ddd6fe',  // Lavender
  restroom:       '#d9f99d',  // Light green
  stairs:         '#e2e8f0',  // Grey
  lab:            '#fbcfe8',  // Pink
  imaging:        '#fde68a',  // Amber
  'mental health':'#e9d5ff',  // Purple-light
  pharmacy:       '#a7f3d0',  // Mint
  admin:          '#fed7aa',  // Peach
  corridor:       '#d1d5db',  // Track grey
};

const ROOM_ICON = {
  elevator:'🛗', stairs:'🪜', restroom:'🚻', tunnel:'🚇',
  nurse:'👩‍⚕️', waiting:'🪑', emergency:'🚨', pharmacy:'💊',
  therapy:'🧘', lab:'🧬', imaging:'🩻', 'mental health':'🧠',
  department:'🏥', service:'🔧', admin:'📋',
};

const BUILDING_THEME = {
  B1:  { accent: '#1e3a8a', light: '#dbeafe', label: 'Blue' },   // ASI Blue
  B14: { accent: '#92400e', light: '#fed7aa', label: 'Orange' }, // ASI Orange
  _:   { accent: '#374151', light: '#f1f5f9', label: 'Grey' },
};

// Animated SVG nav path from bottom-center to a room centroid
function NavPathSVG({ room, accessible }) {
  if (!room) return null;
  const W = 800, H = 520;
  const pct = v => parseFloat(v) / 100;
  const rx = pct(room.left) * W + pct(room.w) * W / 2;
  const ry = pct(room.top)  * H + pct(room.h) * H / 2;
  const ex = W / 2, ey = H - 10;
  const color = accessible ? '#16a34a' : '#1565c0';
  const pts = `${ex},${ey} ${ex},${ry + 40} ${rx},${ry + 40} ${rx},${ry}`;
  return (
    <svg className="nav-path-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} />
        </marker>
      </defs>
      <polyline
        className="nav-path-line"
        points={pts}
        fill="none" stroke={color} strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="10 6"
        markerEnd="url(#arrowhead)"
      />
      <circle cx={ex} cy={ey} r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
      <circle className="nav-pulse-circle" cx={rx} cy={ry} r="9" fill={color} stroke="white" strokeWidth="2" />
    </svg>
  );
}

const IndoorFloorPlan = ({ buildingId, accessibleOnly, onBack }) => {
  const building = BUILDINGS[buildingId] || BUILDINGS['B1'];
  const floorMap = FLOOR_DATA[buildingId] || FLOOR_DATA['_generic'] || {};
  const levels = building.levels || ['G', '1'];
  const theme = BUILDING_THEME[buildingId] || BUILDING_THEME['_'];

  const defaultLevel = building.defaultLevel || levels[0];
  const [level, setLevel] = useState(defaultLevel);
  const [accessible, setAccessible] = useState(accessibleOnly || false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  // Reset selection when floor changes
  useEffect(() => {
    setSelectedRoom(null);
    setShowRoute(false);
  }, [level]);

  const floorData = floorMap[level] || { label: `Level ${level}`, rooms: [] };
  const rooms = floorData.rooms || [];
  const isRestricted = !!floorData.restricted;

  const handleRoomClick = useCallback((room) => {
    if (room.restricted || room.type === 'corridor') return;
    setSelectedRoom(room);
    setShowRoute(true);
  }, []);

  const handleNavigate = useCallback(() => {
    if (!selectedRoom) {
      const first = rooms.find(r => !r.restricted && r.type !== 'corridor');
      if (first) setSelectedRoom(first);
    }
    setShowRoute(true);
  }, [selectedRoom, rooms]);

  return (
    <div className="indoor-overlay" role="region" aria-label={`Indoor floor plan — ${building.displayName}`}>

      {/* Top bar */}
      <div className="indoor-topbar">
        <div className="indoor-topbar-left">
          <button
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,.15)', color: 'white', border: 'none', flexShrink: 0 }}
            onClick={onBack}
            aria-label="Return to campus map"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back
          </button>
          <div>
            <div className="indoor-building-name">{building.displayName}</div>
            <div className="indoor-floor-label">{floorData.label || `Level ${level}`}</div>
          </div>
        </div>

        {/* Floor tabs */}
        <div className="floor-switcher" role="tablist" aria-label="Floor selector">
          {levels.map(l => {
            const fd = floorMap[l];
            const restr = !!fd?.restricted;
            return (
              <button
                key={l}
                className={`floor-btn${level === l ? ' active' : ''}${restr ? ' restricted' : ''}`}
                role="tab"
                aria-selected={level === l}
                aria-label={`Level ${l}${restr ? ' — Restricted' : ''}`}
                title={fd?.label || `Level ${l}`}
                onClick={() => !restr && setLevel(l)}
              >
                {restr ? '🔒' : l}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="indoor-controls">
          <button
            className={`btn btn-sm ${accessible ? 'btn-primary' : ''}`}
            style={!accessible ? { background: 'rgba(255,255,255,.15)', color: 'white', border: 'none' } : {}}
            onClick={() => setAccessible(a => !a)}
            aria-pressed={accessible}
            title="Wheelchair accessible routes only"
          >
            <Accessibility size={14} aria-hidden="true" />
            {accessible ? 'Accessible ✓' : 'Accessible'}
          </button>
          <button
            className="btn btn-sm"
            style={{ background: theme.accent, color: 'white', border: 'none' }}
            onClick={handleNavigate}
            aria-label="Show navigation path"
          >
            <Navigation size={14} aria-hidden="true" /> Navigate
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="indoor-body">

        {/* Blueprint canvas */}
        <div className="indoor-map-area">
          <div
            className="floor-canvas-wrapper"
            style={{ borderColor: theme.accent }}
            role="img"
            aria-label={`${building.displayName} Level ${level} floor plan`}
          >
            {/* Building color accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 6,
              background: theme.accent, zIndex: 1,
            }} aria-hidden="true" />

            {/* Floor label watermark */}
            <div style={{
              position: 'absolute', bottom: 12, right: 16, zIndex: 1,
              fontSize: '2rem', fontWeight: 900, color: theme.accent,
              opacity: 0.1, pointerEvents: 'none', fontFamily: 'monospace',
            }} aria-hidden="true">
              {building.num} · L{level}
            </div>

            {/* Corridor lines */}
            <div className="corridor-h" style={{ top: '72%' }} aria-hidden="true" />
            <div className="corridor-v" style={{ left: '48%' }} aria-hidden="true" />

            {/* Rooms */}
            {rooms.map(room => {
              const isSelected = selectedRoom?.id === room.id;
              const isRestr = !!room.restricted;
              const bgColor = room.bg || ROOM_BG[room.type] || '#f8fafc';
              return (
                <div
                  key={room.id}
                  className={`room-cell${isSelected ? ' room-selected' : ''}${isRestr ? ' room-restricted' : ''}`}
                  style={{
                    top: room.top, left: room.left,
                    width: room.w, height: room.h,
                    background: bgColor,
                    borderColor: isSelected
                      ? 'var(--primary)'
                      : isRestr ? '#94a3b8' : 'rgba(0,0,0,.14)',
                    borderWidth: isSelected ? '2.5px' : '1.5px',
                  }}
                  onClick={() => handleRoomClick(room)}
                  role={isRestr ? 'img' : 'button'}
                  aria-label={`${room.name}${isRestr ? ' — Restricted' : ''}${room.spatialId ? ` — ID: ${room.spatialId}` : ''}`}
                  tabIndex={isRestr ? -1 : 0}
                  onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !isRestr) handleRoomClick(room); }}
                  title={room.description || room.name}
                >
                  <div className="room-cell-icon" aria-hidden="true">
                    {isRestr ? '🔒' : (ROOM_ICON[room.type] || '🏥')}
                  </div>
                  <div className="room-cell-name">{room.name}</div>
                  {room.spatialId && <div className="room-cell-id">{room.spatialId}</div>}
                  {room.landmark && <div className="room-landmark-star" aria-label="Landmark">⭐</div>}
                  {isRestr && <div className="room-restricted-lock" aria-hidden="true">🔒</div>}
                </div>
              );
            })}

            {/* Nav path SVG */}
            {showRoute && selectedRoom && (
              <NavPathSVG room={selectedRoom} accessible={accessible} />
            )}

            {/* Restricted overlay */}
            {isRestricted && (
              <div className="restricted-banner" role="alert">
                <div className="restricted-banner-inner">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔒</div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--navy)' }}>Restricted Level</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Level {level} is mapped for administrative completeness. No patient services on this floor. Access requires authorized credentials.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar — room details + steps */}
        <div className="indoor-sidebar">
          <div className="indoor-sidebar-header">
            <h3>{selectedRoom ? selectedRoom.name : 'Select a Room'}</h3>
            {selectedRoom?.spatialId && (
              <div className="sid">ASI Spatial ID: {selectedRoom.spatialId}</div>
            )}
          </div>
          <div className="indoor-sidebar-body">
            {selectedRoom ? (
              <>
                {selectedRoom.landmark && (
                  <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '7px', padding: '0.65rem 0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#92400e' }}>
                    ⭐ <strong>Wayfinding Landmark</strong> — use this room as a visual anchor.
                  </div>
                )}

                {selectedRoom.description && (
                  <div style={{ background: 'var(--surface)', borderRadius: '7px', padding: '0.65rem 0.75rem', marginBottom: '0.75rem', fontSize: '0.81rem', lineHeight: 1.6 }}>
                    <Info size={12} style={{ display: 'inline', marginRight: '0.3rem', color: 'var(--primary)', verticalAlign: 'middle' }} aria-hidden="true" />
                    {selectedRoom.description}
                  </div>
                )}

                {showRoute && (
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.65rem' }} aria-live="polite">
                      🗺️ Route to {selectedRoom.name}
                    </div>
                    {/* Step 1: Parking */}
                    <div className="route-step">
                      <div className="step-col">
                        <div className="step-dot" style={{ background: '#374151' }}>🅿️</div>
                        <div className="step-line-v" />
                      </div>
                      <div style={{ paddingTop: '4px', flex: 1 }}>
                        <div className="step-instr">Start at Parking Garage (Valdez Drive)</div>
                      </div>
                    </div>
                    {/* Step 2: Main Entrance */}
                    <div className="route-step">
                      <div className="step-col">
                        <div className="step-dot" style={{ background: '#c2410c' }}>🚪</div>
                        <div className="step-line-v" />
                      </div>
                      <div style={{ paddingTop: '4px', flex: 1 }}>
                        <div className="step-instr">Enter through {building.entrances[0]?.name}</div>
                        {building.entrances[0]?.name.includes('West') && (
                          <div className="step-lmrk"><MapPin size={10} aria-hidden="true" />Look for the American flag on your right</div>
                        )}
                      </div>
                    </div>
                    {/* Step 3: Elevator if needed */}
                    {level !== 'G' && (
                      <div className="route-step">
                        <div className="step-col">
                          <div className="step-dot" style={{ background: '#4f46e5' }}>🛗</div>
                          <div className="step-line-v" />
                        </div>
                        <div style={{ paddingTop: '4px', flex: 1 }}>
                          <div className="step-instr">{accessible ? 'Take Elevator Bank A' : 'Take Elevator or Stairs'} to Level {level}</div>
                          <div className="step-lmrk"><MapPin size={10} aria-hidden="true" />Elevator Bank A is past the Café (left corridor)</div>
                        </div>
                      </div>
                    )}
                    {/* Step 4: Arrive */}
                    <div className="route-step">
                      <div className="step-col">
                        <div className="step-dot" style={{ background: '#16a34a' }}>✓</div>
                      </div>
                      <div style={{ paddingTop: '4px', flex: 1 }}>
                        <div className="step-instr" style={{ fontWeight: 700, color: '#15803d' }}>Arrive at {selectedRoom.name}</div>
                        {selectedRoom.spatialId && (
                          <div className="step-detail">ASI Tag: {selectedRoom.spatialId}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👆</div>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Click any room on the floor plan to view details and get navigation steps.
                </p>
              </div>
            )}

            {/* Legend */}
            <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '0.9rem' }}>
              <div className="section-label" style={{ marginBottom: '0.5rem' }}>Legend</div>
              <div className="legend-grid">
                {[
                  ['#fecaca','Emergency / ER'],
                  ['#bfdbfe','Clinical Department'],
                  ['#bbf7d0','Therapy / Rehab'],
                  ['#fef08a','Waiting / Lobby'],
                  ['#7dd3fc','Tunnel Corridor'],
                  ['#c4b5fd','Elevator'],
                  ['#e9d5ff','Mental Health'],
                  ['#fbcfe8','Lab / Pathology'],
                  ['#a7f3d0','Pharmacy'],
                  ['#e2e8f0','Restricted / Service'],
                ].map(([color, label]) => (
                  <div key={label} className="legend-row">
                    <div className="legend-swatch" style={{ background: color }} aria-hidden="true" />
                    {label}
                  </div>
                ))}
                <div className="legend-row" style={{ color: '#d97706' }}>⭐ = Wayfinding Landmark</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndoorFloorPlan;
