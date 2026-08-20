import { useNavigate } from 'react-router-dom';
import {
  Target, Sparkles, AlertTriangle, ArrowRight, TrendingUp, Zap
} from 'lucide-react';
import { skillsData, skillGapAnalysis } from '../data/mockData';

function SkillBar({ skill, name: propName, level: propLevel, coursesCompleted: propCourses }) {
  const name = skill?.name || propName || '';
  const level = skill?.level ?? propLevel ?? 0;
  const coursesCompleted = skill?.coursesCompleted || propCourses || '';
  
  let color = 'var(--primary-600)';
  let badgeBg = 'var(--primary-50)';
  let badgeBorder = 'var(--primary-100)';
  
  if (level >= 80) {
    color = 'var(--green-600)';
    badgeBg = 'var(--green-50)';
    badgeBorder = 'var(--green-100)';
  } else if (level < 60) {
    color = 'var(--orange-600)';
    badgeBg = 'var(--orange-50)';
    badgeBorder = 'var(--orange-100)';
  }

  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--slate-100)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="text-sm font-semibold text-slate-800">{name}</span>
          {coursesCompleted && (
            <span style={{
              fontSize: '0.6875rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: badgeBg,
              color: color,
              border: `1px solid ${badgeBorder}`,
              fontWeight: 500
            }}>
              {coursesCompleted}
            </span>
          )}
        </div>
        <span className="text-sm font-bold" style={{ color: color }}>
          {level}%
        </span>
      </div>
      <div className="progress-bar" style={{ height: 8, background: 'var(--slate-100)' }}>
        <div
          className="progress-bar-fill"
          style={{
            width: `${level}%`,
            background: color,
            transition: 'width 0.6s ease'
          }}
        />
      </div>
    </div>
  );
}

function CircularScore({ value }) {
  const size = 140;
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--slate-100)" strokeWidth={10} />
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="url(#skillGrad)" strokeWidth={10}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <defs>
          <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-600)" />
            <stop offset="100%" stopColor="var(--primary-400)" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span className="text-3xl font-bold" style={{ color: 'var(--slate-900)' }}>{value}%</span>
        <span className="text-xs text-slate-400">Skill Score</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Programming', data: skillsData.programming, icon: '💻' },
    { name: 'Frontend', data: skillsData.frontend, icon: '🎨' },
    { name: 'Backend', data: skillsData.backend, icon: '⚙️' },
    { name: 'Database', data: skillsData.database, icon: '🗄️' },
    { name: 'Tools', data: skillsData.tools, icon: '🛠️' },
  ];

  const priorityColors = {
    'HIGH': { bg: 'var(--red-50)', color: 'var(--red-600)', border: 'var(--red-100)' },
    'MEDIUM': { bg: 'var(--orange-50)', color: 'var(--orange-600)', border: 'var(--orange-100)' },
    'LOW': { bg: 'var(--green-50)', color: 'var(--green-700)', border: 'var(--green-100)' },
  };

  return (
    <div>
      <div className="page-header">
        <h2>Your Skills</h2>
        <p>Track your technical skills and identify areas for improvement.</p>
      </div>

      {/* Header Card */}
      <div className="card card-lg" style={{
        marginBottom: 28, display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap'
      }}>
        <CircularScore value={74} />
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
            <Target size={16} style={{ color: 'var(--primary-600)' }} />
            <p className="text-xs text-slate-400 font-semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Target Role
            </p>
          </div>
          <h3 className="text-xl font-bold" style={{ marginBottom: 4 }}>Full Stack MERN Developer</h3>
          <p className="text-sm text-slate-500" style={{ lineHeight: 1.7 }}>
            Your skill profile is well-rounded with strong frontend capabilities. Focus on backend and DevOps to
            reach your target role.
          </p>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-2 gap-5" style={{ marginBottom: 28 }}>
        {categories.map(cat => (
          <div key={cat.name} className="card">
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
              <h3 className="text-sm font-semibold">{cat.name}</h3>
            </div>
            <div>
              {cat.data.map(skill => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Skill Gap Analysis */}
      <div className="card card-lg" style={{
        background: 'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)',
        color: 'white', border: 'none'
      }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
          <Sparkles size={18} style={{ color: 'var(--primary-400)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>AI Skill Gap Analysis</h3>
        </div>
        <p style={{
          fontSize: '0.875rem', lineHeight: 1.8, opacity: 0.85, marginBottom: 24, maxWidth: 700
        }}>
          You're strong in frontend development and JavaScript. To become a stronger full-stack candidate,
          focus on Express.js, Docker, AWS and system design.
        </p>
        <div className="flex gap-3 flex-wrap" style={{ marginBottom: 24 }}>
          {skillGapAnalysis.map(item => {
            const pc = priorityColors[item.priority];
            return (
              <div key={item.skill} style={{
                padding: '10px 16px', borderRadius: 'var(--radius-lg)',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.625rem', fontWeight: 700,
                  background: pc.bg, color: pc.color
                }}>
                  {item.priority}
                </span>
                <span className="text-sm font-medium">{item.skill}</span>
              </div>
            );
          })}
        </div>
        <button className="btn" style={{
          background: 'var(--primary-600)', color: 'white',
          border: 'none'
        }} onClick={() => navigate('/roadmap')}>
          Generate Learning Plan <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
