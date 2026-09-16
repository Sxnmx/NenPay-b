import React, { useState } from 'react';

const Airtime = ({ balance, addTransaction, formatCurrency, colors }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('airtime');
  const [success, setSuccess] = useState(false);

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
      name: `${type === 'airtime' ? 'Airtime' : 'Data'} - ${network}`,
      amount: -parseFloat(amount),
      date: 'Just now',
      type: 'expense',
      category: type === 'airtime' ? 'Airtime' : 'Data',
      icon: '📱',
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setPhoneNumber('');
      setAmount('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>Buy Airtime & Data</h2>
      
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '5px',
      }}>
        <button onClick={() => setType('airtime')} style={{
          flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
          background: type === 'airtime' ? '#0066ff' : 'transparent',
          color: type === 'airtime' ? 'white' : colors.text,
          fontWeight: 'bold', cursor: 'pointer',
        }}>📱 Airtime</button>
        <button onClick={() => setType('data')} style={{
          flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
          background: type === 'data' ? '#0066ff' : 'transparent',
          color: type === 'data' ? 'white' : colors.text,
          fontWeight: 'bold', cursor: 'pointer',
        }}>🌐 Data</button>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '30px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {networks.map(net => (
            <button key={net} type="button" onClick={() => setNetwork(net)} style={{
              padding: '15px', borderRadius: '10px', cursor: 'pointer',
              border: network === net ? '2px solid #0066ff' : `1px solid ${colors.border}`,
              background: network === net ? '#0066ff' : 'transparent',
              color: network === net ? 'white' : colors.text,
              fontWeight: '600',
            }}>{net}</button>
          ))}
        </div>

        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} maxLength="11" required style={inputStyle} />

        {type === 'airtime' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
            {airtimeAmounts.map(amt => (
              <button key={amt} type="button" onClick={() => setAmount(amt.toString())} style={{
                padding: '12px', borderRadius: '8px', cursor: 'pointer',
                border: amount === amt.toString() ? '2px solid #0066ff' : `1px solid ${colors.border}`,
                background: amount === amt.toString() ? '#0066ff' : 'transparent',
                color: amount === amt.toString() ? 'white' : colors.text,
                fontWeight: '600',
              }}>₦{amt}</button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            {dataPlans.map(plan => (
              <button key={plan.id} type="button" onClick={() => setAmount(plan.price.toString())} style={{
                padding: '15px', borderRadius: '10px', cursor: 'pointer',
                border: amount === plan.price.toString() ? '2px solid #0066ff' : `1px solid ${colors.border}`,
                background: amount === plan.price.toString() ? '#0066ff' : 'transparent',
                color: amount === plan.price.toString() ? 'white' : colors.text,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold' }}>{plan.data}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{plan.validity}</div>
                </div>
                <div style={{ fontWeight: 'bold' }}>₦{plan.price}</div>
              </button>
            ))}
          </div>
        )}

        <input type="number" placeholder="Or enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyle} />

        <button type="submit" style={{
          width: '100%', padding: '15px', borderRadius: '12px', border: 'none',
          background: '#0066ff', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
        }}>
          {type === 'airtime' ? 'Buy Airtime' : 'Buy Data'}
        </button>

        {success && (
          <div style={{
            marginTop: '20px', padding: '15px', background: 'rgba(0, 200, 83, 0.1)',
            border: '1px solid #00c853', borderRadius: '12px',
            textAlign: 'center', color: '#00c853', fontWeight: 'bold',
          }}>
            ✅ Purchase Successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default Airtime;