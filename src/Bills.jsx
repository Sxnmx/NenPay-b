import React, { useState } from 'react';

const Bills = ({ balance, addTransaction, formatCurrency, colors, requirePin, showToast }) => {
  const [billType, setBillType] = useState('electricity');
  const [provider, setProvider] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');

  const billTypes = [
    { id: 'electricity', name: 'Electricity', icon: '⚡', providers: ['IKEDC', 'EKEDC', 'AEDC', 'KEDCO', 'IBEDC'] },
    { id: 'cable', name: 'Cable TV', icon: '📺', providers: ['DSTV', 'GOTV', 'Startimes'] },
    { id: 'internet', name: 'Internet', icon: '🌐', providers: ['Spectranet', 'Smile', 'ipNX'] },
    { id: 'education', name: 'Education', icon: '📚', providers: ['WAEC', 'JAMB', 'School Fees'] },
  ];

  const inputStyle = {
    width: '100%',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '14px',
    border: `1px solid ${colors.border}`,
    background: colors.inputBackground,
    color: colors.text,
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!provider) { showToast('Please select a provider', 'warning'); return; }
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { showToast('Enter a valid amount', 'warning'); return; }
    if (amt > balance) { showToast('Insufficient balance', 'error'); return; }

    const selected = billTypes.find((b) => b.id === billType);
    requirePin(() => {
      addTransaction({
        id: Date.now(),
        name: `${selected.name} Bill`,
        amount: -amt,
        date: 'Just now',
        type: 'expense',
        category: 'Bills',
        icon: selected.icon,
      });
      showToast(`${selected.name} bill paid`, 'success');
      setCustomerId('');
      setAmount('');
    }, 'Authorize Payment', `Pay ${formatCurrency(amt)} for ${selected.name}?`);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '6px', color: colors.text, fontWeight: '700' }}>
        Pay Bills
      </h2>
      <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '20px' }}>
        Electricity, TV, internet & more
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {billTypes.map((bill) => {
          const isActive = billType === bill.id;
          return (
            <button
              key={bill.id}
              type="button"
              onClick={() => { setBillType(bill.id); setProvider(''); }}
              style={{
                padding: '12px 4px', borderRadius: '12px', cursor: 'pointer',
                border: isActive ? '2px solid #00b4ff' : `1px solid ${colors.border}`,
                background: isActive ? 'linear-gradient(135deg, #0066ff, #00b4ff)' : colors.card,
                color: isActive ? 'white' : colors.text,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
                boxShadow: isActive ? '0 6px 16px rgba(0,102,255,0.3)' : 'none',
              }}
            >
              <span style={{ fontSize: '22px' }}>{bill.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: '700' }}>{bill.name}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '24px',
      }}>
        <select value={provider} onChange={(e) => setProvider(e.target.value)} required style={inputStyle}>
          <option value="">Select Provider</option>
          {billTypes.find((b) => b.id === billType)?.providers.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Customer ID / Meter Number"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required style={inputStyle}
        />

        <input
          type="number" inputMode="decimal"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required style={inputStyle}
        />

        <button type="submit" style={{
          width: '100%', padding: '17px', borderRadius: '14px', border: 'none',
          background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
          color: 'white', fontWeight: '800', fontSize: '16px', cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0, 102, 255, 0.4)',
        }}>
          🧾 Pay Bill
        </button>
      </form>
    </div>
  );
};

export default Bills;