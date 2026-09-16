import React, { useState } from 'react';

const SendMoney = ({ balance, addTransaction, formatCurrency, colors }) => {
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [success, setSuccess] = useState(false);

  const banks = ['Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA', 'Kuda Bank', 'Opay', 'PalmPay', 'Sterling Bank', 'Wema Bank'];

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
    addTransaction({
      id: Date.now(),
      name: `Transfer to ${recipient}`,
      amount: -parseFloat(amount),
      date: 'Just now',
      type: 'expense',
      category: 'Transfer',
      icon: '💸',
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setRecipient('');
      setAccountNumber('');
      setBankName('');
      setAmount('');
      setNarration('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>Send Money</h2>
      <form onSubmit={handleSubmit} style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '30px',
      }}>
        <input type="text" placeholder="Recipient Name" value={recipient} onChange={(e) => setRecipient(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Account Number (10 digits)" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))} maxLength="10" required style={inputStyle} />
        <select value={bankName} onChange={(e) => setBankName(e.target.value)} required style={inputStyle}>
          <option value="">Select Bank</option>
          {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
        </select>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Narration (Optional)" value={narration} onChange={(e) => setNarration(e.target.value)} style={inputStyle} />
        <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '15px' }}>
          Available: {formatCurrency(balance)}
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '15px',
          borderRadius: '12px',
          border: 'none',
          background: '#0066ff',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Send Money
        </button>
        {success && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(0, 200, 83, 0.1)',
            border: '1px solid #00c853',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#00c853',
            fontWeight: 'bold',
          }}>
            ✅ Transfer Successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default SendMoney;