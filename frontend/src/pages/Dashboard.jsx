import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  TrendingUp, Zap, ClipboardList, UserCheck, Target, Briefcase,
  MapPin, Clock, ChevronRight, Sparkles, CheckCircle, Circle,
  ArrowUpRight, Star, BookOpen, ExternalLink
} from 'lucide-react';
import {
  userData, jobsData, applicationsData, applicationStats,
  strengths, focusAreas, careerGoals
} from '../data/mockData';
import { getGreeting } from '../utils/helpers';

function MetricCard({ icon: Icon, title, value, subtitle, color, bgColor }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--radius-lg)',
        background: bgColor, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: color, flexShrink: 0
      }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <p className="text-sm text-slate-500" style={{ marginBottom: 2 }}>{title}</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--slate-900)', lineHeight: 1.2 }}>{value}</p>
        <p className="text-xs" style={{ color: color, fontWeight: 500, marginTop: 2 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function CircularProgress({ value, size = 160, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="var(--slate-100)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="url(#gradient)" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary-600)" />
          <stop offset="100%" stopColor="var(--primary-400)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useOutletContext();
  const [savedJobs, setSavedJobs] = useState([]);

  const topJobs = jobsData.slice(0, 4);
  const recentApps = applicationsData.slice(0, 3);
  const mainGoal = careerGoals[0];

  const statusColors = {
    'Applied': 'var(--primary-600)',
    'Shortlisted': 'var(--orange-500)',
    'Interview': 'var(--green-600)',
    'Offer': 'var(--green-500)',
    'Rejected': 'var(--red-500)'
  };

  const statusBg = {
    'Applied': 'var(--primary-50)',
    'Shortlisted': 'var(--orange-50)',
    'Interview': 'var(--green-50)',
    'Offer': 'var(--green-50)',
    'Rejected': 'var(--red-50)'
  };

  const handleApply = (job) => {
    if (job?.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    }
    addToast(`Opening ${job?.platform || 'job'} portal... Added to your application tracker.`, 'success');
  };

  const toggleSave = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 style={{ fontSize: '1.625rem' }}>{getGreeting()}, {userData.firstName} 👋</h2>
            <p>Here's your career progress at a glance.</p>
          </div>
          <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
            <Sparkles size={12} /> Interactive Prototype
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-4 gap-5" style={{ marginBottom: 28 }}>
        <MetricCard
          icon={TrendingUp} title="Career Readiness" value="78%"
          subtitle="+8% this month" color="var(--primary-600)" bgColor="var(--primary-50)"
        />
        <MetricCard
          icon={Zap} title="Skills" value="14 / 20"
          subtitle="6 skills to improve" color="var(--orange-500)" bgColor="var(--orange-50)"
        />
        <MetricCard
          icon={ClipboardList} title="Applications" value="12"
          subtitle="3 interviews" color="var(--green-600)" bgColor="var(--green-50)"
        />
        <MetricCard
          icon={UserCheck} title="Profile Strength" value="92%"
          subtitle="Excellent" color="var(--green-600)" bgColor="var(--green-50)"
        />
      </div>

      {/* Career Readiness + AI Insight */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1.2fr 0.8fr', marginBottom: 28 }}>
        {/* Career Readiness */}
        <div className="card card-lg">
          <h3 className="section-title" style={{ marginBottom: 20 }}>Career Readiness</h3>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress value={78} size={160} />
              <div style={{
                position: 'absolute', textAlign: 'center',
                transform: 'rotate(0deg)'
              }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--slate-900)' }}>78%</div>
                <div className="text-xs text-slate-400" style={{ fontWeight: 500 }}>Career Ready</div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 240 }}>
              <p className="text-sm text-slate-600" style={{ marginBottom: 16, lineHeight: 1.7 }}>
                You're making strong progress toward your target role.
              </p>
              <div className="flex gap-3" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <p className="text-xs text-slate-400 font-medium" style={{ marginBottom: 4 }}>Target Role</p>
                  <p className="text-sm font-semibold">{userData.targetRole}</p>
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <p className="text-xs text-slate-400 font-medium" style={{ marginBottom: 4 }}>Target Industry</p>
                  <p className="text-sm font-semibold">{userData.targetIndustry}</p>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <p className="text-xs text-slate-400 font-semibold" style={{ marginBottom: 6 }}>Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {strengths.map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-semibold" style={{ marginBottom: 6 }}>Focus Areas</p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map(s => (
                    <span key={s} className="badge badge-orange">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/skills')}>
              View Career Analysis <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* AI Insight */}
        <div className="card card-lg" style={{
          background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
          color: 'white', border: 'none'
        }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
            <Sparkles size={18} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>CareerOS AI Insight</h3>
          </div>
          <p style={{
            fontSize: '0.875rem', lineHeight: 1.8, opacity: 0.95, marginBottom: 24
          }}>
            Your JavaScript and React foundations are strong. Improving backend development with
            Node.js and Express, along with deployment skills, could significantly increase your
            job readiness.
          </p>
          <button className="btn" style={{
            background: 'rgba(255,255,255,0.2)', color: 'white',
            border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)'
          }} onClick={() => navigate('/skills')}>
            Explore Skill Gaps <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div>
            <h3 className="section-title">Recommended Jobs</h3>
            <p className="section-subtitle">Opportunities matched to your current skills.</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/jobs')}>
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-2 gap-4">
          {topJobs.map(job => (
            <div key={job.id} className="card card-sm" style={{
              border: '1px solid var(--slate-150, var(--slate-200))',
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold" style={{ marginBottom: 2 }}>{job.title}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-500">{job.company}</p>
                    <span className="badge badge-slate" style={{ fontSize: '0.5625rem', padding: '1px 6px' }}>
                      via {job.platform}
                    </span>
                  </div>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.625rem' }}>
                  {job.match}% Match
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                <span>{job.salary}</span>
                <span>{job.type}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 4).map(s => (
                  <span key={s} className="skill-tag" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>{s}</span>
                ))}
              </div>
              <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}
                  onClick={() => handleApply(job)}>
                  Apply on {job.platform} <ExternalLink size={12} />
                </button>
                <button className="btn btn-secondary btn-sm"
                  onClick={() => toggleSave(job.id)}
                  style={{ color: savedJobs.includes(job.id) ? 'var(--primary-600)' : undefined }}>
                  <Star size={14} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Overview + Career Goals */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* Application Overview */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <h3 className="section-title">Application Overview</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/applications')}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 flex-wrap" style={{ marginBottom: 20 }}>
            {[
              { label: 'Applied', value: applicationStats.total, color: 'var(--primary-600)', bg: 'var(--primary-50)' },
              { label: 'Shortlisted', value: applicationStats.shortlisted, color: 'var(--orange-500)', bg: 'var(--orange-50)' },
              { label: 'Interviews', value: applicationStats.interview, color: 'var(--green-600)', bg: 'var(--green-50)' },
              { label: 'Offer', value: applicationStats.offer, color: 'var(--green-500)', bg: 'var(--green-50)' },
              { label: 'Rejected', value: applicationStats.rejected, color: 'var(--red-500)', bg: 'var(--red-50)' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '10px 16px', borderRadius: 'var(--radius-lg)',
                background: stat.bg, textAlign: 'center', minWidth: 70
              }}>
                <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-400" style={{ marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recent Applications
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentApps.map((app, i) => (
              <div key={app.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < recentApps.length - 1 ? '1px solid var(--slate-100)' : 'none'
              }}>
                <div>
                  <p className="text-sm font-medium">{app.company}</p>
                  <p className="text-xs text-slate-400">{app.role} • {app.date}</p>
                </div>
                <span className="badge" style={{
                  background: statusBg[app.status], color: statusColors[app.status],
                  border: 'none'
                }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Goals */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <h3 className="section-title">Your Career Goals</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/goals')}>
              Manage Goals <ChevronRight size={14} />
            </button>
          </div>
          <div style={{
            padding: 16, borderRadius: 'var(--radius-lg)',
            background: 'var(--primary-50)', border: '1px solid var(--primary-100)',
            marginBottom: 16
          }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
              <Target size={16} style={{ color: 'var(--primary-600)' }} />
              <h4 className="text-sm font-semibold">{mainGoal.title}</h4>
            </div>
            <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
              <div className="progress-bar" style={{ flex: 1 }}>
                <div className="progress-bar-fill" style={{ width: `${mainGoal.progress}%` }} />
              </div>
              <span className="text-sm font-semibold text-primary">{mainGoal.progress}%</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {mainGoal.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2" style={{ padding: '4px 0' }}>
                {m.done ? (
                  <CheckCircle size={16} style={{ color: 'var(--green-500)' }} />
                ) : (
                  <Circle size={16} style={{ color: 'var(--slate-300)' }} />
                )}
                <span className={`text-sm ${m.done ? 'text-slate-600' : 'text-slate-400'}`}
                  style={m.done ? { textDecoration: 'none' } : {}}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
