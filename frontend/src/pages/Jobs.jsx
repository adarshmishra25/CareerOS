import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Search, MapPin, Clock, Briefcase, Star, Filter, ChevronDown,
  X, Building2, DollarSign, Users, CheckCircle, ExternalLink, Globe
} from 'lucide-react';
import { jobsData } from '../data/mockData';

function JobDetailModal({ job, onClose, onApply, isSaved, onToggleSave }) {
  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <span className="text-xs text-slate-400">Listed on {job.platform || 'Partner Platform'}</span>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--primary-600)'
            }}>
              <Building2 size={22} />
            </div>
            <div>
              <h4 className="text-base font-semibold">{job.company}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1"><DollarSign size={12} />{job.salary}</span>
                <span className="flex items-center gap-1"><Users size={12} />{job.experience}</span>
                <span className="badge badge-slate" style={{ fontSize: '0.625rem' }}>via {job.platform}</span>
              </div>
            </div>
            <span className="badge badge-green" style={{ marginLeft: 'auto' }}>{job.match}% Match</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>About this role</h4>
            <p className="text-sm text-slate-600" style={{ lineHeight: 1.7 }}>{job.description}</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>Responsibilities</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle size={14} style={{
                    color: 'var(--green-500)', marginTop: 3, flexShrink: 0
                  }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>

          <div style={{
            padding: 16, borderRadius: 'var(--radius-lg)',
            background: 'var(--primary-50)', border: '1px solid var(--primary-100)',
            marginBottom: 16
          }}>
            <h4 className="text-sm font-semibold text-primary" style={{ marginBottom: 4 }}>
              Why CareerOS recommends this job
            </h4>
            <p className="text-xs text-slate-600" style={{ lineHeight: 1.6 }}>
              {job.whyRecommended}
            </p>
          </div>

          <div style={{
            padding: '12px 16px', borderRadius: 'var(--radius-md)',
            background: 'var(--slate-50)', border: '1px dashed var(--slate-300)',
            display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--slate-600)'
          }}>
            <Globe size={16} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
            <span>This opportunity is hosted on <strong>{job.platform}</strong>. Clicking below will direct you to their official application portal.</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onToggleSave}>
            <Star size={14} fill={isSaved ? 'currentColor' : 'none'}
              style={{ color: isSaved ? 'var(--primary-600)' : undefined }} />
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
          <button className="btn btn-primary" onClick={onApply}>
            Apply on {job.platform} <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Jobs() {
  const { addToast } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Recommended');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '', type: '', experience: '', salary: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const tabs = ['Recommended', 'Latest', 'Saved'];

  const toggleSave = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = (job) => {
    if (job?.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    }
    addToast(`Opening ${job?.platform || 'job'} portal... Added to application tracker.`, 'success');
    setSelectedJob(null);
  };

  let filteredJobs = [...jobsData];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredJobs = filteredJobs.filter(j =>
      j.title.toLowerCase().includes(term) ||
      j.company.toLowerCase().includes(term) ||
      j.platform.toLowerCase().includes(term) ||
      j.skills.some(s => s.toLowerCase().includes(term))
    );
  }

  if (filters.location) {
    filteredJobs = filteredJobs.filter(j =>
      j.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  if (filters.type) {
    filteredJobs = filteredJobs.filter(j => j.type === filters.type);
  }

  if (activeTab === 'Saved') {
    filteredJobs = filteredJobs.filter(j => savedJobs.includes(j.id));
  } else if (activeTab === 'Recommended') {
    filteredJobs.sort((a, b) => b.match - a.match);
  } else {
    // Latest - keep default order
  }

  return (
    <div>
      <div className="page-header">
        <h2>Find Your Next Opportunity</h2>
        <p>AI-curated recommendations linked directly to verified hiring portals (LinkedIn, Naukri, Internshala, Indeed).</p>
      </div>

      {/* Info Banner */}
      <div style={{
        padding: '12px 18px', borderRadius: 'var(--radius-lg)',
        background: 'var(--primary-50)', border: '1px solid var(--primary-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20, flexWrap: 'wrap', gap: 12
      }}>
        <div className="flex items-center gap-3">
          <Globe size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
          <p className="text-xs text-slate-700">
            <strong>How it works:</strong> CareerOS analyzes your skill matrix and matches you with live openings across top career platforms. Click <strong>Apply</strong> to jump directly to the listing on the respective site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {['LinkedIn', 'Naukri', 'Internshala', 'Indeed'].map(p => (
            <span key={p} className="badge badge-slate" style={{ fontSize: '0.625rem' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap'
      }}>
        <div className="topbar-search" style={{ flex: 1, minWidth: 280, maxWidth: 'none' }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search jobs, companies, skills, or platforms (e.g. LinkedIn, Internshala)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{ color: 'var(--slate-400)' }}>
              <X size={14} />
            </button>
          )}
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={14} /> Filters <ChevronDown size={14} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card card-sm" style={{ marginBottom: 20, animation: 'slideDown 0.2s ease' }}>
          <div className="grid grid-4 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500" style={{ display: 'block', marginBottom: 4 }}>Location</label>
              <select className="select" value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}>
                <option value="">All Locations</option>
                <option value="Noida">Noida</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500" style={{ display: 'block', marginBottom: 4 }}>Job Type</label>
              <select className="select" value={filters.type}
                onChange={e => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500" style={{ display: 'block', marginBottom: 4 }}>Experience</label>
              <select className="select" value={filters.experience}
                onChange={e => setFilters({ ...filters, experience: e.target.value })}>
                <option value="">All Levels</option>
                <option value="0">Fresher</option>
                <option value="1-2">1–2 years</option>
                <option value="2+">2+ years</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500" style={{ display: 'block', marginBottom: 4 }}>Salary</label>
              <select className="select" value={filters.salary}
                onChange={e => setFilters({ ...filters, salary: e.target.value })}>
                <option value="">Any Salary</option>
                <option value="0-5">₹0–5 LPA</option>
                <option value="5-10">₹5–10 LPA</option>
                <option value="10+">₹10+ LPA</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
            {tab === 'Saved' && savedJobs.length > 0 && (
              <span style={{
                marginLeft: 6, background: 'var(--primary-100)', color: 'var(--primary-700)',
                borderRadius: 'var(--radius-full)', padding: '0 6px', fontSize: '0.625rem',
                fontWeight: 600
              }}>
                {savedJobs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid grid-2 gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div style={{
                  width: 42, height: 42, borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--primary-600)', flexShrink: 0
                }}>
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ marginBottom: 2 }}>{job.title}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-500">{job.company}</p>
                    <span className="badge badge-slate" style={{ fontSize: '0.5625rem', padding: '1px 6px' }}>
                      via {job.platform}
                    </span>
                  </div>
                </div>
              </div>
              <span className="badge badge-green">{job.match}% Match</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
              <span className="flex items-center gap-1"><DollarSign size={12} />{job.salary}</span>
              <span className="flex items-center gap-1"><Briefcase size={12} />{job.experience}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {job.skills.map(s => (
                <span key={s} className="skill-tag" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>{s}</span>
              ))}
            </div>

            <div className="flex gap-2" style={{ marginTop: 'auto' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => toggleSave(job.id)}
                style={{ color: savedJobs.includes(job.id) ? 'var(--primary-600)' : undefined }}>
                <Star size={14} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
              </button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}
                onClick={() => setSelectedJob(job)}>
                View Details
              </button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1.2 }}
                onClick={() => handleApply(job)}>
                Apply on {job.platform} <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <Briefcase size={40} style={{ color: 'var(--slate-300)', margin: '0 auto 12px' }} />
          <p className="text-sm text-slate-500">
            {activeTab === 'Saved' ? 'No saved jobs yet. Star a job to save it.' : 'No jobs found matching your criteria.'}
          </p>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => handleApply(selectedJob)}
          isSaved={savedJobs.includes(selectedJob.id)}
          onToggleSave={() => toggleSave(selectedJob.id)}
        />
      )}
    </div>
  );
}
