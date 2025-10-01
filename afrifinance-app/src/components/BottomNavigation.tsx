import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/markets', icon: '📈', label: 'Markets' },
    { path: '/news', icon: '📰', label: 'News' },
    { path: '/discover', icon: '🔍', label: 'Discover' },
    { path: '/portfolio', icon: '⏱', label: 'Portfolio' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bottom-nav">
      <div className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;