import React from 'react';

const Account = ({ balance, formatCurrency, colors, userName, showToast }) => {
  const accountDetails = {
    accountName: userName.toUpperCase(),
    accountNumber: '0123456789',
    bankName: 'NenPay Bank',
    accountType: 'Premium Savings',
    currency: 'NGN',
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied`, 'success');
    } catch {
      showToast('Could not copy', 'error');
    }
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '18px',
    padding: '24px',
    marginBottom: '18px',
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '18px', color: colors.text, fontWeight: '700' }}>
        My Account
      </h2>

      <div style={{
        background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
        borderRadius: '20px', padding: '28px', marginBottom: '18px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 14px 40px rgba(0,102,255,0.3)',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', pointerEvents: 'none',
        }} />
        <div style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '13px', marginBottom: '6px' }}>
          Account Balance
        </div>
        <div style={{ color: 'white', fontSize: '30px', fontWeight: '800', marginBottom: '22px', letterSpacing: '-0.5px' }}>
          {formatCurrency(balance)}
        </div>
        <div style={{ color: 'white', fontSize: '17px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '6px' }}>
          {accountDetails.accountName}
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '15px', letterSpacing: '2px', fontFamily: 'ui-monospace, monospace' }}>
          {accountDetails.accountNumber}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '17px', marginBottom: '18px', color: colors.text, fontWeight: '700' }}>
          Account Details
        </h3>
        {[
          { label: 'Account Name', value: accountDetails.accountName },
          { label: 'Account Number', value: accountDetails.accountNumber, copyable: true },
          { label: 'Bank Name', value: accountDetails.bankName },
          { label: 'Account Type', value: accountDetails.accountType },
          { label: 'Currency', value: accountDetails.currency },
        ].map((item, index, arr) => (
          <div key={index} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', gap: '10px',
            padding: '14px 0',
            borderBottom: index < arr.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{ color: colors.textSecondary, fontSize: '14px' }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <span style={{
                fontWeight: '600', color: colors.text, fontSize: '14px',
                wordBreak: 'break-all', textAlign: 'right',
              }}>
                {item.value}
              </span>
              {item.copyable && (
                <button
                  onClick={() => copyToClipboard(item.value, item.label)}
                  style={{
                    background: '#0066ff', border: 'none', color: 'white',
                    padding: '8px 12px', borderRadius: '8px',
                    cursor: 'pointer', fontSize: '12px',
                    fontWeight: '600', flexShrink: 0,
                    minHeight: 'auto',
                  }}
                >
                  Copy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
      }}>
        {[
          { label: 'Download Statement', icon: '📄' },
          { label: 'Freeze Account', icon: '🔒' },
          { label: 'Change PIN', icon: '🔑' },
          { label: 'Contact Support', icon: '📞' },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => showToast(`${item.label} coming soon`, 'info')}
            style={{
              padding: '18px 12px', borderRadius: '14px',
              border: `1px solid ${colors.border}`,
              background: colors.card, color: colors.text,
              cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: '8px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            <span style={{ fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Account;