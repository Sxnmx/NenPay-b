import React, { useState } from 'react';

const Transactions = ({ transactions, formatCurrency, colors }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);

  const inputStyle = {
    padding: '12px', borderRadius: '10px',
    border: `1px solid ${colors.border}`, background: colors.card,
    color: colors.text, fontSize: '14px',
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>Transactions</h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px', marginBottom: '20px',
      }}>
        <div style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '20px',
        }}>
          <div style={{ color: colors.textSecondary, fontSize: '13px', marginBottom: '5px' }}>Total Income</div>
          <div style={{ color: '#00c853', fontSize: '22px', fontWeight: 'bold' }}>{formatCurrency(totalIncome)}</div>
        </div>
        <div style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '20px',
        }}>
          <div style={{ color: colors.textSecondary, fontSize: '13px', marginBottom: '5px' }}>Total Expenses</div>
          <div style={{ color: '#ff5252', fontSize: '22px', fontWeight: 'bold' }}>{formatCurrency(totalExpenses)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      <div style={{
        background: colors.card, border: `1px solid ${colors.border}`,
        borderRadius: '16px', overflow: 'hidden',
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: colors.textSecondary }}>
            No transactions found
          </div>
        ) : (
          filtered.map((t, i) => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '15px 20px',
              borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: colors.hover, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                }}>
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: colors.text }}>{t.name}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '12px' }}>
                    {t.category} • {t.date}
                  </div>
                </div>
              </div>
              <span style={{
                color: t.type === 'income' ? '#00c853' : '#ff5252',
                fontWeight: 'bold',
              }}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(t.amount))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;