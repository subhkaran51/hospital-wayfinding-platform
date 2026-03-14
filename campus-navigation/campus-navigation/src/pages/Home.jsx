import { Link } from 'react-router-dom';
import { Map, Search, Accessibility, Smartphone, Building2, Navigation } from 'lucide-react';

const QUICK_DEPTS = [
  { icon: '🚨', name: 'Emergency Dept', loc: 'Bldg 1 · Level 1', path: '/map' },
  { icon: '💊', name: 'Pharmacy', loc: 'Bldg 1 · Level 1', path: '/map' },
  { icon: '❤️', name: 'Cardiology', loc: 'Bldg 1 · Level 4', path: '/map' },
  { icon: '🩻', name: 'Radiology', loc: 'Bldg 1 · Level G', path: '/map' },
  { icon: '👁️', name: 'Optometry', loc: 'Bldg 14 · Level 2', path: '/map' },
  { icon: '🧠', name: 'Mental Health', loc: 'Bldg 14 · Level 3', path: '/map' },
  { icon: '🧘', name: 'Physical Therapy', loc: 'Bldg 1 · Level 3', path: '/map' },
  { icon: '🧬', name: 'Blood Lab', loc: 'Bldg 1 · Level 4', path: '/map' },
];

const FEATURES = [
  { icon: <Map size={28} />, title: 'Pseudo-3D Campus Map', desc: 'Interactive overhead view with building extrusions, roads, parking, and entrances.' },
  { icon: <Search size={28} />, title: 'Smart Search', desc: 'Find any department, clinic, or service instantly with landmark-based routing.' },
  { icon: <Navigation size={28} />, title: 'Landmark Navigation', desc: '"Pass the Pharmacy on your right, turn left at the Blue Information Desk" — not feet or meters.' },
  { icon: <Building2 size={28} />, title: '30 Floor Maps', desc: 'Stylized blueprints for 8 buildings across 30+ levels with ASI Spatial ID tags.' },
  { icon: <Accessibility size={28} />, title: 'Accessible Routing', desc: 'Wheelchair mode routes only via elevators and ramps — never stairs.' },
  { icon: <Smartphone size={28} />, title: 'Mobile Transfer', desc: 'Send your route directly to your phone via SMS before arriving at the campus.' },
];

const Home = () => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--navy)' }}>
      
      {/* Hero */}
      <section className="home-hero" aria-label="Platform introduction">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-waves" aria-hidden="true" />
        
        <div className="hero-inner">
          <div className="hero-tag">
            <span aria-hidden="true">🇺🇸</span> George E. Whalen VA Medical Center — Salt Lake City, Utah
          </div>
          <h1 className="hero-title">
            Navigate the VA<br /><span>with Confidence</span>
          </h1>
          <p className="hero-sub">
            An interactive indoor and outdoor wayfinding platform for veterans, patients, and visitors. 
            Stop at the information desk — your route begins here.
          </p>
          <div className="hero-btns">
            <Link to="/map" className="btn btn-primary btn-lg" aria-label="Open the interactive campus map">
              <Map size={20} aria-hidden="true" /> Open Campus Map
            </Link>
            <a href="#features" className="btn btn-ghost btn-lg" style={{ color: 'white', border: '1.5px solid rgba(255,255,255,.25)' }}>
              Learn More
            </a>
          </div>

          {/* Quick access departments */}
          <div className="quick-grid" role="navigation" aria-label="Quick department links" style={{ marginTop: '1rem', width: '100%', maxWidth: '800px' }}>
            {QUICK_DEPTS.map(d => (
              <Link key={d.name} to={d.path} className="quick-card" aria-label={`Navigate to ${d.name} – ${d.loc}`}>
                <div className="quick-card-icon" aria-hidden="true">{d.icon}</div>
                <div className="quick-card-name">{d.name}</div>
                <div className="quick-card-sub">{d.loc}</div>
              </Link>
            ))}
          </div>

          {/* Stats bubbles */}
          <div className="stats-bubbles" aria-label="Campus statistics">
            <div className="stat-bub">
              <div className="stat-val">8</div>
              <div className="stat-key">Buildings</div>
            </div>
            <div className="stat-bub">
              <div className="stat-val">30+</div>
              <div className="stat-key">Floor Maps</div>
            </div>
            <div className="stat-bub">
              <div className="stat-val">200+</div>
              <div className="stat-key">Visual Anchors</div>
            </div>
            <div className="stat-bub">
              <div className="stat-val">WCAG</div>
              <div className="stat-key">AA Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: 'var(--navy-mid)', padding: '5rem 2rem' }} aria-label="Platform features">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'white', fontWeight: 900 }}>
              Built for Veterans. Designed for All.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginTop: '0.75rem' }}>
              Every feature is crafted for high-stress environments where clarity matters most.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map(f => (
              <div
                key={f.title}
                style={{
                  background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 'var(--r-lg)', padding: '1.75rem',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ color: 'var(--gold)', marginBottom: '1rem' }} aria-hidden="true">{f.icon}</div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>
          Ready to Find Your Way?
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem' }}>
          Over 20 departments, 8 buildings, and tunnel connections — all at your fingertips.
        </p>
        <Link to="/map" className="btn btn-primary btn-lg" aria-label="Open interactive campus map now">
          <Map size={20} aria-hidden="true" /> Launch Interactive Map
        </Link>
      </section>

    </div>
  );
};

export default Home;
