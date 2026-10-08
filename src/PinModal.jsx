import React, { useState, useEffect } from 'react';

const PinModal = ({ isOpen, onClose, onSuccess, title = 'Enter Transaction PIN', subtitle = 'Authorize this transaction with your 4-digit PIN', verifyPin, colors }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (pin.length === 4) {
      const ok = verifyPin(pin);
      if (ok) {
        onSuccess();
        setPin('');
      } else {
        setError('Incorrect PIN. Try again.');
        setPin('');
        setTimeout(() => setError(''), 1800);
      }
    }
  }, [pin]);

  if (!isOpen) return null;

  const press = (digit) => {
    if (pin.length < 4) setPin((p) => p + digit);
  };
  const backspace = () => setPin((p) => p.slice(0, -1));

  const keypad = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          background: colors.card,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          border: `1px solid ${colors.border}`,
          padding: '24px 20px calc(24px + var(--safe-bottom))',
          animation: 'slideUp 0.3s ease',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
          <h3 style={{ color: colors.text, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>
            {title}
          </h3>
          <p style={{ color: colors.textSecondary, fontSize: '13px' }}>{subtitle}</p>
        </div>

        {/* PIN dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          {[0,1,2,3].map((i) => (
            <div
              key={i}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: pin.length > i ? '#0066ff' : 'transparent',
                border: `2px solid ${pin.length > i ? '#0066ff' : colors.border}`,
                transition: 'all 0.15s ease',
                boxShadow: pin.length > i ? '0 0 12px rgba(0,102,255,0.6)' : 'none',
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{
            color: '#ff5252', fontSize: '13px', textAlign: 'center',
            marginBottom: '12px', fontWeight: '600',
          }}>
            {error}
          </div>
        )}

        {/* Keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {keypad.map((k, i) => {
            if (k === '') return <div key={i} />;
            const isBackspace = k === '⌫';
            return (
              <button
                key={i}
                onClick={() => (isBackspace ? backspace() : press(k))}
                style={{
                  height: '60px',
                  borderRadius: '16px',
                  border: `1px solid ${colors.border}`,
                  background: colors.hover,
                  color: colors.text,
                  fontSize: isBackspace ? '22px' : '24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                }}
                onTouchStart={(e) => (e.currentTarget.style.background = '#0066ff')}
                onTouchEnd={(e) => (e.currentTarget.style.background = colors.hover)}
              >
                {k}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'transparent',
            color: colors.textSecondary,
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PinModal;