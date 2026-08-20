import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Target, Plus, X, CheckCircle, Circle, Calendar, TrendingUp
} from 'lucide-react';
import { careerGoals as initialGoals } from '../data/mockData';

function AddGoalModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', target: '', progress: 0 });

  const handleSubmit = () => {
    if (!form.title) return;
    onAdd({
      id: Date.now(),
      title: form.title,
      target: form.target || 'No deadline set',
      progress: parseInt(form.progress) || 0,
      isMain: false,
      milestones: []
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-lg font-semibold">Add New Goal</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Goal Title *</label>
              <input className="input" placeholder="e.g., Learn TypeScript" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Target Date</label>
              <input className="input" placeholder="e.g., March 2027" value={form.target}
                onChange={e => setForm({ ...form, target: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>
                Initial Progress: {form.progress}%
              </label>
              <input type="range" min="0" max="100" value={form.progress}
                onChange={e => setForm({ ...form, progress: e.target.value })}
                style={{ width: '100%', accentColor: 'var(--primary-600)' }} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Goal</button>
        </div>
      </div>
    </div>
  );
}

export default function CareerGoalsPage() {
  const { addToast } = useOutletContext();
  const [goals, setGoals] = useState(initialGoals);
  const [showAddModal, setShowAddModal] = useState(false);

  const mainGoal = goals.find(g => g.isMain);
  const otherGoals = goals.filter(g => !g.isMain);

  const handleAddGoal = (newGoal) => {
    setGoals(prev => [...prev, newGoal]);
    addToast('Goal added successfully.', 'success');
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'var(--green-500)';
    if (progress >= 50) return 'var(--primary-500)';
    return 'var(--orange-500)';
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h2>Career Goals</h2>
            <p>Track your progress toward your career milestones.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add New Goal
          </button>
        </div>
      </div>

      {/* Main Goal */}
      {mainGoal && (
        <div className="card card-lg" style={{ marginBottom: 28 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <span className="badge badge-primary">Primary Goal</span>
          </div>
          <h3 className="text-xl font-bold" style={{ marginBottom: 4 }}>{mainGoal.title}</h3>
          <div className="flex items-center gap-3 text-xs text-slate-400" style={{ marginBottom: 16 }}>
            <span className="flex items-center gap-1"><Calendar size={12} />Target: {mainGoal.target}</span>
            <span className="flex items-center gap-1"><TrendingUp size={12} />{mainGoal.progress}% complete</span>
          </div>

          <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
            <div className="progress-bar" style={{ flex: 1, height: 10 }}>
              <div className="progress-bar-fill" style={{ width: `${mainGoal.progress}%` }} />
            </div>
            <span className="text-lg font-bold text-primary">{mainGoal.progress}%</span>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400" style={{
              marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Milestones</p>
            <div className="grid grid-2 gap-2">
              {mainGoal.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3" style={{
                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  background: m.done ? 'var(--green-50)' : 'var(--slate-50)',
                  border: `1px solid ${m.done ? 'var(--green-100)' : 'var(--slate-200)'}`
                }}>
                  {m.done ? (
                    <CheckCircle size={16} style={{ color: 'var(--green-500)', flexShrink: 0 }} />
                  ) : (
                    <Circle size={16} style={{ color: 'var(--slate-300)', flexShrink: 0 }} />
                  )}
                  <span className={`text-sm ${m.done ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Goals */}
      <h3 className="section-title" style={{ marginBottom: 16 }}>Other Goals</h3>
      <div className="grid grid-2 gap-4">
        {otherGoals.map(goal => (
          <div key={goal.id} className="card">
            <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
              <div className="flex items-center gap-2">
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--primary-600)'
                }}>
                  <Target size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{goal.title}</h4>
                  <p className="text-xs text-slate-400">Target: {goal.target}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="progress-bar" style={{ flex: 1 }}>
                <div className="progress-bar-fill" style={{
                  width: `${goal.progress}%`,
                  background: `linear-gradient(90deg, ${getProgressColor(goal.progress)}, ${getProgressColor(goal.progress)}cc)`
                }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: getProgressColor(goal.progress) }}>
                {goal.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddGoalModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddGoal}
        />
      )}
    </div>
  );
}
