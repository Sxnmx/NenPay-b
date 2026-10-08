import React from 'react';

const BottomNav = ({ activePage, setActivePage, onMore, colors }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'send', label: 'Send', icon: '💸' },
    { id: 'airtime', label: 'Airtime', icon: '📱' },
    { id: 'bills', label: 'Bills', icon: '🧾' },
    { id: '__more', label: 'More', icon: '☰', action: onMore },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: colors.sidebar,
        borderTop: `1px solid ${colors.border}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        paddingBottom: 'var(--safe-bottom)',
        zIndex: 800,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activePage === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => (tab.action ? tab.action() : setActivePage(tab.id))}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '10px 4px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              color: isActive ? '#0066ff' : colors.textSecondary,
              cursor: 'pointer',
              minHeight: '58px',
              position: 'relative',
            }}
          >
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0,
                width: '28px',
                height: '3px',
                borderRadius: '0 0 4px 4px',
                background: '#0066ff',
              }} />
            )}
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.2px' }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;