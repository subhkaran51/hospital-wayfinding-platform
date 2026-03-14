import { Building2, MapPin, Clock, Navigation } from 'lucide-react';
import { BUILDINGS, ALL_DEPARTMENTS } from '../data/campusData.js';
import { recommendParking } from '../data/navigationEngine.js';

const DEPT_ICON = {
  emergency:'🚨', pharmacy:'💊', clinic:'🏥', therapy:'🧘',
  lab:'🧬', admin:'📋', service:'☕', 'mental health':'🧠',
  department:'🏥', imaging:'🩻',
};

const DEPT_CLASS = {
  emergency:'dept-emergency', clinic:'dept-clinic', therapy:'dept-therapy',
  lab:'dept-lab', service:'dept-service', 'mental health':'dept-mental',
  admin:'dept-admin', department:'dept-clinic', pharmacy:'dept-clinic',
};

const BuildingInfoPanel = ({ buildingId, onClose, onNavigate, onSelectDept }) => {
  const building = BUILDINGS[buildingId];
  if (!building) return null;

  const parking = recommendParking(buildingId);
  // Get departments for this building from real campusData
  const depts = ALL_DEPARTMENTS.filter(d => d.building === buildingId);

  return (
    <div role="region" aria-label={`Information for ${building.displayName}`}>
      {/* Hero */}
      <div className="bip-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="bip-name">{building.displayName}</div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: 'white', borderRadius: '5px', padding: '0.2rem 0.5rem', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 }}
            aria-label="Close building info"
          >✕</button>
        </div>
        <div className="bip-desc">{building.description}</div>
        <div className="bip-tags">
          <span className="bip-tag">🏢 {building.levels.length} Levels</span>
          <span className="bip-tag">🚪 {building.entrances.length} Entrance{building.entrances.length > 1 ? 's' : ''}</span>
          {building.splitEntrance && <span className="bip-tag" style={{ color: '#fbbf24' }}>⚡ Split Entrance</span>}
        </div>
      </div>

      {/* Departments (from real data) */}
      {depts.length > 0 && (
        <div style={{ marginBottom: '0.9rem' }}>
          <div className="section-label">
            <Building2 size={13} aria-hidden="true" /> Departments & Services
          </div>
          <div className="dept-grid">
            {depts.map(d => (
              <button
                key={d.id}
                className={`dept-chip ${DEPT_CLASS[d.type] || 'dept-service'}`}
                onClick={() => onSelectDept && onSelectDept(d)}
                aria-label={`Navigate to ${d.name} on Level ${d.floor}`}
                title={`Level ${d.floor} · ${d.spatialId}`}
              >
                {DEPT_ICON[d.type] || '🏥'} {d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Entrances */}
      <div style={{ marginBottom: '0.9rem' }}>
        <div className="section-label">
          <MapPin size={13} aria-hidden="true" /> Entrances
        </div>
        {building.entrances.map(ent => (
          <div key={ent.id} className="entrance-row">
            <div className="entrance-icon">
              {ent.type === 'emergency' ? '🚨' : '🚪'}
            </div>
            <div>
              <div className="entrance-name">{ent.name}</div>
              {ent.description && <div className="entrance-desc">{ent.description}</div>}
              <div className="entrance-desc" style={{ textTransform: 'capitalize' }}>{ent.side} side · {ent.type}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Hours */}
      <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.9rem', fontSize: '0.8rem' }}>
        <div className="section-label" style={{ marginBottom: '0.4rem' }}>
          <Clock size={13} aria-hidden="true" /> Hours of Operation
        </div>
        <div>Mon – Fri: 6:00 AM – 9:00 PM</div>
        <div>Sat – Sun: 8:00 AM – 5:00 PM</div>
        <div style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '0.2rem' }}>Emergency: Open 24 / 7</div>
      </div>

      {/* Parking */}
      {parking && (
        <div className="parking-rec">
          <div className="parking-rec-icon" aria-hidden="true">🅿️</div>
          <div>
            <div className="parking-rec-name">{parking.name}</div>
            <div className="parking-rec-sub">{parking.label || 'Nearest parking for this building'}</div>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        className="btn btn-primary btn-full"
        style={{ marginTop: '0.9rem', width: '100%' }}
        onClick={() => onNavigate && onNavigate({ buildingId })}
        aria-label={`Open indoor floor plan for ${building.displayName}`}
      >
        <Navigation size={15} aria-hidden="true" /> View Indoor Floor Plan
      </button>
    </div>
  );
};

export default BuildingInfoPanel;
