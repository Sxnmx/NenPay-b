import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 2600) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const colors = {
    info: { bg: 'rgba(0, 102, 255, 0.15)', border: '#0066ff', text: '#4da3ff', icon: 'ℹ️' },
    success: { bg: 'rgba(0, 200, 83, 0.15)', border: '#00c853', text: '#00c853', icon: '✅' },
    error: { bg: 'rgba(255, 82, 82, 0.15)', border: '#ff5252', text: '#ff5252', icon: '⚠️' },
    warning: { bg: 'rgba(255, 152, 0, 0.15)', border: '#ff9800', text: '#ff9800', icon: '⚠️' },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 'calc(16px + var(--safe-top))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: 'min(92vw, 380px)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => {
          const c = colors[t.type] || colors.info;
          return (
            <div
              key={t.id}
              onClick={() => removeToast(t.id)}
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.text,
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'slideDown 0.25s ease',
                pointerEvents: 'auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <span>{c.icon}</span>
              <span style={{ flex: 1 }}>{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};