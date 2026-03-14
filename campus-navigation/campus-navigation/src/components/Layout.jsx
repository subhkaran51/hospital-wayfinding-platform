import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="main-content">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main" tabIndex="-1" style={{ flex: 1, display: 'flex', flexDirection: 'column', outline: 'none' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
