import React from 'react';

const Dashboard = ({ balance, showBalance, setShowBalance, transactions, setActivePage, formatCurrency, colors }) => {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Available Balance</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            {showBalance ? '👁️ Hide' : '👁️ Show'}
          </button>
        </div>
        <div style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}>
          {showBalance ? formatCurrency(balance) : '••••••••'}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActivePage('send')}
            style={{
              flex: 1,
              padding: '14px',
              background: 'white',
              color: '#0066ff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            + Add Money
          </button>
          <button
            onClick={() => setActivePage('send')}
            style={{
              flex: 1,
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Send Money
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '30px',
      }}>
        {[
          { id: 'send', label: 'Send Money', icon: '💸' },
          { id: 'airtime', label: 'Airtime', icon: '📱' },
          { id: 'bills', label: 'Pay Bills', icon: '🧾' },
          { id: 'savings', label: 'Save', icon: '🏦' },
        ].map((action) => (
          <button
            key={action.id}
            onClick={() => setActivePage(action.id)}
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>{action.icon}</div>
            <div style={{ color: colors.text, fontWeight: '600' }}>{action.label}</div>
          </button>
        ))}
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <h3 style={{ fontSize: '20px', color: colors.text }}>Recent Transactions</h3>
          <button
            onClick={() => setActivePage('transactions')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0066ff',
              cursor: 'pointer',
            }}
          >
            See All
          </button>
        </div>
        <div style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {transactions.slice(0, 5).map((transaction, index) => (
            <div
              key={transaction.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 20px',
                borderBottom: index < Math.min(transactions.length, 5) - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: colors.hover,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  {transaction.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: colors.text }}>{transaction.name}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '12px' }}>{transaction.date}</div>
                </div>
              </div>
              <span style={{
                color: transaction.type === 'income' ? '#00c853' : '#ff5252',
                fontWeight: 'bold',
              }}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;