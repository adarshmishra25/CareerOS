import { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, HelpCircle, Menu, TrendingUp,
  Briefcase, CheckCircle, Map as MapIcon
} from 'lucide-react';
import { userData, notificationsData } from '../data/mockData';

const notifIcons = {
  'trending-up': TrendingUp,
  'briefcase': Briefcase,
  'check-circle': CheckCircle,
  'map': MapIcon
};

export default function Topbar({ onMenuToggle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="flex items-center gap-3">
        <button className="mobile-menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <div className="topbar-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search jobs, skills, companies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="topbar-actions">
        <div className="career-score-badge">
          <TrendingUp size={14} />
          <span className="hide-mobile">Career Score:</span>
          <span>{userData.careerScore}</span>
        </div>

        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            <span className="topbar-badge" />
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.6875rem' }}>
                  Mark all read
                </button>
              </div>
              <div className="notification-list">
                {notificationsData.map(notif => {
                  const Icon = notifIcons[notif.icon] || Bell;
                  return (
                    <div key={notif.id} className="notification-item">
                      <div className={`notification-icon ${notif.type}`}>
                        <Icon size={16} />
                      </div>
                      <div className="notification-content">
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button className="topbar-icon-btn">
          <HelpCircle size={18} />
        </button>

        <div className="topbar-avatar">{userData.initials}</div>
      </div>
    </header>
  );
}
