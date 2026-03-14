import { NavLink } from 'react-router-dom';
import { Map, BarChart2, Settings, Phone } from 'lucide-react';

const Navbar = () => (
  <nav className="app-navbar" role="navigation" aria-label="Main navigation">
    <a href="#main" className="skip-link">Skip to main content</a>
    <div className="nav-brand">
      <div className="nav-brand-logo" aria-hidden="true">VA</div>
      <div>
        <div className="nav-brand-name">George E. Whalen VAMC</div>
        <div className="nav-brand-sub">ASI Campus Navigator · Salt Lake City, UT</div>
      </div>
    </div>
    <div className="nav-links" role="menubar">
      <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
      <NavLink to="/map" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <Map size={15} aria-hidden="true" /> Campus Map
        <span className="nav-badge">Live</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <BarChart2 size={15} aria-hidden="true" /> Analytics
      </NavLink>
      <NavLink to="/admin" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <Settings size={15} aria-hidden="true" /> Admin
      </NavLink>
    </div>
    <a href="tel:+18016821000" className="nav-phone" aria-label="Call the VA Medical Center">
      <Phone size={14} aria-hidden="true" /> (801) 582-1565
    </a>
  </nav>
);
export default Navbar;
