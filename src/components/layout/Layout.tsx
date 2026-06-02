import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="layout">
      {/* Modular Header / Navbar */}
      <Header />

      {/* Main Page Content */}
      <main className="layout__main">
        <Outlet />
      </main>

      {/* Modular Footer - hidden on portal pages */}
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;
