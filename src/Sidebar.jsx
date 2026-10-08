import React from 'react';
import { NenPayIcon } from './Logo';

const Sidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen, colors, userName, isMobile }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'send', label: 'Send Money', icon: '💸' },
    { id: 'airtime', label: 'Buy Airtime', icon: '📱' },
    { id: 'bills', label: 'Pay Bills', icon: '🧾' },
    { id: 'account', label: 'My Account', icon: '👤' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'savings', label: 'Savings', icon: '🏦' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleMenuClick = (id) => {
    setActivePage(id);
    if (isMobile) setSidebarOpen(false);
  };

  // On mobile, sidebar is a drawer that only opens when sidebarOpen is true
  if (isMobile && !sidebarOpen) return null;

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 999,
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100dvh',
          width: isMobile ? '82vw' : (sidebarOpen ? '260px' : '80px'),
          maxWidth: isMobile ? '320px' : 'none',
          background: colors.sidebar,
          borderRight: `1px solid ${colors.border}`,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease, width 0.3s ease',
          transform: isMobile
            ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
            : 'translateX(0)',
          paddingTop: 'var(--safe-top)',
          paddingBottom: 'var(--safe-bottom)',
          boxSizing: 'border-box',
        }}
      >
        {!isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              position: 'absolute',
              right: '-15px',
              top: '20px',
              background: '#0066ff',
              border: `2px solid ${colors.background}`,
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              color: 'white',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'absolute',
              right: '15px',
              top: 'calc(20px + var(--safe-top))',
              background: 'transparent',
              border: 'none',
              color: colors.text,
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 1001,
              minHeight: 'auto',
            }}
          >
            ✕
          </button>
        )}

        <div style={{
          padding: '24px 20px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <NenPayIcon size={isMobile ? 44 : (sidebarOpen ? 50 : 42)} animated={true} />
            {(sidebarOpen || isMobile) && (
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <h2 style={{
                  color: colors.text,
                  fontSize: '26px',
                  fontWeight: '800',
                  letterSpacing: '-1px',
                  lineHeight: '1',
                  margin: 0,
                }}>
                  <span style={{ color: '#0066ff' }}>Nen</span>Pay
                </h2>
                <span style={{
                  color: colors.textSecondary,
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '1.2px',
                  marginTop: '4px',
                }}>
                  BANKING MADE SIMPLE
                </span>
              </div>
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px',
                  margin: '4px 0',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#0066ff' : 'transparent',
                  color: isActive ? 'white' : colors.text,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '20px', minWidth: '24px' }}>{item.icon}</span>
                {(sidebarOpen || isMobile) && (
                  <span style={{ fontWeight: '500', fontSize: '15px' }}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{
          padding: '16px 20px',
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center',
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: '#0066ff', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', flexShrink: 0,
          }}>
            👤
          </div>
          {(sidebarOpen || isMobile) && (
            <div style={{ minWidth: 0 }}>
              <div style={{
                color: colors.text, fontWeight: '600', fontSize: '14px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {userName}
              </div>
              <div style={{ color: colors.textSecondary, fontSize: '12px' }}>
                Premium User
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;