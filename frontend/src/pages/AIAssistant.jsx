import { useState, useRef, useEffect } from 'react';
import {
  Send, Sparkles, Bot, User, TrendingUp, Zap, BookOpen,
  FileText, Briefcase, ArrowRight
} from 'lucide-react';
import { aiSuggestedPrompts, userData, strengths, focusAreas } from '../data/mockData';

const mockResponses = {
  'internship': {
    text: "You're getting close! Your React and JavaScript foundations are strong, but I'd recommend strengthening Node.js, Express.js, MongoDB and deployment before applying broadly.",
    hasReadiness: true,
    nextStep: 'Build a full-stack MERN application with authentication and REST APIs.'
  },
  'ready': {
    text: "You're getting close! Your React and JavaScript foundations are strong, but I'd recommend strengthening Node.js, Express.js, MongoDB and deployment before applying broadly.",
    hasReadiness: true,
    nextStep: 'Build a full-stack MERN application with authentication and REST APIs.'
  },
  'mern': {
    text: "You're getting close! Your React and JavaScript foundations are strong, but I'd recommend strengthening Node.js, Express.js, MongoDB and deployment before applying broadly.",
    hasReadiness: true,
    nextStep: 'Build a full-stack MERN application with authentication and REST APIs.'
  },
  'resume': {
    text: "Your resume is already strong, but adding measurable project outcomes and relevant backend technologies would improve your ATS score. Consider quantifying your project impact — for example, 'Reduced load time by 40%' instead of 'Improved performance'.",
    hasReadiness: false,
    nextStep: 'Add metrics to your project descriptions and include your GitHub profile link.'
  },
  'learn': {
    text: "Based on your current profile, I recommend focusing next on Node.js, Express.js, MongoDB and Docker. This will round out your MERN stack skills and make you competitive for full-stack roles.",
    hasReadiness: false,
    nextStep: 'Start with the Node.js module in your learning roadmap — you\'re 62% through it.'
  },
  'job': {
    text: "Your strongest matches are junior MERN developer, frontend developer and full-stack intern roles. Based on your 78% career readiness score, I'd recommend focusing on internships and junior positions where your React expertise will be most valued.",
    hasReadiness: false,
    nextStep: 'Apply to the top 3 recommended jobs on your Jobs page — they have 88%+ match rates.'
  },
  'skill': {
    text: "Your skill profile shows strong frontend capabilities (React 82%, JavaScript 88%) but gaps in DevOps (Docker 42%, AWS 35%). Closing these gaps would increase your career readiness score by approximately 12%.",
    hasReadiness: false,
    nextStep: 'Focus on Docker basics first — it\'s the highest-priority skill gap identified.'
  },
  'project': {
    text: "Your project portfolio is solid with CareerOS, MarkVault and Spotify Clone. To strengthen your full-stack credentials, I recommend building a project that showcases backend APIs, authentication and database design — like a task management app with user accounts.",
    hasReadiness: false,
    nextStep: 'Start a new MERN project with JWT authentication and MongoDB CRUD operations.'
  },
  'default': {
    text: "That's a great question! Based on your profile as a Computer Science student targeting Full Stack MERN Developer roles, I'd suggest focusing on strengthening your backend and DevOps skills. Your frontend skills are already competitive — now it's time to build the full picture.",
    hasReadiness: false,
    nextStep: 'Check your Skills page for a detailed gap analysis and your Roadmap for next steps.'
  }
};

function getAIResponse(message) {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (key !== 'default' && lower.includes(key)) {
      return response;
    }
  }
  return mockResponses['default'];
}

