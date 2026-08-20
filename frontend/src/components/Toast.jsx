import { CheckCircle, Info, AlertTriangle, X, XCircle } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: XCircle
};

export default function Toast({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        const Icon = iconMap[toast.type] || CheckCircle;
        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <Icon size={16} />
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} style={{ color: 'white', opacity: 0.7, display: 'flex' }}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
