import { useState } from 'react';
import { Users, Search, Route, Smartphone, BarChart2, Map, Building2, Clock } from 'lucide-react';

const TOP_SEARCHES = [
  { rank: 1, dept: 'Emergency Department', building: 'Bldg 1 · L1', count: 4820, pct: 100 },
  { rank: 2, dept: 'Pharmacy', building: 'Bldg 1 · L1', count: 3940, pct: 82 },
  { rank: 3, dept: 'Cardiology', building: 'Bldg 1 · L4', count: 3100, pct: 64 },
  { rank: 4, dept: 'Primary Care', building: 'Bldg 14 · LG', count: 2850, pct: 59 },
  { rank: 5, dept: 'Radiology', building: 'Bldg 1 · LG', count: 2430, pct: 50 },
  { rank: 6, dept: 'Mental Health', building: 'Bldg 14 · L3', count: 1970, pct: 41 },
  { rank: 7, dept: 'Physical Therapy', building: 'Bldg 1 · L3', count: 1620, pct: 34 },
  { rank: 8, dept: 'Optometry', building: 'Bldg 14 · L2', count: 1340, pct: 28 },
];

const TOP_ROUTES = [
  { from: 'Parking Lot C', to: 'Cardiology', count: 1840 },
  { from: 'Main Entrance', to: 'Emergency Dept', count: 1520 },
  { from: 'Bldg 1 Lobby', to: 'Bldg 14 (Tunnel)', count: 1200 },
  { from: 'Parking Lot A', to: 'Pharmacy', count: 980 },
  { from: 'Bldg 1 / L2', to: 'Bldg 1 / L4 (Elevator)', count: 870 },
];

const Analytics = () => {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="analytics-page" id="main-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Platform Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>George E. Whalen VA Medical Center — Wayfinding System</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--surface-2)', padding: '0.3rem', borderRadius: 'var(--r-md)' }}>
          {['7d', '30d', '90d', 'All'].map(p => (
            <button
              key={p}
              className={`btn btn-sm ${period === p ? 'btn-primary' : ''}`}
              style={period !== p ? { background: 'transparent', border: 'none', color: 'var(--text-sec)' } : {}}
              onClick={() => setPeriod(p)}
              aria-pressed={period === p}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid" role="region" aria-label="Key performance indicators">
        {[
          { icon: <Users size={22} />, val: '24,850', label: 'Total Visitors', bg: '#dbeafe', color: '#1565c0' },
          { icon: <Search size={22} />, val: '18,430', label: 'Searches', bg: '#dcfce7', color: '#15803d' },
          { icon: <Route size={22} />, val: '12,760', label: 'Routes Generated', bg: '#fef3c7', color: '#b45309' },
          { icon: <Smartphone size={22} />, val: '4,120', label: 'Mobile Transfers', bg: '#f3e8ff', color: '#7e22ce' },
          { icon: <Map size={22} />, val: '9,230', label: 'Map Sessions', bg: '#fce7f3', color: '#be185d' },
          { icon: <Clock size={22} />, val: '3.4 min', label: 'Avg. Route Time', bg: '#f1f5f9', color: '#374151' },
          { icon: <Building2 size={22} />, val: 'Bldg 1', label: 'Most Visited', bg: '#e0e7ff', color: '#3730a3' },
          { icon: <BarChart2 size={22} />, val: '98.2%', label: 'Uptime', bg: '#dcfce7', color: '#15803d' },
        ].map(kpi => (
          <div key={kpi.label} className="kpi-card" role="article" aria-label={`${kpi.label}: ${kpi.val}`}>
            <div className="kpi-icon" style={{ background: kpi.bg, color: kpi.color }} aria-hidden="true">
              {kpi.icon}
            </div>
            <div>
              <div className="kpi-val">{kpi.val}</div>
              <div className="kpi-label">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-row">
        {/* Top Searches */}
        <div className="card" role="region" aria-label="Most searched departments">
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>🔍 Most Searched Departments</h3>
          {TOP_SEARCHES.map(s => (
            <div key={s.dept} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginRight: '0.5rem' }}>#{s.rank}</span>
                    {s.dept}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{s.building}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{s.count.toLocaleString()}</span>
              </div>
              <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '10px', background: 'linear-gradient(90deg, #1565c0, #42a5f5)',
                  width: `${s.pct}%`, transition: 'width 0.6s ease'
                }} role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.dept} relevance`} />
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Device Usage */}
          <div className="card" role="region" aria-label="Device usage breakdown">
            <h3 style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>📱 Device Usage</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 130, height: 130, borderRadius: '50%',
                background: 'conic-gradient(#1565c0 0% 65%, #93c5fd 65% 80%, #e2e8f0 80% 100%)',
                boxShadow: '0 4px 16px rgba(21,101,192,.25)',
              }} role="img" aria-label="Device usage pie chart: Mobile 65%, Tablet 15%, Desktop 20%" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
              {[
                { color: '#1565c0', label: 'Mobile', pct: '65%' },
                { color: '#93c5fd', label: 'Tablet', pct: '15%' },
                { color: '#e2e8f0', label: 'Desktop', pct: '20%' },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }} aria-hidden="true" />
                  {d.label} <strong>{d.pct}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Top Routes */}
          <div className="card" role="region" aria-label="Most used navigation routes">
            <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>🗺️ Top Routes</h3>
            {TOP_ROUTES.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < TOP_ROUTES.length - 1 ? '1px solid var(--surface-2)' : 'none', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600 }}>{r.from}</span>
                  <span style={{ color: 'var(--text-muted)', margin: '0 0.3rem' }}>→</span>
                  <span style={{ fontWeight: 600 }}>{r.to}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--primary)', flexShrink: 0 }}>{r.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Entrance Usage */}
      <div className="card" style={{ marginTop: '1.5rem' }} role="region" aria-label="Entrance usage statistics">
        <h3 style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>🚪 Entrance Usage</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Building 1 — Main Entrance (North)', sessions: 8420, share: 45 },
            { name: 'Building 1 — Emergency Entrance (East)', sessions: 5240, share: 28 },
            { name: 'Building 14 — Entrance A (Emergency)', sessions: 2980, share: 16 },
            { name: 'Building 14 — Entrance B (Scheduled)', sessions: 2100, share: 11 },
          ].map(e => (
            <div key={e.name} style={{ background: 'var(--surface)', borderRadius: 'var(--r-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{e.name}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--navy)' }}>{e.sessions.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.share}% of total sessions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
