import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  User, Target, Bell, Shield, Palette, Save, Plus, X,
  MapPin, Briefcase, DollarSign, Check
} from 'lucide-react';
import { userData } from '../data/mockData';

export default function Settings() {
  const { addToast } = useOutletContext();
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    name: userData.name,
    email: userData.email,
    role: userData.role,
    college: userData.college,
    targetRole: userData.preferences.targetRole,
    locations: [...userData.preferences.locations],
    jobTypes: [...userData.preferences.jobTypes],
    salary: userData.preferences.salaryRange,
    emailNotifs: true,
    pushNotifs: true,
    jobAlerts: true,
    weeklyReport: true,
    profilePublic: true,
    showEmail: false,
    theme: 'light'
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'career', label: 'Career Preferences', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSave = () => {
    addToast('Settings saved successfully.', 'success');
  };

  const toggleLocation = (loc) => {
    setSettings(prev => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter(l => l !== loc)
        : [...prev.locations, loc]
    }));
  };

  const toggleJobType = (type) => {
    setSettings(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences.</p>
      </div>

      <div className="flex gap-5" style={{ alignItems: 'flex-start' }}>
        {/* Sidebar Navigation */}
        <div className="card" style={{ width: 220, flexShrink: 0, padding: 8 }}>
          {sections.map(sec => {
            const Icon = sec.icon;
            return (
              <button key={sec.id}
                className={`sidebar-nav-item ${activeSection === sec.id ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => setActiveSection(sec.id)}>
                <Icon size={16} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="card" style={{ flex: 1 }}>
          {activeSection === 'profile' && (
            <div>
              <h3 className="section-title" style={{ marginBottom: 20 }}>Profile Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Full Name</label>
                  <input className="input" value={settings.name}
                    onChange={e => setSettings({ ...settings, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Email</label>
                  <input className="input" value={settings.email}
                    onChange={e => setSettings({ ...settings, email: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Current Role</label>
                  <input className="input" value={settings.role}
                    onChange={e => setSettings({ ...settings, role: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Institution</label>
                  <input className="input" value={settings.college}
                    onChange={e => setSettings({ ...settings, college: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'career' && (
            <div>
              <h3 className="section-title" style={{ marginBottom: 20 }}>Career Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Target Role</label>
                  <input className="input" value={settings.targetRole}
                    onChange={e => setSettings({ ...settings, targetRole: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 8 }}>Preferred Locations</label>
                  <div className="flex flex-wrap gap-2">
                    {['Noida', 'Delhi', 'Bangalore', 'Remote', 'Hyderabad', 'Pune', 'Mumbai'].map(loc => (
                      <button key={loc}
                        className={`btn btn-sm ${settings.locations.includes(loc) ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => toggleLocation(loc)}>
                        {settings.locations.includes(loc) && <Check size={12} />}
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 8 }}>Job Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Full-time', 'Internship', 'Part-time', 'Contract'].map(type => (
                      <button key={type}
                        className={`btn btn-sm ${settings.jobTypes.includes(type) ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => toggleJobType(type)}>
                        {settings.jobTypes.includes(type) && <Check size={12} />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Expected Salary</label>
                  <select className="select" value={settings.salary}
                    onChange={e => setSettings({ ...settings, salary: e.target.value })}>
                    <option value="₹0–5 LPA">₹0–5 LPA</option>
                    <option value="₹5–10 LPA">₹5–10 LPA</option>
                    <option value="₹6–12 LPA">₹6–12 LPA</option>
                    <option value="₹10–15 LPA">₹10–15 LPA</option>
                    <option value="₹15+ LPA">₹15+ LPA</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <h3 className="section-title" style={{ marginBottom: 20 }}>Notification Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 480 }}>
                {[
                  { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'pushNotifs', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'jobAlerts', label: 'Job Alerts', desc: 'Get notified about new job matches' },
                  { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly career progress report' },
                ].map(item => (
                  <div key={item.key} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0', borderBottom: '1px solid var(--slate-100)'
                  }}>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{
                        width: 44, height: 24, borderRadius: 12,
                        background: settings[item.key] ? 'var(--primary-600)' : 'var(--slate-300)',
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0
                      }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', background: 'white',
                        position: 'absolute', top: 3,
                        left: settings[item.key] ? 23 : 3,
                        transition: 'left 0.2s', boxShadow: 'var(--shadow-sm)'
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div>
              <h3 className="section-title" style={{ marginBottom: 20 }}>Privacy Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 480 }}>
                {[
                  { key: 'profilePublic', label: 'Public Profile', desc: 'Make your profile visible to recruiters' },
                  { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your public profile' },
                ].map(item => (
                  <div key={item.key} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0', borderBottom: '1px solid var(--slate-100)'
                  }}>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{
                        width: 44, height: 24, borderRadius: 12,
                        background: settings[item.key] ? 'var(--primary-600)' : 'var(--slate-300)',
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0
                      }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', background: 'white',
                        position: 'absolute', top: 3,
                        left: settings[item.key] ? 23 : 3,
                        transition: 'left 0.2s', boxShadow: 'var(--shadow-sm)'
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div>
              <h3 className="section-title" style={{ marginBottom: 20 }}>Appearance</h3>
              <div style={{ maxWidth: 480 }}>
                <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 8 }}>Theme</label>
                <div className="flex gap-3">
                  {['light', 'dark', 'system'].map(theme => (
                    <button key={theme}
                      className={`btn ${settings.theme === theme ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setSettings({ ...settings, theme: theme })}
                      style={{ textTransform: 'capitalize' }}>
                      {theme}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400" style={{ marginTop: 8 }}>
                  Dark mode and system theme are available in the full version.
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--slate-100)' }}>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
