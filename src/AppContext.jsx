import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatCurrency as formatCurrencyByCode } from './Currency';

const AppContext = createContext(null);

const STORAGE_KEY = 'nenpay_state_v1';

const DEFAULT_TRANSACTIONS = [
  { id: 1, name: 'Amazon Purchase', amount: -150.00, date: 'Today, 2:30 PM', type: 'expense', category: 'Shopping', icon: '🛒' },
  { id: 2, name: 'Salary Deposit', amount: 4500.00, date: 'Yesterday, 9:00 AM', type: 'income', category: 'Income', icon: '💰' },
  { id: 3, name: 'Airtime Purchase', amount: -50.00, date: 'Yesterday, 6:45 PM', type: 'expense', category: 'Airtime', icon: '📱' },
  { id: 4, name: 'Uber Ride', amount: -25.50, date: 'Jan 13, 8:15 PM', type: 'expense', category: 'Transport', icon: '🚗' },
];

const DEFAULT_SAVINGS = [
  { id: 1, name: 'Emergency Fund', target: 5000, saved: 3500, icon: '🛟', color: '#0066ff' },
  { id: 2, name: 'New Car', target: 15000, saved: 8000, icon: '🚗', color: '#00c853' },
  { id: 3, name: 'Vacation', target: 3000, saved: 1200, icon: '✈️', color: '#ff9800' },
];

const DEFAULT_STATE = {
  isLoggedIn: false,
  userName: 'Sanmi Ajimajasan',
  isDarkMode: true,
  currency: 'NGN',
  balance: 730453340.34,
  transactions: DEFAULT_TRANSACTIONS,
  savingsGoals: DEFAULT_SAVINGS,
  pin: '1234',
  pinSet: true,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(loadState);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const theme = {
    dark: {
      background: '#000000',
      sidebar: '#0a0a0a',
      card: '#0a0a0a',
      border: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#888888',
      inputBackground: '#000000',
      hover: '#111111',
    },
    light: {
      background: '#f5f5f5',
      sidebar: '#ffffff',
      card: '#ffffff',
      border: '#e0e0e0',
      text: '#000000',
      textSecondary: '#666666',
      inputBackground: '#ffffff',
      hover: '#f0f0f0',
    },
  };

  const colors = state.isDarkMode ? theme.dark : theme.light;

  const formatCurrency = (amountInNGN) =>
    formatCurrencyByCode(amountInNGN, state.currency);

  const login = (user) => setState((s) => ({ ...s, isLoggedIn: true, userName: user.name }));
  const logout = () => setState((s) => ({ ...s, isLoggedIn: false }));

  const toggleDarkMode = () => setState((s) => ({ ...s, isDarkMode: !s.isDarkMode }));
  const setDarkMode = (v) => setState((s) => ({ ...s, isDarkMode: v }));
  const setCurrency = (c) => setState((s) => ({ ...s, currency: c }));
  const setUserName = (n) => setState((s) => ({ ...s, userName: n }));

  const addTransaction = (tx) => {
    setState((s) => {
      const delta = tx.type === 'expense' ? -Math.abs(tx.amount) : Math.abs(tx.amount);
      return {
        ...s,
        transactions: [tx, ...s.transactions],
        balance: s.balance + delta,
      };
    });
  };

  const updateSavingsGoals = (goals) => setState((s) => ({ ...s, savingsGoals: goals }));

  const setPin = (pin) => setState((s) => ({ ...s, pin, pinSet: true }));

  const verifyPin = (entered) => entered === state.pin;

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(DEFAULT_STATE);
  };

  const value = {
    ...state,
    colors,
    formatCurrency,
    login,
    logout,
    toggleDarkMode,
    setDarkMode,
    setCurrency,
    setUserName,
    addTransaction,
    updateSavingsGoals,
    setPin,
    verifyPin,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};