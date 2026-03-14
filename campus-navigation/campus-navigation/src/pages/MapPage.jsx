import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, MapPin, Navigation, Accessibility } from 'lucide-react';
import IndoorFloorPlan from '../components/IndoorFloorPlan';
import BuildingInfoPanel from '../components/BuildingInfoPanel';
import RoutePanel from '../components/RoutePanel';
import SplitEntranceModal from '../components/SplitEntranceModal';
import CampusMap from '../components/Map/CampusMap';
import { searchDepartments, computeRoute } from '../data/navigationEngine.js';
import { BUILDINGS } from '../data/campusData.js';

const QUICK_SEARCHES = [
  { label: '🚨 Emergency', query: 'Emergency' },
  { label: '💊 Pharmacy', query: 'Pharmacy' },
  { label: '❤️ Cardiology', query: 'Cardiology' },
  { label: '👁️ Optometry', query: 'Optometry' },
  { label: '🧠 Mental Health', query: 'Mental Health' },
];

const MapPage = () => {
  const [selectedBldId, setSelectedBldId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showIndoor, setShowIndoor] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [pendingDept, setPendingDept] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [accessible, setAccessible] = useState(false);
  const [phone, setPhone] = useState('');
  const [smsMsg, setSmsMsg] = useState('');
  const searchRef = useRef(null);

  /* ── Search ──────────────────────────────────────────────── */
  const handleSearchChange = useCallback((val) => {
    try {
      setSearchQuery(val);
      if (val.trim().length >= 2) {
        const results = searchDepartments(val.trim());
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error in handleSearchChange:', error);
      setSearchResults([]);
    }
  }, []);

  const handleQuickSearch = useCallback((query) => {
    setSearchQuery(query);
    const results = searchDepartments(query);
    setSearchResults(results);
    searchRef.current?.focus();
  }, []);

  /* ── Route Synchronization ────────────────────────────────── */
  // Bug fix: Automatically re-compute route if accessibility toggle changes
  useEffect(() => {
    if (currentRoute?.department) {
      const newRoute = computeRoute(currentRoute.department.id, accessible, currentRoute.arrivalType || 'scheduled');
      if (newRoute) setCurrentRoute(newRoute);
    }
  }, [accessible]);

  /* ── Selection Logic ───────────────────────────────────────── */
  const selectDept = useCallback((dept) => {
    try {
      setSearchResults([]);
      setSearchQuery('');
      setSelectedBldId(dept.building);

      if (dept.building === 'B14' && BUILDINGS['B14']?.splitEntrance) {
        setPendingDept(dept);
        setShowSplit(true);
        return;
      }
      
      const route = computeRoute(dept.id, accessible, 'scheduled');
      setCurrentRoute(route || null);
      if (route) setShowIndoor(true);
    } catch (error) {
      console.error('Error in selectDept:', error);
    }
  }, [accessible]);

  const handleSplitChoice = useCallback((arrivalType) => {
    setShowSplit(false);
    if (!pendingDept) return;
    const route = computeRoute(pendingDept.id, accessible, arrivalType);
    if (route) {
        route.arrivalType = arrivalType; // Store for synchronization
        setCurrentRoute(route);
        setSelectedBldId(pendingDept.building);
        setShowIndoor(true);
    }
    setPendingDept(null);
  }, [pendingDept, accessible]);

  const handleBldClick = useCallback((bldId) => {
    const known = BUILDINGS[bldId] ? bldId : (
      Object.keys(BUILDINGS).find(k => bldId?.includes(k) || BUILDINGS[k]?.num === bldId) || null
    );
    if (!known) return;
    setSelectedBldId(known);
    setShowIndoor(false);
    setCurrentRoute(null);
    setSearchResults([]);
    setSearchQuery(''); // Bug fix: Clear search on map interaction
  }, []);

  const handleOpenIndoor = useCallback((deptInfo) => {
    if (deptInfo?.dept) {
      selectDept(deptInfo.dept);
    } else {
      setShowIndoor(true);
    }
  }, [selectDept]);

  const handleSendSMS = useCallback(() => {
    if (!phone.trim()) return;
    setSmsMsg('📱 Route saved (SMS unavailable — Twilio not configured)');
    setTimeout(() => setSmsMsg(''), 4000);
  }, [phone]);

  const building = selectedBldId ? (BUILDINGS[selectedBldId] || null) : null;

  return (
    <div className="map-page-layout">

      {/* ── Left Sidebar ────────────────────────────────────────── */}
      <aside className="map-sidebar" aria-label="Navigation sidebar" style={{ zIndex: 100 }}>

        <div className="sidebar-header">
          <h2>Campus Wayfinder</h2>
          <p>George E. Whalen VA Medical Center — Salt Lake City, UT</p>
        </div>

        {/* Search Section */}
        <div style={{ padding: '0.9rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
          <div className="search-wrap" role="search">
            <div className="search-icon-pos" aria-hidden="true"><Search size={15} /></div>
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search departments, clinics, services…"
              className="search-input"
              aria-label="Search for departments and campus locations"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={searchResults.length > 0}
              aria-controls="search-listbox"
              autoComplete="off"
            />
            {searchResults.length > 0 && (
              <div 
                className="search-dropdown" 
                id="search-listbox" 
                role="listbox" 
                aria-label="Search results"
                style={{ zIndex: 1000, position: 'absolute' }} // Bug fix: elevation
              >
                {searchResults.map(r => (
                  <div
                    key={r.id}
                    className="search-item"
                    role="option"
                    aria-selected="false"
                    tabIndex={0}
                    onClick={() => selectDept(r)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && selectDept(r)}
                  >
                    <div className="search-item-icon">
                      {r.type === 'emergency' ? '🚨' : r.type === 'pharmacy' ? '💊' : r.type === 'therapy' ? '🧘' : r.type === 'lab' ? '🧬' : r.type === 'mental health' ? '🧠' : '🏥'}
                    </div>
                    <div>
                      <div className="search-item-name">{r.name}</div>
                      <div className="search-item-sub">{r.buildingName} · Level {r.floor}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="quick-chips">
            {QUICK_SEARCHES.map(q => (
              <button
                key={q.query}
                className={`chip${q.query === 'Emergency' ? ' emergency' : ''}`}
                onClick={() => handleQuickSearch(q.query)}
              >
                {q.label}
              </button>
            ))}
          </div>

          <button
            className={`btn btn-sm btn-full mt-2 ${accessible ? 'btn-primary' : 'btn-ghost'}`}
            style={{ marginTop: '0.6rem' }}
            onClick={() => setAccessible(a => !a)}
            aria-pressed={accessible}
          >
            <Accessibility size={14} aria-hidden="true" />
            {accessible ? '♿ Accessible Route ON' : '♿ Accessible Route'}
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div className="sidebar-body">
          {currentRoute ? (
            <RoutePanel
              route={currentRoute}
              onClear={() => { setCurrentRoute(null); setShowIndoor(false); setSelectedBldId(null); }}
              onViewIndoor={() => setShowIndoor(true)}
            />
          ) : building ? (
            <BuildingInfoPanel
              buildingId={selectedBldId}
              onClose={() => { setSelectedBldId(null); setShowIndoor(false); }}
              onNavigate={handleOpenIndoor}
              onSelectDept={selectDept}
            />
          ) : (
            <div className="empty-state">
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>🗺️</div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>
                  Search above or click any building on the map to begin navigation.
                </p>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <div className="section-label">
                  <MapPin size={13} aria-hidden="true" /> Campus Buildings
                </div>
                {Object.values(BUILDINGS).filter(b => b.coords).slice(0, 12).map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleBldClick(b.id)}
                    className="building-list-item"
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.6rem 0.75rem', borderRadius: '8px', marginBottom: '0.35rem',
                      background: 'var(--surface)', border: '1.5px solid var(--border)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.asiColor || b.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.displayName}
                      </div>
                      <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)' }}>
                        {b.levels.length} levels · {b.entrances?.length || 0} entrance{b.entrances?.length === 1 ? '' : 's'}
                      </div>
                    </div>
                    <Navigation size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Mock Support */}
        <div className="mobile-bar">
          <div className="mobile-bar-label">📱 Send Route to Phone</div>
          <div className="mobile-bar-row">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="mobile-input"
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSendSMS}
              disabled={!phone.trim()}
            >
              Send
            </button>
          </div>
          {smsMsg && <div className="sms-disabled-note">{smsMsg}</div>}
        </div>
      </aside>

      {/* ── Main Map Display ────────────────────────────────────── */}
      <main className="map-container" role="main">
        <CampusMap
          onBuildingSelect={handleBldClick}
          selectedBuildingId={selectedBldId}
        />
      </main>

      {/* ── Overlays ────────────────────────────────────────────── */}
      {showIndoor && selectedBldId && (
        <IndoorFloorPlan
          buildingId={selectedBldId}
          accessibleOnly={accessible}
          onBack={() => setShowIndoor(false)}
        />
      )}

      {showSplit && (
        <SplitEntranceModal
          onSelect={handleSplitChoice}
          onClose={() => { setShowSplit(false); setPendingDept(null); }}
        />
      )}
    </div>
  );
};

export default MapPage;
