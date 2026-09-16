import React from 'react';

const Account = ({ balance, formatCurrency, colors, userName }) => {
  const accountDetails = {
    accountName: userName.toUpperCase(),
    accountNumber: '0123456789',
    bankName: 'NenPay Bank',
    accountType: 'Premium Savings',
    currency: 'NGN',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '20px',
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>My Account</h2>

      <div style={{
        background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
        borderRadius: '20px', padding: '30px', marginBottom: '20px',
      }}>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginBottom: '5px' }}>
          Account Balance
        </div>
        <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          {formatCurrency(balance)}
        </div>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '5px' }}>
          {accountDetails.accountName}
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', letterSpacing: '2px' }}>
          {accountDetails.accountNumber}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', marginBottom: '20px', color: colors.text }}>Account Details</h3>
        {[
          { label: 'Account Name', value: accountDetails.accountName },
          { label: 'Account Number', value: accountDetails.accountNumber, copyable: true },
          { label: 'Bank Name', value: accountDetails.bankName },
          { label: 'Account Type', value: accountDetails.accountType },
          { label: 'Currency', value: accountDetails.currency },
        ].map((item, index) => (
          <div key={index} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 0', borderBottom: index < 4 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{ color: colors.textSecondary }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: '600', color: colors.text }}>{item.value}</span>
              {item.copyable && (
                <button onClick={() => copyToClipboard(item.value)} style={{
                  background: '#0066ff', border: 'none', color: 'white',
                  padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px',
                }}>Copy</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px',
      }}>
        {[
          { label: 'Download Statement', icon: '📄' },
          { label: 'Freeze Account', icon: '🔒' },
          { label: 'Change PIN', icon: '🔑' },
          { label: 'Contact Support', icon: '📞' },
        ].map((item, index) => (
          <button key={index} style={{
            padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`,
            background: colors.card, color: colors.text, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{ fontWeight: '600', fontSize: '13px' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Account;