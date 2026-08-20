import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, Briefcase, ClipboardList,
  Zap, Map, Target, Bot, Settings, X, ChevronUp
} from 'lucide-react';
import { userData } from '../data/mockData';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'My Profile', icon: User },
  { path: '/resume', label: 'Resume', icon: FileText },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/applications', label: 'Applications', icon: ClipboardList },
  { path: '/skills', label: 'Skills', icon: Zap },
  { path: '/roadmap', label: 'Learning Roadmap', icon: Map },
  { path: '/goals', label: 'Career Goals', icon: Target },
  { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <ChevronUp size={20} strokeWidth={3} />
            </div>
            <div className="sidebar-logo-text">
              <h1>CareerOS</h1>
              <span>by Career Code</span>
            </div>
          </div>
          <button className="mobile-menu-btn" onClick={onClose} style={{ display: isOpen ? 'flex' : undefined }}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="sidebar-section-label" style={{ marginTop: 16 }}>System</div>
          <NavLink
            to="/settings"
            className={`sidebar-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{userData.initials}</div>
            <div className="sidebar-user-info">
              <h4>{userData.name}</h4>
              <span>{userData.role}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
