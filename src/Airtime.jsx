import React, { useState } from 'react';

const Airtime = ({ balance, addTransaction, formatCurrency, colors, requirePin, showToast }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('airtime');

  const networks = ['MTN', 'Airtel', 'Glo', '9mobile'];
  const airtimeAmounts = [50, 100, 200, 500, 1000, 2000, 5000];
  const dataPlans = [
    { id: 1, data: '500MB', price: 100, validity: '1 day' },
    { id: 2, data: '2GB', price: 500, validity: '7 days' },
    { id: 3, data: '10GB', price: 2000, validity: '30 days' },
    { id: 4, data: '20GB', price: 3500, validity: '30 days' },
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
    if (!network) { showToast('Please select a network', 'warning'); return; }
    if (phoneNumber.length !== 11) { showToast('Phone number must be 11 digits', 'warning'); return; }
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { showToast('Enter a valid amount', 'warning'); return; }
    if (amt > balance) { showToast('Insufficient balance', 'error'); return; }

    requirePin(() => {
      addTransaction({
        id: Date.now(),
        name: `${type === 'airtime' ? 'Airtime' : 'Data'} - ${network}`,
        amount: -amt,
        date: 'Just now',
        type: 'expense',
        category: type === 'airtime' ? 'Airtime' : 'Data',
        icon: '📱',
      });
      showToast(`${type === 'airtime' ? 'Airtime' : 'Data'} purchase successful`, 'success');
      setPhoneNumber('');
      setAmount('');
    }, 'Authorize Purchase', `Buy ${formatCurrency(amt)} ${type} on ${network}?`);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '6px', color: colors.text, fontWeight: '700' }}>
        Buy Airtime & Data
      </h2>
      <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '20px' }}>
        Top up any Nigerian network
      </p>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        padding: '6px',
      }}>
        <button type="button" onClick={() => setType('airtime')} style={{
          flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
          background: type === 'airtime' ? 'linear-gradient(135deg, #0066ff, #00b4ff)' : 'transparent',
          color: type === 'airtime' ? 'white' : colors.text,
          fontWeight: '700', cursor: 'pointer', fontSize: '14px',
        }}>📱 Airtime</button>
        <button type="button" onClick={() => setType('data')} style={{
          flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
          background: type === 'data' ? 'linear-gradient(135deg, #0066ff, #00b4ff)' : 'transparent',
          color: type === 'data' ? 'white' : colors.text,
          fontWeight: '700', cursor: 'pointer', fontSize: '14px',
        }}>🌐 Data</button>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '24px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {networks.map((net) => (
            <button key={net} type="button" onClick={() => setNetwork(net)} style={{
              padding: '14px 4px', borderRadius: '12px', cursor: 'pointer',
              border: network === net ? '2px solid #00b4ff' : `1px solid ${colors.border}`,
              background: network === net ? 'linear-gradient(135deg, #0066ff, #00b4ff)' : 'transparent',
              color: network === net ? 'white' : colors.text,
              fontWeight: '700', fontSize: '13px',
              boxShadow: network === net ? '0 6px 16px rgba(0,102,255,0.3)' : 'none',
            }}>{net}</button>
          ))}
        </div>

        <input
          type="tel" inputMode="numeric"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
          maxLength="11" required style={inputStyle}
        />

        {type === 'airtime' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {airtimeAmounts.map((amt) => (
              <button key={amt} type="button" onClick={() => setAmount(amt.toString())} style={{
                padding: '12px 4px', borderRadius: '10px', cursor: 'pointer',
                border: amount === amt.toString() ? '2px solid #00b4ff' : `1px solid ${colors.border}`,
                background: amount === amt.toString() ? 'linear-gradient(135deg, #0066ff, #00b4ff)' : 'transparent',
                color: amount === amt.toString() ? 'white' : colors.text,
                fontWeight: '700', fontSize: '13px',
              }}>₦{amt}</button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {dataPlans.map((plan) => (
              <button key={plan.id} type="button" onClick={() => setAmount(plan.price.toString())} style={{
                padding: '15px', borderRadius: '12px', cursor: 'pointer',
                border: amount === plan.price.toString() ? '2px solid #00b4ff' : `1px solid ${colors.border}`,
                background: amount === plan.price.toString() ? 'rgba(0,102,255,0.15)' : 'transparent',
                color: colors.text,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>{plan.data}</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>{plan.validity}</div>
                </div>
                <div style={{ fontWeight: '700', color: '#00b4ff' }}>₦{plan.price}</div>
              </button>
            ))}
          </div>
        )}

        <input
          type="number" inputMode="decimal"
          placeholder="Or enter amount"
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
          {type === 'airtime' ? '📱 Buy Airtime' : '🌐 Buy Data'}
        </button>
      </form>
    </div>
  );
};

export default Airtime;