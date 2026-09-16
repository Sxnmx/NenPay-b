import React, { useState } from 'react';
import { NenPayIcon } from './Logo';
import { useWindowSize } from './useWindowSize';

const Settings = ({ 
  isDarkMode, 
  setIsDarkMode, 
  colors, 
  handleLogout,
  currency,
  setCurrency,
  userName,
  setUserName,
}) => {
  const { isMobile } = useWindowSize();
  
  const [profileData, setProfileData] = useState({
    fullName: userName || 'Sanmi Ajimajasan',
    email: 'sanmi@nenpay.com',
    phone: '+234 801 234 5678',
    address: '123 Main Street, Lagos, Nigeria',
    dateOfBirth: '1990-01-15',
    gender: 'Male',
    nin: '12345678901',
    bvn: '22345678901',
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    loginAlerts: true,
    transactionPIN: true,
    autoLock: true,
    deviceManagement: true,
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyStatements: true,
    promotionalOffers: false,
    billReminders: true,
  });

  const [general, setGeneral] = useState({
    language: 'English',
    timezone: 'Africa/Lagos (GMT+1)',
    autoUpdate: true,
    dataUsage: false,
    hapticFeedback: true,
    soundEffects: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    shareAnalytics: false,
    personalizedAds: false,
    locationAccess: true,
    contactsAccess: false,
  });

  const [payments, setPayments] = useState({
    defaultAccount: 'Main Account',
    saveCardDetails: true,
    quickTransfer: true,
    transferLimit: '500,000',
    internationalPayments: false,
  });

  // null = menu view, non-null = section view
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'general', label: 'General', icon: '⚙️', description: 'Language, currency, timezone' },
    { id: 'profile', label: 'Profile Info', icon: '👤', description: 'Name, email, phone, BVN, NIN' },
    { id: 'security', label: 'Security', icon: '🔐', description: 'Password, 2FA, biometric' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'Push, email, SMS alerts' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️', description: 'Data, location, analytics' },
    { id: 'payments', label: 'Payments', icon: '💳', description: 'Cards, limits, transfers' },
    { id: 'appearance', label: 'Appearance', icon: '🎨', description: 'Dark mode, display' },
    { id: 'about', label: 'About & Support', icon: 'ℹ️', description: 'Help, terms, contact' },
  ];

  const toggleSetting = (category, key) => {
    const setters = {
      security: setSecurity,
      notifications: setNotifications,
      general: setGeneral,
      privacy: setPrivacy,
      payments: setPayments,
    };
    const state = { security, notifications, general, privacy, payments }[category];
    setters[category]({ ...state, [key]: !state[key] });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    background: colors.inputBackground,
    color: colors.text,
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: colors.textSecondary,
    fontSize: '13px',
  };

  const toggleButton = (isActive, onClick) => (
    <button
      onClick={onClick}
      style={{
        width: '48px',
        height: '26px',
        borderRadius: '13px',
        background: isActive ? '#0066ff' : colors.border,
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '3px',
        left: isActive ? '25px' : '3px',
        transition: 'left 0.3s ease',
      }} />
    </button>
  );

  const settingRow = (icon, label, description, isActive, onClick) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: `1px solid ${colors.border}`,
      gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '18px', minWidth: '24px' }}>{icon}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: colors.text, fontWeight: '600', fontSize: '14px' }}>{label}</div>
          <div style={{ color: colors.textSecondary, fontSize: '12px', marginTop: '2px' }}>{description}</div>
        </div>
      </div>
      {toggleButton(isActive, onClick)}
    </div>
  );

  const actionRow = (icon, label, onClick, color = null) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        background: 'transparent',
        color: color || colors.text,
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <span>{label}</span>
      </div>
      <span style={{ color: colors.textSecondary }}>→</span>
    </button>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>General Settings</h3>
              <label style={labelStyle}>Language</label>
              <select value={general.language} onChange={(e) => setGeneral({ ...general, language: e.target.value })} style={inputStyle}>
                <option>English</option>
                <option>Yoruba</option>
                <option>Igbo</option>
                <option>Hausa</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
              <label style={labelStyle}>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={inputStyle}>
                <option value="NGN">NGN - Nigerian Naira (₦)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="ZAR">ZAR - South African Rand (R)</option>
                <option value="GHS">GHS - Ghanaian Cedi (₵)</option>
                <option value="KES">KES - Kenyan Shilling (KSh)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="CNY">CNY - Chinese Yuan (¥)</option>
                <option value="INR">INR - Indian Rupee (₹)</option>
              </select>
              <label style={labelStyle}>Timezone</label>
              <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} style={inputStyle}>
                <option>Africa/Lagos (GMT+1)</option>
                <option>Africa/Accra (GMT+0)</option>
                <option>Africa/Nairobi (GMT+3)</option>
                <option>Europe/London (GMT+0)</option>
                <option>America/New_York (GMT-5)</option>
              </select>
              {settingRow('🔄', 'Auto Update', 'Automatically update the app', general.autoUpdate, () => toggleSetting('general', 'autoUpdate'))}
              {settingRow('📊', 'Data Saver', 'Reduce data usage', general.dataUsage, () => toggleSetting('general', 'dataUsage'))}
              {settingRow('📳', 'Haptic Feedback', 'Vibration on interactions', general.hapticFeedback, () => toggleSetting('general', 'hapticFeedback'))}
              {settingRow('🔊', 'Sound Effects', 'Play sounds on actions', general.soundEffects, () => toggleSetting('general', 'soundEffects'))}
            </div>
          </>
        );

      case 'profile':
        return (
          <>
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  background: '#0066ff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '30px',
                }}>
                  👤
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: colors.text }}>{profileData.fullName}</div>
                  <div style={{ color: colors.textSecondary, fontSize: '13px' }}>{profileData.email}</div>
                </div>
              </div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} style={inputStyle} />
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} style={inputStyle} />
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} style={inputStyle} />
              <label style={labelStyle}>Residential Address</label>
              <input type="text" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} style={inputStyle} />
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" value={profileData.dateOfBirth} onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })} style={inputStyle} />
              <label style={labelStyle}>Gender</label>
              <select value={profileData.gender} onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })} style={inputStyle}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              <button style={{
                width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                background: '#0066ff', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px',
              }}>
                Save Changes
              </button>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🪪 Identity Verification</h3>
              <label style={labelStyle}>BVN</label>
              <input type="text" value={profileData.bvn} onChange={(e) => setProfileData({ ...profileData, bvn: e.target.value })} style={inputStyle} maxLength="11" />
              <label style={labelStyle}>NIN</label>
              <input type="text" value={profileData.nin} onChange={(e) => setProfileData({ ...profileData, nin: e.target.value })} style={inputStyle} maxLength="11" />
            </div>
          </>
        );

      case 'security':
        return (
          <>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🔐 Security Settings</h3>
              {settingRow('🛡️', 'Two-Step Verification', 'Extra layer of security', security.twoFactorAuth, () => toggleSetting('security', 'twoFactorAuth'))}
              {settingRow('👆', 'Biometric Login', 'Use fingerprint or Face ID', security.biometricLogin, () => toggleSetting('security', 'biometricLogin'))}
              {settingRow('🔔', 'Login Alerts', 'Get notified of new logins', security.loginAlerts, () => toggleSetting('security', 'loginAlerts'))}
              {settingRow('🔢', 'Transaction PIN', 'Require PIN for transactions', security.transactionPIN, () => toggleSetting('security', 'transactionPIN'))}
              {settingRow('🔒', 'Auto Lock', 'Lock app when inactive', security.autoLock, () => toggleSetting('security', 'autoLock'))}
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🔑 Password & PIN</h3>
              {actionRow('🔑', 'Change Password', () => alert('Change Password'))}
              {actionRow('🔢', 'Change Transaction PIN', () => alert('Change PIN'))}
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>⚠️ Danger Zone</h3>
              {actionRow('🚫', 'Deactivate Account', () => alert('Deactivate'), '#ff9800')}
              {actionRow('🗑️', 'Delete Account', () => alert('Delete'), '#ff5252')}
            </div>
          </>
        );

      case 'notifications':
        return (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>📬 Notifications</h3>
            {settingRow('📱', 'Push Notifications', 'Enable app notifications', notifications.pushNotifications, () => toggleSetting('notifications', 'pushNotifications'))}
            {settingRow('📧', 'Email Alerts', 'Receive emails', notifications.emailAlerts, () => toggleSetting('notifications', 'emailAlerts'))}
            {settingRow('💬', 'SMS Alerts', 'Get text messages', notifications.smsAlerts, () => toggleSetting('notifications', 'smsAlerts'))}
            {settingRow('💳', 'Transaction Alerts', 'Alerts for transactions', notifications.transactionAlerts, () => toggleSetting('notifications', 'transactionAlerts'))}
            {settingRow('🧾', 'Bill Reminders', 'Reminders for bills', notifications.billReminders, () => toggleSetting('notifications', 'billReminders'))}
            {settingRow('🔒', 'Security Alerts', 'Important notifications', notifications.securityAlerts, () => toggleSetting('notifications', 'securityAlerts'))}
            {settingRow('📈', 'Weekly Reports', 'Weekly summary', notifications.weeklyReports, () => toggleSetting('notifications', 'weeklyReports'))}
            {settingRow('🎁', 'Promotional Offers', 'Deals from partners', notifications.promotionalOffers, () => toggleSetting('notifications', 'promotionalOffers'))}
          </div>
        );

      case 'privacy':
        return (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🛡️ Privacy</h3>
            {settingRow('👁️', 'Profile Visibility', 'Allow others to find you', privacy.profileVisibility, () => toggleSetting('privacy', 'profileVisibility'))}
            {settingRow('📊', 'Share Analytics', 'Help improve services', privacy.shareAnalytics, () => toggleSetting('privacy', 'shareAnalytics'))}
            {settingRow('🎯', 'Personalized Ads', 'Show personalized content', privacy.personalizedAds, () => toggleSetting('privacy', 'personalizedAds'))}
            {settingRow('📍', 'Location Access', 'For nearby services', privacy.locationAccess, () => toggleSetting('privacy', 'locationAccess'))}
            {settingRow('👥', 'Contacts Access', 'Send money easily', privacy.contactsAccess, () => toggleSetting('privacy', 'contactsAccess'))}
          </div>
        );

      case 'payments':
        return (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>💳 Payment Settings</h3>
            <label style={labelStyle}>Default Account</label>
            <select value={payments.defaultAccount} onChange={(e) => setPayments({ ...payments, defaultAccount: e.target.value })} style={inputStyle}>
              <option>Main Account</option>
              <option>Savings Account</option>
              <option>Fixed Deposit</option>
            </select>
            <label style={labelStyle}>Daily Transfer Limit</label>
            <input type="text" value={payments.transferLimit} onChange={(e) => setPayments({ ...payments, transferLimit: e.target.value })} style={inputStyle} />
            {settingRow('💾', 'Save Card Details', 'Faster checkout', payments.saveCardDetails, () => toggleSetting('payments', 'saveCardDetails'))}
            {settingRow('⚡', 'Quick Transfer', 'Skip confirmation', payments.quickTransfer, () => toggleSetting('payments', 'quickTransfer'))}
            {settingRow('🌍', 'International Payments', 'International transfers', payments.internationalPayments, () => toggleSetting('payments', 'internationalPayments'))}
          </div>
        );

      case 'appearance':
        return (
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🎨 Appearance</h3>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '15px 0', borderBottom: `1px solid ${colors.border}`,
            }}>
              <div>
                <div style={{ color: colors.text, fontWeight: '600', fontSize: '14px' }}>
                  {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </div>
                <div style={{ color: colors.textSecondary, fontSize: '12px', marginTop: '2px' }}>
                  Currently using {isDarkMode ? 'dark' : 'light'} theme
                </div>
              </div>
              {toggleButton(isDarkMode, () => setIsDarkMode(!isDarkMode))}
            </div>
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <button onClick={() => setIsDarkMode(true)} style={{
                padding: '15px', borderRadius: '10px',
                border: isDarkMode ? '2px solid #0066ff' : `1px solid ${colors.border}`,
                background: '#000000', color: 'white', cursor: 'pointer', fontWeight: '600',
              }}>🌙 Dark</button>
              <button onClick={() => setIsDarkMode(false)} style={{
                padding: '15px', borderRadius: '10px',
                border: !isDarkMode ? '2px solid #0066ff' : `1px solid ${colors.border}`,
                background: '#f5f5f5', color: '#000', cursor: 'pointer', fontWeight: '600',
              }}>☀️ Light</button>
            </div>
          </div>
        );

      case 'about':
        return (
          <>
            <div style={cardStyle}>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  <NenPayIcon size={80} animated={true} />
                </div>
                <h2 style={{ color: colors.text, fontSize: '28px', fontWeight: '800', marginBottom: '5px', letterSpacing: '-0.5px' }}>
                  <span style={{ color: '#0066ff' }}>Nen</span>Pay
                </h2>
                <p style={{ color: colors.textSecondary, fontSize: '11px', letterSpacing: '1.5px', fontWeight: '600' }}>
                  BANKING MADE SIMPLE
                </p>
                <p style={{ color: colors.textSecondary, fontSize: '13px', marginTop: '8px' }}>Version 2.0.0</p>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>ℹ️ About</h3>
              {actionRow('📋', 'Terms of Service', () => alert('Terms'))}
              {actionRow('📄', 'Privacy Policy', () => alert('Privacy'))}
              {actionRow('⭐', 'Rate Us', () => alert('Rate Us'))}
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>🆘 Help & Support</h3>
              {actionRow('💬', 'Live Chat', () => alert('Chat'))}
              {actionRow('📞', 'Call Customer Care', () => alert('Calling...'))}
              {actionRow('📧', 'Email Support', () => alert('Email'))}
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: colors.text }}>📞 Contact</h3>
              <div style={{ color: colors.textSecondary, fontSize: '13px', lineHeight: '1.8' }}>
                <div>📧 support@nenpay.com</div>
                <div>📞 +234 700 NENPAY (636729)</div>
                <div>📍 123 Financial District, Lagos, Nigeria</div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ============ FULL PAGE SECTION VIEW ============
  if (activeSection !== null) {
    const currentSection = sections.find(s => s.id === activeSection);
    return (
      <div style={{ padding: isMobile ? '0' : '0' }}>
        {/* Back button + title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <button
            onClick={() => setActiveSection(null)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.text,
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ←
          </button>
          <div style={{ minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: colors.text,
            }}>
              <span>{currentSection.icon}</span>
              <span>{currentSection.label}</span>
            </div>
            <div style={{
              fontSize: '12px',
              color: colors.textSecondary,
              marginTop: '2px',
            }}>
              {currentSection.description}
            </div>
          </div>
        </div>

        {/* Section content */}
        <div>
          {renderSection()}
        </div>

        {/* Logout at bottom (only on About section) */}
        {activeSection === 'about' && (
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              padding: '15px',
              marginTop: '20px',
              borderRadius: '12px',
              border: 'none',
              background: '#ff5252',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            🚪 Logout
          </button>
        )}
      </div>
    );
  }

  // ============ MENU VIEW (list of settings) ============
  return (
    <div>
      <h1 style={{ fontSize: isMobile ? '22px' : '28px', marginBottom: '8px', color: colors.text }}>
        Settings
      </h1>
      <p style={{ color: colors.textSecondary, marginBottom: '25px', fontSize: isMobile ? '13px' : '14px' }}>
        Manage your app preferences and account
      </p>

      <div style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '20px',
      }}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '18px 20px',
              border: 'none',
              borderBottom: index < sections.length - 1 ? `1px solid ${colors.border}` : 'none',
              background: 'transparent',
              color: colors.text,
              cursor: 'pointer',
              textAlign: 'left',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: 0 }}>
              <span style={{ fontSize: '22px', minWidth: '28px' }}>{section.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: '600', fontSize: '15px', color: colors.text }}>
                  {section.label}
                </div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '12px',
                  marginTop: '2px',
                }}>
                  {section.description}
                </div>
              </div>
            </div>
            <span style={{ color: colors.textSecondary, fontSize: '20px', flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          padding: '15px',
          borderRadius: '12px',
          border: 'none',
          background: '#ff5252',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '15px',
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Settings;