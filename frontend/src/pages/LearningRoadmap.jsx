import {
  CheckCircle, Circle, ArrowRight, Clock, BarChart3,
  Zap, Target, BookOpen
} from 'lucide-react';
import { roadmapData } from '../data/mockData';

function RoadmapItem({ item, index, isLast }) {
  const isCompleted = item.status === 'completed';
  const isCurrent = item.status === 'current';
  const isUpcoming = item.status === 'upcoming';

  const difficultyColors = {
    'Beginner': { bg: 'var(--green-50)', color: 'var(--green-700)' },
    'Intermediate': { bg: 'var(--orange-50)', color: 'var(--orange-600)' },
    'Advanced': { bg: 'var(--red-50)', color: 'var(--red-600)' },
  };
  const dc = difficultyColors[item.difficulty];

  return (
    <div className="flex gap-4" style={{ position: 'relative' }}>
      {/* Timeline Line */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 32, flexShrink: 0
      }}>
        {isCompleted ? (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--green-500)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', flexShrink: 0
          }}>
            <CheckCircle size={16} />
          </div>
        ) : isCurrent ? (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--primary-600)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', flexShrink: 0,
            boxShadow: '0 0 0 4px var(--primary-100)'
          }}>
            <ArrowRight size={14} />
          </div>
        ) : (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--slate-100)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'var(--slate-400)', flexShrink: 0
          }}>
            <Circle size={14} />
          </div>
        )}
        {!isLast && (
          <div style={{
            width: 2, flex: 1,
            background: isCompleted ? 'var(--green-300)' : 'var(--slate-200)',
            marginTop: 4
          }} />
        )}
      </div>

      {/* Content */}
      <div className={`card ${isCurrent ? 'card-sm' : 'card-sm'}`} style={{
        flex: 1, marginBottom: 12,
        borderColor: isCurrent ? 'var(--primary-300)' : undefined,
        background: isCurrent ? 'var(--primary-50)' : undefined,
        opacity: isUpcoming ? 0.75 : 1
      }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <h4 className={`text-sm font-semibold ${isCompleted ? 'text-slate-600' : ''}`}>
            {item.name}
            {isCurrent && (
              <span className="badge badge-primary" style={{ marginLeft: 8, fontSize: '0.5625rem' }}>
                Current
              </span>
            )}
          </h4>
          <span style={{
            padding: '2px 10px', borderRadius: 'var(--radius-full)',
            fontSize: '0.625rem', fontWeight: 600,
            background: dc.bg, color: dc.color
          }}>
            {item.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock size={12} />{item.time}</span>
          <span className="flex items-center gap-1"><Zap size={12} />{item.skills.length} skills</span>
        </div>
        {(isCurrent || isCompleted) && (
          <div className="flex flex-wrap gap-1" style={{ marginTop: 8 }}>
            {item.skills.map(s => (
              <span key={s} className="badge badge-slate" style={{ fontSize: '0.5625rem' }}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearningRoadmap() {
  const completedCount = roadmapData.filter(r => r.status === 'completed').length;
  const progress = Math.round((completedCount / roadmapData.length) * 100);

  return (
    <div>
      <div className="page-header">
        <h2>Your Full Stack Roadmap</h2>
        <p>A personalized path toward your target role.</p>
      </div>

      {/* Overview Card */}
      <div className="card card-lg" style={{ marginBottom: 28 }}>
        <div className="flex gap-8 items-center flex-wrap">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
              <Target size={16} style={{ color: 'var(--primary-600)' }} />
              <span className="text-xs text-slate-400 font-semibold" style={{
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                Target Role
              </span>
            </div>
            <h3 className="text-xl font-bold" style={{ marginBottom: 12 }}>Full Stack MERN Developer</h3>
            <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
              <div className="progress-bar" style={{ flex: 1, maxWidth: 300 }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-sm font-semibold text-primary">{progress}%</span>
            </div>
            <p className="text-xs text-slate-400">
              {completedCount} of {roadmapData.length} milestones completed
            </p>
          </div>

          <div className="flex gap-4">
            <div style={{
              padding: '16px 24px', borderRadius: 'var(--radius-xl)',
              background: 'var(--primary-50)', textAlign: 'center',
              border: '1px solid var(--primary-100)'
            }}>
              <p className="text-xs text-slate-500" style={{ marginBottom: 2 }}>Current Stage</p>
              <p className="text-lg font-bold text-primary">Node.js</p>
            </div>
            <div style={{
              padding: '16px 24px', borderRadius: 'var(--radius-xl)',
              background: 'var(--orange-50)', textAlign: 'center',
              border: '1px solid var(--orange-100)'
            }}>
              <p className="text-xs text-slate-500" style={{ marginBottom: 2 }}>Est. Time</p>
              <p className="text-lg font-bold text-orange">10 weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 700 }}>
        {roadmapData.map((item, i) => (
          <RoadmapItem
            key={item.id}
            item={item}
            index={i}
            isLast={i === roadmapData.length - 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="card" style={{
        marginTop: 24, textAlign: 'center',
        background: 'linear-gradient(135deg, var(--primary-50), white)',
        border: '1px solid var(--primary-100)'
      }}>
        <BookOpen size={28} style={{ color: 'var(--primary-600)', margin: '0 auto 8px' }} />
        <h3 className="text-lg font-semibold" style={{ marginBottom: 4 }}>Ready to continue?</h3>
        <p className="text-sm text-slate-500" style={{ marginBottom: 16 }}>
          Pick up where you left off with Node.js and keep building your skills.
        </p>
        <button className="btn btn-primary btn-lg">
          Continue Learning <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
