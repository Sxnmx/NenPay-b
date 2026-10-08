import React, { useState } from 'react';

const Savings = ({ balance, addTransaction, formatCurrency, colors, savingsGoals, updateSavingsGoals, requirePin, showToast }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [addToGoalId, setAddToGoalId] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  const inputStyle = {
    padding: '14px', borderRadius: '12px',
    border: `1px solid ${colors.border}`, background: colors.inputBackground,
    color: colors.text, fontSize: '15px', width: '100%',
    boxSizing: 'border-box', outline: 'none',
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    const target = parseFloat(newGoalTarget);
    const initial = parseFloat(newGoalAmount) || 0;
    if (!newGoalName || !target) { showToast('Fill in goal name and target', 'warning'); return; }
    if (initial > balance) { showToast('Insufficient balance for initial deposit', 'error'); return; }

    const doCreate = () => {
      updateSavingsGoals([
        ...savingsGoals,
        {
          id: Date.now(),
          name: newGoalName,
          target,
          saved: initial,
          icon: '🎯',
          color: '#0066ff',
        },
      ]);
      if (initial > 0) {
        addTransaction({
          id: Date.now() + 1,
          name: `Savings: ${newGoalName}`,
          amount: -initial,
          date: 'Just now',
          type: 'expense',
          category: 'Savings',
          icon: '🏦',
        });
      }
      showToast(`Goal "${newGoalName}" created`, 'success');
      setShowAddGoal(false);
      setNewGoalName(''); setNewGoalTarget(''); setNewGoalAmount('');
    };

    if (initial > 0) {
      requirePin(doCreate, 'Authorize Deposit', `Move ${formatCurrency(initial)} to ${newGoalName}?`);
    } else {
      doCreate();
    }
  };

  const openDeposit = (goal) => {
    setAddToGoalId(goal.id);
    setDepositAmount('');
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    const goal = savingsGoals.find((g) => g.id === addToGoalId);
    if (!goal || !amt || amt <= 0) { showToast('Enter a valid amount', 'warning'); return; }
    if (amt > balance) { showToast('Insufficient balance', 'error'); return; }

    requirePin(() => {
      updateSavingsGoals(
        savingsGoals.map((g) =>
          g.id === goal.id ? { ...g, saved: g.saved + amt } : g
        )
      );
      addTransaction({
        id: Date.now(),
        name: `Added to ${goal.name}`,
        amount: -amt,
        date: 'Just now',
        type: 'expense',
        category: 'Savings',
        icon: '🏦',
      });
      showToast(`${formatCurrency(amt)} added to ${goal.name}`, 'success');
      setAddToGoalId(null);
      setDepositAmount('');
    }, 'Authorize Deposit', `Move ${formatCurrency(amt)} to ${goal.name}?`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '20px', gap: '10px',
      }}>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontSize: '24px', marginBottom: '4px', color: colors.text, fontWeight: '700' }}>
            Savings
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '13px' }}>
            Save towards your goals
          </p>
        </div>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          style={{
            padding: '12px 18px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #0066ff, #00b4ff)',
            color: 'white', fontWeight: '700', cursor: 'pointer',
            fontSize: '14px', whiteSpace: 'nowrap',
            boxShadow: '0 6px 16px rgba(0,102,255,0.3)',
          }}
        >
          + New Goal
        </button>
      </div>

      {showAddGoal && (
        <form onSubmit={handleCreateGoal} style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '20px', marginBottom: '20px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <input type="text" placeholder="Goal Name" value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} required style={inputStyle} />
            <input type="number" inputMode="decimal" placeholder="Target Amount" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} required style={inputStyle} />
            <input type="number" inputMode="decimal" placeholder="Initial Deposit (optional)" value={newGoalAmount} onChange={(e) => setNewGoalAmount(e.target.value)} style={inputStyle} />
            <button type="submit" style={{
              padding: '14px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #0066ff, #00b4ff)',
              color: 'white', fontWeight: '700', cursor: 'pointer',
            }}>Create Goal</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {savingsGoals.map((goal) => {
          const pct = Math.min(100, (goal.saved / goal.target) * 100);
          return (
            <div key={goal.id} style={{
              background: colors.card, border: `1px solid ${colors.border}`,
              borderRadius: '18px', padding: '22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: `${goal.color}20`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                  flexShrink: 0,
                }}>
                  {goal.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: '700', fontSize: '17px', color: colors.text }}>{goal.name}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '12px' }}>
                    Target: {formatCurrency(goal.target)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: colors.textSecondary }}>Saved</span>
                <span style={{ fontWeight: '700', color: goal.color }}>{formatCurrency(goal.saved)}</span>
              </div>
              <div style={{
                width: '100%', height: '10px', background: colors.hover,
                borderRadius: '5px', overflow: 'hidden', marginBottom: '8px',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%',
                  background: goal.color, borderRadius: '5px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <div style={{ color: goal.color, fontSize: '12px', marginBottom: '16px', fontWeight: '700' }}>
                {pct.toFixed(0)}% complete
              </div>

              {addToGoalId === goal.id ? (
                <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="number" inputMode="decimal" autoFocus
                    placeholder="Amount to add"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    style={inputStyle}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{
                      flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                      background: goal.color, color: 'white', fontWeight: '700', cursor: 'pointer',
                    }}>Confirm</button>
                    <button type="button" onClick={() => setAddToGoalId(null)} style={{
                      flex: 1, padding: '12px', borderRadius: '10px',
                      border: `1px solid ${colors.border}`, background: 'transparent',
                      color: colors.text, fontWeight: '700', cursor: 'pointer',
                    }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => openDeposit(goal)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '12px',
                    border: `2px solid ${goal.color}`, background: 'transparent',
                    color: goal.color, fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  + Add Money
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;