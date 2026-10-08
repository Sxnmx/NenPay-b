import React, { useState } from 'react';

const SendMoney = ({ balance, addTransaction, formatCurrency, colors, requirePin, showToast }) => {
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [focused, setFocused] = useState(null);

  const banks = [
    'Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA',
    'Kuda Bank', 'Opay', 'PalmPay', 'Sterling Bank', 'Wema Bank',
  ];

  const baseField = (key) => ({
    width: '100%',
    padding: '16px',
    borderRadius: '14px',
    border: `2px solid ${focused === key ? '#00b4ff' : colors.border}`,
    background: focused === key
      ? colors.inputBackground
      : `linear-gradient(${colors.inputBackground}, ${colors.inputBackground}) padding-box, linear-gradient(135deg, rgba(0,102,255,0.25), rgba(0,180,255,0.15)) border-box`,
    color: colors.text,
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
    boxShadow: focused === key
      ? '0 0 0 4px rgba(0,102,255,0.15), 0 0 20px rgba(0,180,255,0.25)'
      : 'inset 0 0 12px rgba(0,102,255,0.06)',
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: colors.textSecondary,
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.3px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!recipient || !accountNumber || !bankName || !amt) {
      showToast('Please fill in all fields', 'warning');
      return;
    }
    if (accountNumber.length !== 10) {
      showToast('Account number must be 10 digits', 'warning');
      return;
    }
    if (amt > balance) {
      showToast('Insufficient balance', 'error');
      return;
    }

    // Trigger PIN gate
    requirePin(() => {
      addTransaction({
        id: Date.now(),
        name: `Transfer to ${recipient}`,
        amount: -amt,
        date: 'Just now',
        type: 'expense',
        category: 'Transfer',
        icon: '💸',
      });
      showToast(`₦${amt.toLocaleString()} sent to ${recipient}`, 'success');
      setRecipient('');
      setAccountNumber('');
      setBankName('');
      setAmount('');
      setNarration('');
    }, 'Authorize Transfer', `Send ${formatCurrency(amt)} to ${recipient}?`);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '24px', marginBottom: '6px',
        color: colors.text, fontWeight: '700',
      }}>
        Send Money
      </h2>
      <p style={{
        color: colors.textSecondary, fontSize: '14px',
        marginBottom: '22px',
      }}>
        Transfer to any Nigerian bank instantly
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* glow accent */}
        <div style={{
          position: 'absolute',
          top: '-60px', right: '-60px',
          width: '160px', height: '160px',
          background: 'radial-gradient(circle, rgba(0,102,255,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Recipient Name</label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            onFocus={() => setFocused('recipient')}
            onBlur={() => setFocused(null)}
            required
            style={{ ...baseField('recipient'), marginBottom: '18px' }}
          />

          <label style={labelStyle}>Account Number</label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="10-digit account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
            onFocus={() => setFocused('account')}
            onBlur={() => setFocused(null)}
            maxLength="10"
            required
            style={{
              ...baseField('account'),
              marginBottom: '18px',
              letterSpacing: '2px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          />

          <label style={labelStyle}>Select Bank</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            onFocus={() => setFocused('bank')}
            onBlur={() => setFocused(null)}
            required
            style={{
              ...baseField('bank'),
              marginBottom: '18px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              paddingRight: '44px',
            }}
          >
            <option value="">Choose a bank</option>
            {banks.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>

          <label style={labelStyle}>Amount</label>
          <div style={{ position: 'relative', marginBottom: '18px' }}>
            <span style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)',
              color: colors.textSecondary, fontSize: '16px',
              fontWeight: '700', pointerEvents: 'none',
            }}>
              ₦
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setFocused('amount')}
              onBlur={() => setFocused(null)}
              required
              style={{ ...baseField('amount'), paddingLeft: '38px' }}
            />
          </div>

          <label style={labelStyle}>Narration <span style={{ opacity: 0.6, fontWeight: 400 }}>(optional)</span></label>
          <input
            type="text"
            placeholder="What's this for?"
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            onFocus={() => setFocused('narration')}
            onBlur={() => setFocused(null)}
            style={{ ...baseField('narration'), marginBottom: '18px' }}
          />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 14px',
            borderRadius: '12px',
            background: colors.hover,
            marginBottom: '20px',
            fontSize: '13px',
          }}>
            <span style={{ color: colors.textSecondary }}>Available balance</span>
            <span style={{ color: colors.text, fontWeight: '700' }}>
              {formatCurrency(balance)}
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
              color: 'white',
              fontWeight: '800',
              fontSize: '16px',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              boxShadow: '0 10px 30px rgba(0, 102, 255, 0.4), 0 0 40px rgba(0, 180, 255, 0.15)',
              transition: 'transform 0.15s ease',
            }}
            onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            💸 Send Money
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMoney;