import { useState } from 'react';
import { Building2, MapPin, Users, Settings, Plus, RefreshCw } from 'lucide-react';
import { BUILDINGS, ALL_DEPARTMENTS } from '../data/campusData.js';

const SECTION = {
  buildings: 'Buildings',
  departments: 'Departments',
  accessibility: 'Accessibility',
  settings: 'Settings',
};

const Admin = () => {
  const [activeSection, setActiveSection] = useState('buildings');

  return (
    <div className="admin-layout">
      {/* Admin Top Nav (Secondary) */}
      <nav className="admin-nav" aria-label="Admin sections">
        {Object.entries(SECTION).map(([key, label]) => (
          <button
            key={key}
            className={`admin-nav-btn${activeSection === key ? ' active' : ''}`}
            onClick={() => setActiveSection(key)}
            aria-current={activeSection === key ? 'page' : undefined}
          >
            {key === 'buildings' && <Building2 size={14} aria-hidden="true" />}
            {key === 'departments' && <MapPin size={14} aria-hidden="true" />}
            {key === 'accessibility' && <Users size={14} aria-hidden="true" />}
            {key === 'settings' && <Settings size={14} aria-hidden="true" />}
            {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="admin-content" id="admin-main">
        {activeSection === 'buildings' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Building Management</h2>
              <button className="btn btn-primary btn-sm">
                <Plus size={14} aria-hidden="true" /> Add Building
              </button>
            </div>
            <table className="data-table" aria-label="Building registry">
              <thead>
                <tr>
                  <th scope="col">Building ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Levels</th>
                  <th scope="col">Entrances</th>
                  <th scope="col">Parking</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(BUILDINGS).map(b => (
                  <tr key={b.id}>
                    <td><code style={{ fontFamily: 'monospace', background: 'var(--surface)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem' }}>{b.id}</code></td>
                    <td><strong>{b.displayName}</strong></td>
                    <td>{b.levels.join(', ')}</td>
                    <td>{b.entrances.length}</td>
                    <td>{b.parking.join(', ')}</td>
                    <td><span className="status-badge active">Active</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="btn btn-ghost btn-sm">Edit</button>
                        <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#991b1b', border: 'none' }}>Archive</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeSection === 'departments' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Department Registry</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-ghost btn-sm"><RefreshCw size={13} aria-hidden="true" /> Sync ASI Tags</button>
                <button className="btn btn-primary btn-sm"><Plus size={14} aria-hidden="true" /> Add Department</button>
              </div>
            </div>
            <table className="data-table" aria-label="Department registry">
              <thead>
                <tr>
                  <th scope="col">Spatial ID (ASI)</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Building</th>
                  <th scope="col">Floor</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {ALL_DEPARTMENTS.map(d => (
                  <tr key={d.id}>
                    <td><code style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--primary)' }}>{d.spatialId}</code></td>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.buildingName}</td>
                    <td>Level {d.floor}</td>
                    <td><span style={{ textTransform: 'capitalize' }}>{d.type}</span></td>
                    <td><span className="status-badge active">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeSection === 'accessibility' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Accessibility Configuration</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: 'Elevator Bank A — Bldg 1', status: 'active', lastService: '2026-02-15', floors: 'G → 6' },
                { title: 'Elevator Bank B — Bldg 1', status: 'active', lastService: '2026-01-20', floors: 'B → G' },
                { title: 'Elevator — Bldg 14', status: 'maint', lastService: '2026-03-10', floors: 'B → 3' },
                { title: 'Tunnel — Bldg 1 to Bldg 14', status: 'active', lastService: '2026-02-01', floors: 'Level B only' },
                { title: 'Tunnel — Bldg 1 to Bldg 2/3', status: 'active', lastService: '2026-02-01', floors: 'Level B only' },
                { title: 'Elevator — Bldg 2', status: 'active', lastService: '2026-03-01', floors: 'G → 3' },
              ].map(item => (
                <div key={item.title} className="card" role="article">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem' }}>{item.title}</h4>
                    <span className={`status-badge ${item.status}`}>{item.status}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    <div>Floors: {item.floors}</div>
                    <div>Last Service: {item.lastService}</div>
                  </div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                    <button className="btn btn-ghost btn-sm">Update Status</button>
                    <button className="btn btn-ghost btn-sm">View Logs</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>System Settings</h2>
            <div className="card" style={{ maxWidth: 560, marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Twilio SMS Configuration</h3>
              {[
                { label: 'Account SID', placeholder: 'AC...' },
                { label: 'Auth Token', placeholder: '●●●●●●●●●●●●●●●●●●●●' },
                { label: 'From Phone Number', placeholder: '+1 801 555 0000' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-sec)' }}>{f.label}</label>
                  <input
                    type="text" placeholder={f.placeholder}
                    className="search-input"
                    style={{ width: '100%' }}
                    aria-label={f.label}
                  />
                </div>
              ))}
              <button className="btn btn-primary btn-sm">Save SMS Settings</button>
            </div>
            <div className="card" style={{ maxWidth: 560 }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Mapbox Configuration</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Public Access Token</label>
                <input type="text" className="search-input" style={{ width: '100%' }} placeholder="pk.eyJ1Ii..." aria-label="Mapbox public access token" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Longitude</label>
                  <input type="number" className="search-input" defaultValue={-111.891} aria-label="Map center longitude" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Latitude</label>
                  <input type="number" className="search-input" defaultValue={40.7587} aria-label="Map center latitude" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Zoom</label>
                  <input type="number" className="search-input" defaultValue={16} aria-label="Map zoom level" />
                </div>
              </div>
              <button className="btn btn-primary btn-sm">Save Map Settings</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
