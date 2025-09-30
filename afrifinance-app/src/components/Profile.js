import React from 'react';
import './Profile.css';

const Profile = () => {
  const subscriptionPlans = [
    {
      name: 'Free',
      price: 'KES 0',
      isCurrent: true,
      features: [
        'Basic features',
        'Limited AI (3/day)',
        'Ads included'
      ]
    },
    {
      name: 'Premium',
      price: 'KES 999/month',
      isCurrent: false,
      features: [
        'Ad-free experience',
        'Enhanced tools',
        'AI Assistant (30/day)'
      ]
    },
    {
      name: 'Premium+ ⚡',
      price: 'KES 1,999/month',
      isCurrent: false,
      features: [
        'Everything in Premium',
        'Advanced analytics',
        'Unlimited AI Assistant',
        'Priority support'
      ]
    }
  ];

  const settingsOptions = [
    {
      title: 'Notifications',
      description: 'Manage push notifications and alerts'
    },
    {
      title: 'Privacy & Security',
      description: 'Account security and privacy settings'
    },
    {
      title: 'Trading Preferences',
      description: 'Default order types and confirmations'
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support'
    },
    {
      title: 'About AfriFinance',
      description: 'App version and legal information'
    }
  ];

  return (
    <div className="account">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Account</h1>
          <p>Profile & settings</p>
        </div>
        <div className="header-right">
          <div className="header-icon">🔔</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-icon">👤</div>
          <h2 className="profile-title">Profile</h2>
        </div>

        <div className="profile-info">
          <div className="profile-avatar">JK</div>
          <div className="profile-details">
            <h3>John Kamau</h3>
            <div className="profile-badge">👑 Free</div>
            <div className="profile-member-since">Member since Dec 2024</div>
          </div>
        </div>

        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* Subscription Plans */}
      <div className="subscription-section">
        <div className="subscription-header">
          <div className="subscription-icon">👑</div>
          <h2 className="subscription-title">Subscription Plans</h2>
        </div>

        {subscriptionPlans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.isCurrent ? 'current' : ''}`}>
            {plan.isCurrent && <div className="current-badge">Current</div>}
            <div className="plan-header">
              <div>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">{plan.price}</div>
              </div>
              {!plan.isCurrent && (
                <button className="upgrade-btn primary">Upgrade</button>
              )}
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="settings-section">
        <h3 className="settings-title">Settings</h3>

        {settingsOptions.map((option, index) => (
          <div key={index} className="settings-option">
            <div>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </div>
            <div className="settings-arrow">›</div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="logout-section">
        <button className="logout-btn">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;