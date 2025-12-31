import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  PiHouseDuotone,
  PiRobotDuotone,
  PiEnvelopeDuotone,
  PiInstagramLogoDuotone,
  PiPackageDuotone,
  PiUserCircleDuotone,
  PiBellSimpleDuotone
} from 'react-icons/pi';

const Layout: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/scraping': return 'Data Scraper';
      case '/email': return 'Email Automation';
      case '/social': return 'Social Media';
      case '/products': return 'Product Catalog';
      default: return 'AdvoCare Automation';
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: PiHouseDuotone },
    { path: '/scraping', label: 'Scraping', icon: PiRobotDuotone },
    { path: '/email', label: 'Email', icon: PiEnvelopeDuotone },
    { path: '/social', label: 'Social Media', icon: PiInstagramLogoDuotone },
    { path: '/products', label: 'Products', icon: PiPackageDuotone },
  ];

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden font-primary">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-panel z-20 flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-[rgba(255,255,255,0.05)]">
          <div className="font-logo font-bold text-xl tracking-wide flex items-center gap-2">
            <span className="text-primary text-2xl">⚡</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-text-secondary">
              Marketing Automation
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive
                  ? 'bg-primary-alpha15 text-primary border border-primary-alpha25 shadow-glow'
                  : 'text-text-secondary hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} className={isActive ? 'animate-pulse' : ''} />
                  <span className="font-medium tracking-wide">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-dark to-primary flex items-center justify-center text-bg-primary font-bold">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Jane Doe</p>
              <p className="text-xs text-text-secondary truncate">Distributor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary opacity-[0.03] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent opacity-[0.02] rounded-full blur-[100px]"></div>
        </div>

        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] z-10 backdrop-blur-sm bg-bg-primary/50">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-text-secondary hover:text-primary hover:bg-[rgba(255,255,255,0.05)] transition-colors relative">
              <PiBellSimpleDuotone size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-[rgba(255,255,255,0.1)]"></div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-alpha15 border border-primary-alpha25">
              <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]"></span>
              <span className="text-xs font-mono text-primary-light">SYSTEM ONLINE</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 z-10 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;