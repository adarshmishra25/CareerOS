import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  MapPin, GraduationCap, Mail, Edit3, Save, X, Briefcase,
  ExternalLink, Code, Globe, CheckCircle
} from 'lucide-react';
import { userData, allSkills, projects } from '../data/mockData';

export default function Profile() {
  const { addToast } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userData.name,
    role: userData.role,
    about: userData.about,
    college: userData.college,
    location: userData.location,
    email: userData.email
  });
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editForm });
    setIsEditing(false);
    addToast('Profile updated successfully.', 'success');
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <h2>My Profile</h2>
          {!isEditing ? (
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
              <Edit3 size={14} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="btn btn-secondary" onClick={handleCancel}>
                <X size={14} /> Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <Save size={14} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="card card-lg" style={{ marginBottom: 24 }}>
        <div className="flex gap-5" style={{ flexWrap: 'wrap' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, var(--primary-500), var(--primary-300))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.75rem', fontWeight: 700, flexShrink: 0
          }}>
            {userData.initials}
          </div>
          <div style={{ flex: 1 }}>
            {isEditing ? (
              <div className="flex flex-col gap-3">
                <input className="input" value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Full Name" />
                <input className="input" value={editForm.role}
                  onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                  placeholder="Title / Role" />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold" style={{ marginBottom: 4 }}>{profile.name}</h3>
                <p className="text-base text-slate-500" style={{ marginBottom: 8 }}>{profile.role}</p>
              </>
            )}
            <div className="flex flex-wrap gap-4 text-xs text-slate-400" style={{ marginTop: isEditing ? 12 : 0 }}>
              <span className="flex items-center gap-1">
                <GraduationCap size={14} /> {profile.college}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={14} /> {profile.email}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              padding: '12px 20px', borderRadius: 'var(--radius-xl)',
              background: 'var(--green-50)', border: '1px solid var(--green-100)'
            }}>
              <p className="text-xs text-slate-500">Profile Completion</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--green-600)' }}>
                {userData.profileCompletion}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* About Me */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: 12 }}>About Me</h3>
          {isEditing ? (
            <textarea className="input" rows={4} value={editForm.about}
              onChange={e => setEditForm({ ...editForm, about: e.target.value })}
              style={{ resize: 'vertical' }} />
          ) : (
            <p className="text-sm text-slate-600" style={{ lineHeight: 1.7 }}>
              {profile.about}
            </p>
          )}
        </div>

        {/* Education */}
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: 12 }}>Education</h3>
          <div className="flex gap-3 items-start">
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--radius-md)',
              background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--primary-600)', flexShrink: 0
            }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">{userData.education.degree}</h4>
              <p className="text-xs text-slate-500">{userData.education.institution}</p>
              <p className="text-xs text-slate-400" style={{ marginTop: 2 }}>{userData.education.years}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 className="section-title" style={{ marginBottom: 12 }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginTop: 24 }}>
        <h3 className="section-title" style={{ marginBottom: 12 }}>Projects</h3>
        <div className="grid grid-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--primary-600)'
                  }}>
                    <Code size={16} />
                  </div>
                  <h4 className="text-sm font-semibold">{project.name}</h4>
                </div>
                <span className={`badge ${project.status === 'Completed' ? 'badge-green' : 'badge-primary'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-500" style={{ lineHeight: 1.6, flex: 1 }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map(t => (
                  <span key={t} className="badge badge-slate" style={{ fontSize: '0.625rem' }}>{t}</span>
                ))}
              </div>
              <button className="btn btn-secondary btn-sm w-full">
                <ExternalLink size={12} /> View Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
