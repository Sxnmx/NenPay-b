import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import SendMoney from './SendMoney';
import Airtime from './Airtime';
import Bills from './Bills';
import Account from './Account';
import Transactions from './Transactions';
import Savings from './Savings';
import Settings from './Settings';
import { NenPayIcon } from './Logo';
import { formatCurrency as formatCurrencyByCode } from './Currency';
import { useWindowSize } from './useWindowSize';

function App() {
  const { isMobile } = useWindowSize();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('Sanmi Ajimajasan');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(730453340.34);
  const [showBalance, setShowBalance] = useState(true);
  const [currency, setCurrency] = useState('NGN');
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Amazon Purchase', amount: -150.00, date: 'Today, 2:30 PM', type: 'expense', category: 'Shopping', icon: '🛒' },
    { id: 2, name: 'Salary Deposit', amount: 4500.00, date: 'Yesterday, 9:00 AM', type: 'income', category: 'Income', icon: '💰' },
    { id: 3, name: 'Airtime Purchase', amount: -50.00, date: 'Yesterday, 6:45 PM', type: 'expense', category: 'Airtime', icon: '📱' },
    { id: 4, name: 'Uber Ride', amount: -25.50, date: 'Jan 13, 8:15 PM', type: 'expense', category: 'Transport', icon: '🚗' },
  ]);

  const demoCredentials = [
    { email: 'sanmi@nenpay.com', password: 'sanmi123', name: 'Sanmi Ajimajasan' },
    { email: 'admin@nenpay.com', password: 'admin123', name: 'Admin User' },
  ];

  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

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
    }
  };

  const colors = isDarkMode ? theme.dark : theme.light;

  const formatCurrency = (amountInNGN) => {
    return formatCurrencyByCode(amountInNGN, currency);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLoginData({ ...loginData, email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setLoginData({ ...loginData, password });
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email) { setLoginError('Email is required'); return; }
    if (!emailRegex.test(loginData.email)) { setLoginError('Please enter a valid email address'); return; }
    if (!loginData.password) { setLoginError('Password is required'); return; }
    if (loginData.password.length < 6) { setLoginError('Password must be at least 6 characters'); return; }

    const user = demoCredentials.find(
      u => u.email === loginData.email.toLowerCase() && u.password === loginData.password
    );

    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name);
      setLoginError('');
      setEmailError('');
      setPasswordError('');
      setLoginData({ email: '', password: '' });
    } else {
      setLoginError('Invalid email or password. Try sanmi@nenpay.com / sanmi123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
    setActivePage('dashboard');
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
    if (transaction.type === 'expense') {
      setBalance(balance - Math.abs(transaction.amount));
    } else if (transaction.type === 'income') {
      setBalance(balance + Math.abs(transaction.amount));
    }
  };

  // ============ LOGIN PAGE ============
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: isDarkMode ? '#000000' : '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
      }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `1px solid ${colors.border}`,
            background: colors.card,
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>

        <div style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '24px',
          padding: isMobile ? '30px 20px' : '40px',
          width: '100%',
          maxWidth: '400px',
          boxSizing: 'border-box',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              <NenPayIcon size={80} animated={true} />
            </div>
            <h1 style={{
              color: colors.text,
              fontSize: '32px',
              fontWeight: '800',
              letterSpacing: '-0.5px',
              marginBottom: '8px',
              lineHeight: 1,
            }}>
              <span style={{ color: '#0066ff' }}>Nen</span>Pay
            </h1>
            <p style={{
              color: colors.textSecondary,
              fontSize: '11px',
              letterSpacing: '1.5px',
              fontWeight: '600',
              marginBottom: '15px',
            }}>
              BANKING MADE SIMPLE
            </p>
            <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
              Welcome back! Please login to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: colors.textSecondary,
                fontSize: '14px',
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleEmailChange}
                required
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: emailError ? '1px solid #ff5252' : `1px solid ${colors.border}`,
                  background: colors.inputBackground,
                  color: colors.text,
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {emailError && (
                <div style={{ color: '#ff5252', fontSize: '12px', marginTop: '5px' }}>
                  ⚠️ {emailError}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: colors.textSecondary,
                fontSize: '14px',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handlePasswordChange}
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    paddingRight: '50px',
                    borderRadius: '12px',
                    border: passwordError ? '1px solid #ff5252' : `1px solid ${colors.border}`,
                    background: colors.inputBackground,
                    color: colors.text,
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {passwordError && (
                <div style={{ color: '#ff5252', fontSize: '12px', marginTop: '5px' }}>
                  ⚠️ {passwordError}
                </div>
              )}
            </div>

            {loginError && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '10px',
                background: 'rgba(255, 82, 82, 0.1)',
                border: '1px solid #ff5252',
                color: '#ff5252',
                fontSize: '14px',
                textAlign: 'center',
              }}>
                ❌ {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                border: 'none',
                background: '#0066ff',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0066ff',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {showDemoCredentials ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
            </button>

            {showDemoCredentials && (
              <div style={{
                marginTop: '10px',
                padding: '15px',
                background: colors.hover,
                borderRadius: '10px',
                fontSize: '12px',
                color: colors.textSecondary,
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: colors.text }}>
                  Demo Credentials:
                </div>
                <div style={{ marginBottom: '5px' }}>
                  Email: <span style={{ color: '#0066ff' }}>sanmi@nenpay.com</span>
                </div>
                <div>
                  Password: <span style={{ color: '#0066ff' }}>sanmi123</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ MAIN APP ============
  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      display: 'flex',
      color: colors.text,
    }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        colors={colors}
        userName={userName}
        isMobile={isMobile}
      />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : (sidebarOpen ? '260px' : '80px'),
        padding: isMobile ? '15px' : '30px',
        paddingTop: isMobile ? '15px' : '30px',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isMobile ? '20px' : '30px',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
            {isMobile ? (
              <>
                <NenPayIcon size={38} animated={true} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  {activePage === 'dashboard' ? (
                    <>
                      <div style={{
                        fontSize: '12px',
                        color: colors.textSecondary,
                        fontWeight: '500',
                        marginBottom: '2px',
                      }}>
                        Welcome Back,
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '800',
                        letterSpacing: '-0.3px',
                        lineHeight: 1.1,
                        color: colors.text,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {userName.split(' ')[0]}! 👋
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '800',
                        letterSpacing: '-0.5px',
                        lineHeight: 1,
                      }}>
                        <span style={{ color: '#0066ff' }}>Nen</span>
                        <span style={{ color: colors.text }}>Pay</span>
                      </div>
                      <div style={{
                        fontSize: '9px',
                        letterSpacing: '1px',
                        color: colors.textSecondary,
                        fontWeight: '600',
                        marginTop: '3px',
                      }}>
                        BANKING MADE SIMPLE
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div>
                <h1 style={{
                  fontSize: '28px',
                  marginBottom: '5px',
                  color: colors.text,
                }}>
                  {activePage === 'dashboard'
                    ? `Welcome Back, ${userName.split(' ')[0]}! 👋`
                    : (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                          <span style={{ color: '#0066ff' }}>Nen</span>
                          <span style={{ color: colors.text }}>Pay</span>
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: colors.textSecondary,
                          fontWeight: '500',
                        }}>
                          • {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                        </span>
                      </div>
                    )
                  }
                </h1>
              </div>
            )}
          </div>

          {/* Right side buttons */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.text,
                }}
              >
                ☰
              </button>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: colors.card,
                border: `1px solid ${colors.border}`,
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: colors.card,
              border: `1px solid ${colors.border}`,
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              🔔
            </button>
          </div>
        </div>

        {/* Page Title on Mobile (for non-dashboard pages) */}
        {isMobile && activePage !== 'dashboard' && (
          <h1 style={{
            fontSize: '22px',
            marginBottom: '15px',
            color: colors.text,
          }}>
            {activePage.charAt(0).toUpperCase() + activePage.slice(1).replace(/([A-Z])/g, ' $1')}
          </h1>
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            balance={balance}
            showBalance={showBalance}
            setShowBalance={setShowBalance}
            transactions={transactions}
            setActivePage={setActivePage}
            formatCurrency={formatCurrency}
            colors={colors}
            isMobile={isMobile}
          />
        )}
        {activePage === 'send' && (
          <SendMoney balance={balance} addTransaction={addTransaction} formatCurrency={formatCurrency} colors={colors} />
        )}
        {activePage === 'airtime' && (
          <Airtime balance={balance} addTransaction={addTransaction} formatCurrency={formatCurrency} colors={colors} />
        )}
        {activePage === 'bills' && (
          <Bills balance={balance} addTransaction={addTransaction} formatCurrency={formatCurrency} colors={colors} />
        )}
        {activePage === 'account' && (
          <Account balance={balance} formatCurrency={formatCurrency} colors={colors} userName={userName} />
        )}
        {activePage === 'transactions' && (
          <Transactions transactions={transactions} formatCurrency={formatCurrency} colors={colors} />
        )}
        {activePage === 'savings' && (
          <Savings balance={balance} addTransaction={addTransaction} formatCurrency={formatCurrency} colors={colors} />
        )}
        {activePage === 'settings' && (
          <Settings
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            colors={colors}
            handleLogout={handleLogout}
            currency={currency}
            setCurrency={setCurrency}
            userName={userName}
            setUserName={setUserName}
          />
        )}
      </div>
    </div>
  );
}

export default App;