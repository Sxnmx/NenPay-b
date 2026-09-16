import React, { useState } from 'react';

const Bills = ({ balance, addTransaction, formatCurrency, colors }) => {
  const [billType, setBillType] = useState('electricity');
  const [provider, setProvider] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const billTypes = [
    { id: 'electricity', name: 'Electricity', icon: '⚡', providers: ['IKEDC', 'EKEDC', 'AEDC', 'KEDCO', 'IBEDC'] },
    { id: 'cable', name: 'Cable TV', icon: '📺', providers: ['DSTV', 'GOTV', 'Startimes'] },
    { id: 'internet', name: 'Internet', icon: '🌐', providers: ['Spectranet', 'Smile', 'ipNX'] },
    { id: 'education', name: 'Education', icon: '📚', providers: ['WAEC', 'JAMB', 'School Fees'] },
  ];

  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    background: colors.inputBackground,
    color: colors.text,
    fontSize: '16px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance!');
      return;
    }
    const selected = billTypes.find(b => b.id === billType);
    addTransaction({
      id: Date.now(),
      name: `${selected.name} Bill`,
      amount: -parseFloat(amount),
      date: 'Just now',
      type: 'expense',
      category: 'Bills',
      icon: selected.icon,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setCustomerId('');
      setAmount('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>Pay Bills</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        marginBottom: '20px',
      }}>
        {billTypes.map(bill => (
          <button key={bill.id} onClick={() => setBillType(bill.id)} style={{
            padding: '15px', borderRadius: '12px', cursor: 'pointer',
            border: billType === bill.id ? '2px solid #0066ff' : `1px solid ${colors.border}`,
            background: billType === bill.id ? '#0066ff' : colors.card,
            color: billType === bill.id ? 'white' : colors.text,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          }}>
            <span style={{ fontSize: '24px' }}>{bill.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: '600' }}>{bill.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '30px',
      }}>
        <select value={provider} onChange={(e) => setProvider(e.target.value)} required style={inputStyle}>
          <option value="">Select Provider</option>
          {billTypes.find(b => b.id === billType)?.providers.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input type="text" placeholder="Customer ID / Meter Number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyle} />

        <button type="submit" style={{
          width: '100%', padding: '15px', borderRadius: '12px', border: 'none',
          background: '#0066ff', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
        }}>
          Pay Bill
        </button>

        {success && (
          <div style={{
            marginTop: '20px', padding: '15px', background: 'rgba(0, 200, 83, 0.1)',
            border: '1px solid #00c853', borderRadius: '12px',
            textAlign: 'center', color: '#00c853', fontWeight: 'bold',
          }}>
            ✅ Payment Successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default Bills;