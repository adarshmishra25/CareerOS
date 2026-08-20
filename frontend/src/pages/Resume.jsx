import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileText, Download, Eye, Edit3, Sparkles, CheckCircle,
  AlertCircle, ArrowRight, Star
} from 'lucide-react';
import { resumeData, userData, allSkills } from '../data/mockData';

function ScoreRing({ score, size = 120 }) {
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? 'var(--green-500)' : score >= 70 ? 'var(--primary-500)' : 'var(--orange-500)';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--slate-100)" strokeWidth={10} />
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span className="text-3xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
    </div>
  );
}

export default function Resume() {
  const { addToast } = useOutletContext();
  const [activeTab, setActiveTab] = useState('preview');

  const handleDownload = () => {
    addToast('PDF export is available in the full version.', 'info');
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h2>My Resume</h2>
            <p>Manage and optimize your resume for better opportunities.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={() => setActiveTab('edit')}>
              <Edit3 size={14} /> Edit Resume
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('preview')}>
              <Eye size={14} /> Preview
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 360px' }}>
        {/* Resume Preview */}
        <div className="card card-lg">
          {activeTab === 'preview' ? (
            <div style={{ fontFamily: "'Inter', sans-serif" }}>
              {/* Resume Header */}
              <div style={{
                borderBottom: '2px solid var(--primary-600)',
                paddingBottom: 16, marginBottom: 20
              }}>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--slate-900)', marginBottom: 4 }}>
                  {userData.name}
                </h2>
                <p className="text-sm text-primary font-medium" style={{ marginBottom: 8 }}>{userData.targetRole}</p>
                <p className="text-xs text-slate-400">
                  {userData.location} • {userData.email} • github.com/adarshmishra
                </p>
              </div>

              {/* About */}
              <div style={{ marginBottom: 20 }}>
                <h3 className="text-sm font-bold" style={{
                  color: 'var(--primary-700)', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: 8
                }}>Summary</h3>
                <p className="text-xs text-slate-600" style={{ lineHeight: 1.7 }}>
                  {userData.about}
                </p>
              </div>

              {/* Education */}
              <div style={{ marginBottom: 20 }}>
                <h3 className="text-sm font-bold" style={{
                  color: 'var(--primary-700)', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: 8
                }}>Education</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{userData.education.degree}</p>
                    <p className="text-xs text-slate-500">{userData.education.institution}</p>
                  </div>
                  <span className="text-xs text-slate-400">{userData.education.years}</span>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 20 }}>
                <h3 className="text-sm font-bold" style={{
                  color: 'var(--primary-700)', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: 8
                }}>Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <span key={skill} className="badge badge-slate">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-sm font-bold" style={{
                  color: 'var(--primary-700)', textTransform: 'uppercase',
                  letterSpacing: '0.05em', marginBottom: 8
                }}>Projects</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <p className="text-sm font-semibold">CareerOS</p>
                    <p className="text-xs text-slate-500" style={{ lineHeight: 1.6 }}>
                      AI-powered career management platform built with React, Node.js, Express.js and MongoDB.
                      Features include career readiness tracking, skill gap analysis, and AI-powered recommendations.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">MarkVault</p>
                    <p className="text-xs text-slate-500" style={{ lineHeight: 1.6 }}>
                      Modern bookmark manager with tag-based organization and full-text search.
                      Built with React and Node.js.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Spotify Clone</p>
                    <p className="text-xs text-slate-500" style={{ lineHeight: 1.6 }}>
                      Full-featured music streaming interface with playlist management, audio playback and responsive design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="section-title" style={{ marginBottom: 16 }}>Edit Resume</h3>
              <p className="text-sm text-slate-500" style={{ marginBottom: 16 }}>
                Make changes to your resume content below. Changes are saved to your prototype state.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Summary</label>
                  <textarea className="input" rows={3} defaultValue={userData.about} style={{ resize: 'vertical' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" style={{ display: 'block', marginBottom: 4 }}>Skills (comma separated)</label>
                  <input className="input" defaultValue={allSkills.join(', ')} />
                </div>
                <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}
                  onClick={() => { setActiveTab('preview'); addToast('Resume updated successfully.', 'success'); }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Resume Score */}
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 className="section-title" style={{ marginBottom: 16 }}>Resume Score</h3>
            <div className="flex justify-center" style={{ marginBottom: 20 }}>
              <ScoreRing score={resumeData.score} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resumeData.breakdown.map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span className="text-xs font-semibold">{item.score}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className={`progress-bar-fill ${item.score >= 90 ? 'green' : ''}`}
                      style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Resume Suggestions */}
          <div className="card">
            <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
              <Sparkles size={16} style={{ color: 'var(--primary-600)' }} />
              <h3 className="text-sm font-semibold">AI Resume Suggestions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resumeData.suggestions.map((suggestion, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <AlertCircle size={14} style={{
                    color: 'var(--orange-500)', marginTop: 2, flexShrink: 0
                  }} />
                  <p className="text-xs text-slate-600" style={{ lineHeight: 1.5 }}>
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
