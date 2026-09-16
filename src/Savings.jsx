import React, { useState } from 'react';

const Savings = ({ balance, addTransaction, formatCurrency, colors }) => {
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 5000, saved: 3500, icon: '🛟', color: '#0066ff' },
    { id: 2, name: 'New Car', target: 15000, saved: 8000, icon: '🚗', color: '#00c853' },
    { id: 3, name: 'Vacation', target: 3000, saved: 1200, icon: '✈️', color: '#ff9800' },
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');

  const inputStyle = {
    padding: '12px', borderRadius: '10px',
    border: `1px solid ${colors.border}`, background: colors.inputBackground,
    color: colors.text, fontSize: '14px', width: '100%',
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    setSavingsGoals([...savingsGoals, {
      id: Date.now(), name: newGoalName, target: parseFloat(newGoalTarget),
      saved: parseFloat(newGoalAmount), icon: '🎯', color: '#0066ff',
    }]);
    addTransaction({
      id: Date.now(),
      name: `Savings: ${newGoalName}`,
      amount: -parseFloat(newGoalAmount),
      date: 'Just now',
      type: 'expense',
      category: 'Savings',
      icon: '🏦',
    });
    setShowAddGoal(false);
    setNewGoalName(''); setNewGoalTarget(''); setNewGoalAmount('');
  };

  const handleAddToSavings = (goalId) => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      if (parseFloat(amount) > balance) { alert('Insufficient balance!'); return; }
      setSavingsGoals(savingsGoals.map(g => 
        g.id === goalId ? { ...g, saved: g.saved + parseFloat(amount) } : g
      ));
      const goal = savingsGoals.find(g => g.id === goalId);
      addTransaction({
        id: Date.now(),
        name: `Added to ${goal.name}`,
        amount: -parseFloat(amount),
        date: 'Just now',
        type: 'expense',
        category: 'Savings',
        icon: '🏦',
      });
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '5px', color: colors.text }}>Savings</h2>
          <p style={{ color: colors.textSecondary, fontSize: '14px' }}>Save money towards your goals</p>
        </div>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          style={{
            padding: '12px 24px', borderRadius: '12px', border: 'none',
            background: '#0066ff', color: 'white', fontWeight: 'bold', cursor: 'pointer',
          }}
        >
          + New Goal
        </button>
      </div>

      {showAddGoal && (
        <form onSubmit={handleAddGoal} style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '20px', marginBottom: '20px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <input type="text" placeholder="Goal Name" value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} required style={inputStyle} />
            <input type="number" placeholder="Target Amount" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} required style={inputStyle} />
            <input type="number" placeholder="Initial Deposit" value={newGoalAmount} onChange={(e) => setNewGoalAmount(e.target.value)} required style={inputStyle} />
            <button type="submit" style={{
              padding: '12px', borderRadius: '10px', border: 'none',
              background: '#0066ff', color: 'white', fontWeight: 'bold', cursor: 'pointer',
            }}>Create Goal</button>
          </div>
        </form>
      )}

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px',
      }}>
        {savingsGoals.map((goal) => {
          const percentage = (goal.saved / goal.target) * 100;
          return (
            <div key={goal.id} style={{
              background: colors.card, border: `1px solid ${colors.border}`,
              borderRadius: '16px', padding: '25px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '15px',
                  background: `${goal.color}20`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '25px',
                }}>
                  {goal.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: colors.text }}>{goal.name}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '12px' }}>
                    Target: {formatCurrency(goal.target)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: colors.textSecondary }}>Saved</span>
                <span style={{ fontWeight: 'bold', color: goal.color }}>{formatCurrency(goal.saved)}</span>
              </div>
              <div style={{
                width: '100%', height: '10px', background: colors.hover,
                borderRadius: '5px', overflow: 'hidden', marginBottom: '8px',
              }}>
                <div style={{
                  width: `${percentage}%`, height: '100%',
                  background: goal.color, borderRadius: '5px',
                }} />
              </div>
              <div style={{ color: goal.color, fontSize: '12px', marginBottom: '15px', fontWeight: '600' }}>
                {percentage.toFixed(0)}% complete
              </div>

              <button
                onClick={() => handleAddToSavings(goal.id)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: `1px solid ${goal.color}`, background: 'transparent',
                  color: goal.color, fontWeight: 'bold', cursor: 'pointer',
                }}
              >
                Add Money
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;