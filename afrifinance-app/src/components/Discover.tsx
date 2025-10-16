import React, { useState } from 'react';
import { useSearch } from './SearchContext';
import './Discover.css';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [activeFilter, setActiveFilter] = useState('latest');

  const features = [
    {
      icon: '👥',
      iconBg: '#00ff88',
      title: 'TradersHub',
      description: 'Social trading community',
      stat: '24 new posts',
      statColor: 'red'
    },
    {
      icon: '📚',
      iconBg: '#ff6b35',
      title: 'Learn',
      description: 'Investment courses & guides',
      stat: '12 courses available',
      statColor: 'orange'
    },
    {
      icon: '📊',
      iconBg: '#007acc',
      title: 'Papertrade',
      description: 'Practice trading risk-free',
      stat: '2847 active',
      statColor: 'blue'
    },
    {
      icon: '#',
      iconBg: '#9b59b6',
      title: 'Chats',
      description: 'Real-time trading rooms',
      stat: '3 active rooms',
      statColor: 'purple'
    }
  ];

  const feedPosts = [
    {
      avatar: 'TK',
      avatarBg: '#00ff88',
      username: 'TraderKE_Pro',
      badge: 'Pinned',
      time: '2h ago',
      content: 'Just bought more SAFCOM on this dip. Long-term bullish on M-Pesa expansion! 📈',
      likes: 24,
      comments: 8
    },
    {
      avatar: 'IJ',
      avatarBg: '#ff6b35',
      username: 'InvestorJane',
      badge: 'Pinned',
      time: '4h ago',
      content: 'Banking sector showing strong fundamentals. KCB and EQTY are my picks for Q4 💪',
      likes: 18,
      comments: 12
    }
  ];

  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'courses', label: 'Courses' },
    { id: 'traders', label: 'Top Traders' },
    { id: 'rooms', label: 'Rooms' }
  ];

  const filters = [
    { id: 'latest', label: 'Latest' },
    { id: 'top', label: 'Top' },
    { id: 'following', label: 'Following' }
  ];
  const { openSearch } = useSearch();


  return (
    <div className="discover">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Discover</h1>
          <p>Social investing & learning hub</p>
        </div>
        <div className="header-right">
          <div className="header-icon" onClick={openSearch}>🔍</div>
          <div className="header-icon">🔔</div>
        </div>
      </div>

      {/* Portfolio Insights */}
      <div className="portfolio-insights">
        <div className="insights-header">
          <h2 className="insights-title">🧠 Portfolio Insights</h2>
          <div className="performance-badge">+24.5%</div>
        </div>
        <div className="top-holdings">Top Holdings</div>
        <div className="holdings-list">
          <div className="holding-tag">SAFCOM</div>
          <div className="holding-tag">EQTY</div>
          <div className="holding-tag">KCB</div>
        </div>
        <div className="best-performer">
          Best: <span className="stock">EQTY</span> <span className="percentage">+13.2%</span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-header">
              <div className="feature-icon" style={{ background: feature.iconBg }}>
                {feature.icon}
              </div>
              <div className="feature-title">{feature.title}</div>
            </div>
            <div className="feature-description">{feature.description}</div>
            <div className={`feature-stat ${feature.statColor}`}>
              {feature.stat.includes('new') && '⭕ '}
              {feature.stat.includes('courses') && '▶️ '}
              {feature.stat.includes('active') && '👥 '}
              {feature.stat.includes('rooms') && '💬 '}
              {feature.stat}
            </div>
          </div>
        ))}
      </div>

      {/* Discover Tabs */}
      <div className="discover-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`discover-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Filters */}
      <div className="feed-filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Feed Content */}
      <div className="feed-content">
        {feedPosts.map((post, index) => (
          <div key={index} className="feed-item">
            <div className="feed-header">
              <div className="user-avatar" style={{ background: post.avatarBg }}>
                {post.avatar}
              </div>
              <div className="user-info">
                <h4>{post.username}</h4>
                <p>{post.badge}</p>
              </div>
              <div className="post-time">{post.time}</div>
            </div>
            <div className="feed-content-text">{post.content}</div>
            <div className="feed-engagement">
              <div className="engagement-item">👍 {post.likes}</div>
              <div className="engagement-item">💬 {post.comments}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Post Button */}
      <button className="post-button">✏️</button>
    </div>
  );
};

export default Discover;