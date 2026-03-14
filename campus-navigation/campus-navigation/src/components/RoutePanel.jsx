import { CheckCircle, Clock, MapPin, Navigation } from 'lucide-react';

const STEP_STYLE = {
  elevator: { bg: '#4f46e5', icon: '🛗' },
  tunnel:   { bg: '#0369a1', icon: '🚇' },
  stairs:   { bg: '#d97706', icon: '🪜' },
  parking:  { bg: '#374151', icon: '🅿️' },
  entrance: { bg: '#c2410c', icon: '🚪' },
  corridor: { bg: '#059669', icon: '➡️' },
  walking:  { bg: '#059669', icon: '🚶' },
};

const Step = ({ step, isLast }) => {
  const s = STEP_STYLE[step.type] || STEP_STYLE.corridor;
  return (
    <div className="route-step" aria-label={`Step ${step.stepNum}: ${step.instruction}`}>
      <div className="step-col">
        <div className="step-dot" style={{ background: s.bg }} aria-hidden="true">
          {s.icon}
        </div>
        {!isLast && <div className="step-line-v" aria-hidden="true" />}
      </div>
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <div className="step-instr">{step.instruction}</div>
        {step.landmark && (
          <div className="step-lmrk">
            <MapPin size={10} aria-hidden="true" /> {step.landmark}
          </div>
        )}
        {step.building && step.floor && (
          <div className="step-detail">Building {step.building} · Level {step.floor}</div>
        )}
      </div>
    </div>
  );
};

const RoutePanel = ({ route, onClear, onViewIndoor }) => {
  if (!route) return null;

  return (
    <div role="region" aria-label="Step-by-step navigation route">

      {/* Header */}
      <div className="route-header">
        <div style={{ fontSize: '1.5rem', flexShrink: 0 }} aria-hidden="true">🗺️</div>
        <div style={{ flex: 1 }}>
          <div className="route-dept-name">{route.department?.name}</div>
          <div className="route-dept-loc">
            {route.department?.buildingName} · Level {route.department?.floor}
          </div>
        </div>
        <button
          onClick={onClear}
          style={{ background: 'rgba(255,255,255,.25)', border: 'none', color: 'white', borderRadius: '5px', padding: '0.2rem 0.55rem', cursor: 'pointer', flexShrink: 0, fontSize: '0.85rem' }}
          aria-label="Clear route and return to building list"
        >✕</button>
      </div>

      {/* Summary bar */}
      <div className="route-summary" role="status" aria-live="polite">
        <div>
          <div className="rs-stat-val">{route.estimatedMinutes ?? '—'} min</div>
          <div className="rs-stat-key">Est. Time</div>
        </div>
        <div>
          <div className="rs-stat-val">{route.steps?.length ?? 0}</div>
          <div className="rs-stat-key">Steps</div>
        </div>
        <div>
          <div className="rs-stat-val">{route.buildings?.length ?? 1}</div>
          <div className="rs-stat-key">Buildings</div>
        </div>
        {route.accessibleOnly && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', background: 'rgba(255,255,255,.12)', padding: '0.2rem 0.6rem', borderRadius: '20px', color: '#86efac' }}>
            ♿ Accessible
          </div>
        )}
      </div>

      {/* Parking start */}
      {route.parking && (
        <div className="parking-start">
          <span>🅿️</span>
          <div>
            <div style={{ fontWeight: 700 }}>Start: {route.parking.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>Recommended arrival parking</div>
          </div>
        </div>
      )}

      {/* Steps */}
      {(route.steps || []).map((step, i) => (
        <Step key={i} step={step} isLast={i === (route.steps.length - 1)} />
      ))}

      {/* Arrival */}
      <div className="route-step">
        <div className="step-col">
          <div className="step-dot" style={{ background: '#16a34a' }} aria-label="Arrived">
            <CheckCircle size={14} aria-hidden="true" />
          </div>
        </div>
        <div style={{ paddingTop: '4px', flex: 1 }}>
          <div className="step-instr" style={{ fontWeight: 700, color: '#15803d' }}>
            Arrived at {route.department?.name}
          </div>
          <div className="step-detail">ASI Spatial ID: {route.department?.spatialId}</div>
        </div>
      </div>

      {/* View indoor map CTA */}
      <button
        className="btn btn-secondary btn-full"
        style={{ marginTop: '0.9rem', width: '100%' }}
        onClick={onViewIndoor}
        aria-label="Open indoor floor plan for this department"
      >
        <Navigation size={14} aria-hidden="true" /> View Indoor Floor Plan
      </button>
    </div>
  );
};

export default RoutePanel;
