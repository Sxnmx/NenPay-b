import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Dashboard from './Dashboard';
import SendMoney from './SendMoney';
import Airtime from './Airtime';
import Bills from './Bills';
import Account from './Account';
import Transactions from './Transactions';
import Savings from './Savings';
import Settings from './Settings';
import PinModal from './PinModal';
import { NenPayIcon } from './Logo';
import { useApp } from './AppContext';
import { useToast } from './Toast';
import { useWindowSize } from './useWindowSize';

function App() {
  const { isMobile } = useWindowSize();
  const {
    isLoggedIn,
    userName,
    isDarkMode,
    currency,
    balance,
    transactions,
    savingsGoals,
    colors,
    formatCurrency,
    login,
    logout,
    toggleDarkMode,
    setCurrency,
    setUserName,
    addTransaction,
    updateSavingsGoals,
    verifyPin,
  } = useApp();
  const { showToast } = useToast();

  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // PIN gate state (shared across pages via context below)
  const [pinConfig, setPinConfig] = useState({ isOpen: false, onSuccess: null, title: undefined, subtitle: undefined });

  const requirePin = (onSuccess, title, subtitle) => {
    setPinConfig({ isOpen: true, onSuccess, title, subtitle });
  };
  const closePin = () => setPinConfig({ isOpen: false, onSuccess: null });

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const demoCredentials = [
    { email: 'sanmi@nenpay.com', password: 'sanmi123', name: 'Sanmi Ajimajasan' },
    { email: 'admin@nenpay.com', password: 'admin123', name: 'Admin User' },
  ];

  // On mobile: sidebar is always drawer-based
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLoginData((d) => ({ ...d, email }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) setEmailError('Please enter a valid email address');
    else setEmailError('');
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setLoginData((d) => ({ ...d, password }));
    if (password && password.length < 6) setPasswordError('Password must be at least 6 characters');
    else setPasswordError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email) return setLoginError('Email is required');
    if (!emailRegex.test(loginData.email)) return setLoginError('Please enter a valid email address');
    if (!loginData.password) return setLoginError('Password is required');
    if (loginData.password.length < 6) return setLoginError('Password must be at least 6 characters');

    const user = demoCredentials.find(
      (u) => u.email === loginData.email.toLowerCase() && u.password === loginData.password
    );

    if (user) {
      login(user);
      setLoginError('');
      setEmailError('');
      setPasswordError('');
      setLoginData({ email: '', password: '' });
      showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
    } else {
      setLoginError('Invalid email or password. Try sanmi@nenpay.com / sanmi123');
    }
  };

  const handleLogout = () => {
    logout();
    setActivePage('dashboard');
    showToast('Logged out', 'info');
  };

  // ============ LOGIN PAGE ============
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: isDarkMode ? '#000000' : '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        paddingTop: 'calc(20px + var(--safe-top))',
        paddingBottom: 'calc(20px + var(--safe-bottom))',
        position: 'relative',
      }}>
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
          style={{
            position: 'absolute',
            top: 'calc(20px + var(--safe-top))',
            right: '20px',
            width: '44px',
            height: '44px',
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
          padding: isMobile ? '28px 20px' : '40px',
          width: '100%',
          maxWidth: '420px',
          boxSizing: 'border-box',
          animation: 'slideUp 0.4s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <NenPayIcon size={72} animated={true} />
            </div>
            <h1 style={{
              color: colors.text,
              fontSize: '30px',
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
              marginBottom: '14px',
            }}>
              BANKING MADE SIMPLE
            </p>
            <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
              Welcome back! Please login to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: colors.textSecondary, fontSize: '14px', fontWeight: '500',
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleEmailChange}
                autoComplete="email"
                inputMode="email"
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
                <div style={{ color: '#ff5252', fontSize: '12px', marginTop: '6px' }}>
                  ⚠️ {emailError}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: colors.textSecondary, fontSize: '14px', fontWeight: '500',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
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
                  aria-label="Toggle password visibility"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {passwordError && (
                <div style={{ color: '#ff5252', fontSize: '12px', marginTop: '6px' }}>
                  ⚠️ {passwordError}
                </div>
              )}
            </div>

            {loginError && (
              <div style={{
                padding: '12px',
                marginBottom: '18px',
                borderRadius: '10px',
                background: 'rgba(255, 82, 82, 0.1)',
                border: '1px solid #ff5252',
                color: '#ff5252',
                fontSize: '13px',
                textAlign: 'center',
              }}>
                ❌ {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 102, 255, 0.35)',
              }}
            >
              Login
            </button>
          </form>

          <div style={{ marginTop: '18px', textAlign: 'center' }}>
            <button
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0066ff',
                cursor: 'pointer',
                fontSize: '14px',
                minHeight: 'auto',
                padding: '8px',
              }}
            >
              {showDemoCredentials ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
            </button>

            {showDemoCredentials && (
              <div style={{
                marginTop: '10px',
                padding: '14px',
                background: colors.hover,
                borderRadius: '10px',
                fontSize: '12px',
                color: colors.textSecondary,
                textAlign: 'left',
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: colors.text }}>
                  Demo Credentials:
                </div>
                <div style={{ marginBottom: '5px' }}>
                  Email: <span style={{ color: '#0066ff' }}>sanmi@nenpay.com</span>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  Password: <span style={{ color: '#0066ff' }}>sanmi123</span>
                </div>
                <div style={{
                  marginTop: '10px', paddingTop: '10px',
                  borderTop: `1px solid ${colors.border}`,
                  color: colors.textSecondary,
                }}>
                  Transaction PIN: <span style={{ color: '#0066ff' }}>1234</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ MAIN APP ============
  const pageTitle = activePage.charAt(0).toUpperCase() + activePage.slice(1);

  return (
    <div style={{
      minHeight: '100dvh',
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
        padding: isMobile ? '16px' : '30px',
        paddingTop: `calc(${isMobile ? '16px' : '30px'} + var(--safe-top))`,
        paddingBottom: isMobile ? 'calc(96px + var(--safe-bottom))' : '30px',
        minHeight: '100dvh',
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
          marginBottom: isMobile ? '18px' : '30px',
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
                        fontSize: '12px', color: colors.textSecondary,
                        fontWeight: '500', marginBottom: '2px',
                      }}>
                        Welcome Back,
                      </div>
                      <div style={{
                        fontSize: '17px', fontWeight: '800', letterSpacing: '-0.3px',
                        lineHeight: 1.1, color: colors.text,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {userName.split(' ')[0]}! 👋
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        fontSize: '19px', fontWeight: '800',
                        letterSpacing: '-0.5px', lineHeight: 1,
                      }}>
                        <span style={{ color: '#0066ff' }}>Nen</span>
                        <span style={{ color: colors.text }}>Pay</span>
                      </div>
                      <div style={{
                        fontSize: '9px', letterSpacing: '1px',
                        color: colors.textSecondary, fontWeight: '600', marginTop: '3px',
                      }}>
                        BANKING MADE SIMPLE
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <h1 style={{ fontSize: '28px', marginBottom: '5px', color: colors.text }}>
                {activePage === 'dashboard' ? (
                  `Welcome Back, ${userName.split(' ')[0]}! 👋`
                ) : (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                      <span style={{ color: '#0066ff' }}>Nen</span>
                      <span style={{ color: colors.text }}>Pay</span>
                    </span>
                    <span style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: '500' }}>
                      • {pageTitle}
                    </span>
                  </div>
                )}
              </h1>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: colors.card, border: `1px solid ${colors.border}`,
                cursor: 'pointer', fontSize: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button
              aria-label="Notifications"
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: colors.card, border: `1px solid ${colors.border}`,
                cursor: 'pointer', fontSize: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onClick={() => showToast('No new notifications', 'info')}
            >
              🔔
            </button>
          </div>
        </div>

        {/* Mobile-only page title for non-dashboard pages */}
        {isMobile && activePage !== 'dashboard' && (
          <h1 style={{
            fontSize: '22px', marginBottom: '14px',
            color: colors.text, fontWeight: '700',
          }}>
            {pageTitle.replace(/([A-Z])/g, ' $1').trim()}
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
          <SendMoney
            balance={balance}
            addTransaction={addTransaction}
            formatCurrency={formatCurrency}
            colors={colors}
            requirePin={requirePin}
            showToast={showToast}
          />
        )}
        {activePage === 'airtime' && (
          <Airtime
            balance={balance}
            addTransaction={addTransaction}
            formatCurrency={formatCurrency}
            colors={colors}
            requirePin={requirePin}
            showToast={showToast}
          />
        )}
        {activePage === 'bills' && (
          <Bills
            balance={balance}
            addTransaction={addTransaction}
            formatCurrency={formatCurrency}
            colors={colors}
            requirePin={requirePin}
            showToast={showToast}
          />
        )}
        {activePage === 'account' && (
          <Account
            balance={balance}
            formatCurrency={formatCurrency}
            colors={colors}
            userName={userName}
            showToast={showToast}
          />
        )}
        {activePage === 'transactions' && (
          <Transactions
            transactions={transactions}
            formatCurrency={formatCurrency}
            colors={colors}
          />
        )}
        {activePage === 'savings' && (
          <Savings
            balance={balance}
            addTransaction={addTransaction}
            formatCurrency={formatCurrency}
            colors={colors}
            savingsGoals={savingsGoals}
            updateSavingsGoals={updateSavingsGoals}
            requirePin={requirePin}
            showToast={showToast}
          />
        )}
        {activePage === 'settings' && (
          <Settings
            isDarkMode={isDarkMode}
            setIsDarkMode={(v) => toggleDarkMode()}
            colors={colors}
            handleLogout={handleLogout}
            currency={currency}
            setCurrency={setCurrency}
            userName={userName}
            setUserName={setUserName}
            showToast={showToast}
          />
        )}
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <BottomNav
          activePage={activePage}
          setActivePage={setActivePage}
          onMore={() => setSidebarOpen(true)}
          colors={colors}
        />
      )}

      {/* Global PIN gate */}
      <PinModal
        isOpen={pinConfig.isOpen}
        onClose={closePin}
        onSuccess={() => {
          const cb = pinConfig.onSuccess;
          closePin();
          if (typeof cb === 'function') cb();
        }}
        verifyPin={verifyPin}
        colors={colors}
        title={pinConfig.title || 'Enter Transaction PIN'}
        subtitle={pinConfig.subtitle || 'Authorize this transaction with your 4-digit PIN'}
      />
    </div>
  );
}

export default App;