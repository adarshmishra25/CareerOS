import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Plus, X, ChevronDown, Building2, Calendar, AlertCircle
} from 'lucide-react';
import { applicationsData, applicationStats } from '../data/mockData';

const statusOptions = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

const statusColors = {
  'Applied': { bg: 'var(--primary-50)', color: 'var(--primary-600)', border: 'var(--primary-100)' },
  'Shortlisted': { bg: 'var(--orange-50)', color: 'var(--orange-600)', border: 'var(--orange-100)' },
  'Interview': { bg: 'var(--green-50)', color: 'var(--green-600)', border: 'var(--green-100)' },
  'Offer': { bg: 'var(--green-50)', color: 'var(--green-700)', border: 'var(--green-100)' },
  'Rejected': { bg: 'var(--red-50)', color: 'var(--red-600)', border: 'var(--red-100)' },
};

function AddApplicationModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    company: '', role: '', date: '', status: 'Applied', notes: ''
  });

  const handleSubmit = () => {
    if (!form.company || !form.role) return;
    onAdd({
      ...form,
      id: Date.now(),
      date: form.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      nextStep: form.notes || 'Awaiting response'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-lg font-semibold">Add Application</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Company *</label>
              <input className="input" placeholder="Company name" value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Role *</label>
              <input className="input" placeholder="Job title" value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="grid grid-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Date</label>
                <input className="input" type="date" value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Status</label>
                <select className="select" value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Notes</label>
              <textarea className="input" rows={3} placeholder="Additional notes..."
                value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Application</button>
        </div>
      </div>
    </div>
  );
}

export default function Applications() {
  const { addToast } = useOutletContext();
  const [apps, setApps] = useState(applicationsData);
  const [activeTab, setActiveTab] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = ['All', 'Applied', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

  const filteredApps = activeTab === 'All' ? apps : apps.filter(a => a.status === activeTab);

  const stats = {
    total: apps.length,
    applied: apps.filter(a => a.status === 'Applied').length,
    shortlisted: apps.filter(a => a.status === 'Shortlisted').length,
    interview: apps.filter(a => a.status === 'Interview').length,
    offer: apps.filter(a => a.status === 'Offer').length,
    rejected: apps.filter(a => a.status === 'Rejected').length,
  };

  const handleStatusChange = (id, newStatus) => {
    setApps(prev => prev.map(a =>
      a.id === id ? { ...a, status: newStatus } : a
    ));
    addToast(`Status updated to ${newStatus}.`, 'success');
  };

  const handleAddApp = (newApp) => {
    setApps(prev => [newApp, ...prev]);
    addToast('Application added successfully.', 'success');
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h2>My Applications</h2>
            <p>Track and manage your job applications.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Application
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 flex-wrap" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total', value: stats.total, ...statusColors['Applied'] },
          { label: 'Applied', value: stats.applied, ...statusColors['Applied'] },
          { label: 'Shortlisted', value: stats.shortlisted, ...statusColors['Shortlisted'] },
          { label: 'Interviews', value: stats.interview, ...statusColors['Interview'] },
          { label: 'Offer', value: stats.offer, ...statusColors['Offer'] },
          { label: 'Rejected', value: stats.rejected, ...statusColors['Rejected'] },
        ].map(stat => (
          <div key={stat.label} className="card card-sm" style={{
            flex: 1, minWidth: 100, textAlign: 'center',
            background: stat.bg, borderColor: stat.border
          }}>
            <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Application Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--slate-200)' }}>
                {['Company', 'Role', 'Applied', 'Status', 'Next Step'].map(h => (
                  <th key={h} style={{
                    padding: '12px 20px', textAlign: 'left',
                    fontSize: '0.6875rem', fontWeight: 600, color: 'var(--slate-400)',
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => {
                const sc = statusColors[app.status];
                return (
                  <tr key={app.id} style={{
                    borderBottom: '1px solid var(--slate-100)',
                    transition: 'background 0.15s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div className="flex items-center gap-2">
                        <div style={{
                          width: 32, height: 32, borderRadius: 'var(--radius-md)',
                          background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: 'var(--primary-600)', flexShrink: 0
                        }}>
                          <Building2 size={14} />
                        </div>
                        <span className="text-sm font-medium">{app.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className="text-sm text-slate-600">{app.role}</span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className="text-xs text-slate-400">{app.date}</span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <select
                        value={app.status}
                        onChange={e => handleStatusChange(app.id, e.target.value)}
                        style={{
                          padding: '4px 24px 4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          background: sc.bg,
                          color: sc.color,
                          border: `1px solid ${sc.border}`,
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 8px center'
                        }}
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className="text-xs text-slate-500">{app.nextStep}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApps.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 48, marginTop: 16 }}>
          <AlertCircle size={40} style={{ color: 'var(--slate-300)', margin: '0 auto 12px' }} />
          <p className="text-sm text-slate-500">No applications in this category.</p>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <AddApplicationModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddApp}
        />
      )}
    </div>
  );
}