function ReadinessCard() {
  return (
    <div style={{
      padding: 16, borderRadius: 'var(--radius-lg)',
      background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
      marginTop: 12
    }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <TrendingUp size={14} style={{ color: 'var(--primary-600)' }} />
        <span className="text-xs font-semibold text-slate-600">Career Readiness</span>
        <span className="text-lg font-bold text-primary" style={{ marginLeft: 'auto' }}>78%</span>
      </div>
      <div className="flex gap-3 flex-wrap" style={{ marginBottom: 8 }}>
        <div>
          <p className="text-xs text-slate-400" style={{ marginBottom: 4 }}>Strong Areas</p>
          <div className="flex gap-1 flex-wrap">
            {['JavaScript', 'React', 'Git'].map(s => (
              <span key={s} className="skill-tag" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-400" style={{ marginBottom: 4 }}>Focus Areas</p>
          <div className="flex gap-1 flex-wrap">
            {['Node.js', 'Express.js', 'Docker', 'AWS'].map(s => (
              <span key={s} className="badge badge-orange" style={{ fontSize: '0.625rem' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `Hi ${userData.firstName}! 👋 I'm your CareerOS AI assistant. I can help you with career guidance, skill analysis, job recommendations, resume tips and learning plans. What would you like to know?`,
      response: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: messageText
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(messageText);
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: response.text,
        response
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-height) - 48px)',
      maxHeight: 'calc(100vh - var(--topbar-height) - 48px)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 4 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary-600), var(--primary-400))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold">CareerOS AI</h2>
            <p className="text-xs text-slate-400">Your personal career copilot</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="card" style={{
        flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        padding: 0
      }}>
        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: 24,
          display: 'flex', flexDirection: 'column', gap: 20
        }}>
          {/* Suggested Prompts (only show if just 1 message) */}
          {messages.length <= 1 && (
            <div style={{ marginBottom: 8 }}>
              <p className="text-xs text-slate-400 font-medium" style={{ marginBottom: 8 }}>
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestedPrompts.map((prompt, i) => (
                  <button key={i} className="btn btn-secondary btn-sm"
                    onClick={() => handleSend(prompt)}
                    style={{ fontSize: '0.75rem' }}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex', gap: 12,
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start'
            }}>
              {/* Avatar */}
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-full)',
                background: msg.role === 'assistant'
                  ? 'linear-gradient(135deg, var(--primary-600), var(--primary-400))'
                  : 'linear-gradient(135deg, var(--slate-600), var(--slate-400))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', flexShrink: 0
              }}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>

              {/* Message Content */}
              <div style={{
                maxWidth: '70%', padding: '12px 16px',
                borderRadius: msg.role === 'user'
                  ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)'
                  : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                background: msg.role === 'user' ? 'var(--primary-600)' : 'var(--slate-50)',
                color: msg.role === 'user' ? 'white' : 'var(--slate-700)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--slate-200)'
              }}>
                <p className="text-sm" style={{ lineHeight: 1.7 }}>{msg.text}</p>

                {/* Readiness card for AI */}
                {msg.response?.hasReadiness && <ReadinessCard />}

                {/* Next Step */}
                {msg.response?.nextStep && (
                  <div style={{
                    marginTop: 12, padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: msg.role === 'user' ? 'rgba(255,255,255,0.15)' : 'var(--primary-50)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--primary-100)'
                  }}>
                    <p className="text-xs font-semibold" style={{
                      color: msg.role === 'user' ? 'white' : 'var(--primary-700)',
                      marginBottom: 2
                    }}>
                      ✨ Recommended next step
                    </p>
                    <p className="text-xs" style={{
                      color: msg.role === 'user' ? 'rgba(255,255,255,0.9)' : 'var(--slate-600)',
                      lineHeight: 1.5
                    }}>
                      {msg.response.nextStep}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--primary-600), var(--primary-400))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Bot size={16} />
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                background: 'var(--slate-50)', border: '1px solid var(--slate-200)'
              }}>
                <div className="flex gap-1 items-center">
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-400)',
                    animation: 'pulse 1.5s infinite'
                  }} />
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-400)',
                    animation: 'pulse 1.5s infinite 0.3s'
                  }} />
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--slate-400)',
                    animation: 'pulse 1.5s infinite 0.6s'
                  }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid var(--slate-100)',
          background: 'white'
        }}>
          <div style={{
            display: 'flex', gap: 12, alignItems: 'flex-end',
            background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-xl)', padding: '8px 8px 8px 16px',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
          }}>
            <input
              type="text"
              placeholder="Ask CareerOS anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1, background: 'transparent', fontSize: '0.875rem',
                color: 'var(--slate-700)', padding: '8px 0'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              style={{
                width: 38, height: 38, borderRadius: 'var(--radius-lg)',
                background: input.trim() ? 'var(--primary-600)' : 'var(--slate-200)',
                color: input.trim() ? 'white' : 'var(--slate-400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all var(--transition-fast)',
                cursor: input.trim() ? 'pointer' : 'default',
                flexShrink: 0
              }}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-slate-400" style={{ textAlign: 'center', marginTop: 8 }}>
            CareerOS AI uses mock responses for this prototype demonstration.
          </p>
        </div>
      </div>
    </div>
  );
}
