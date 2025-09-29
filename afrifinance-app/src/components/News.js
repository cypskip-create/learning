import React, { useState } from 'react';
import './News.css';

const News = () => {
  const [activeTab, setActiveTab] = useState('latest');

  const newsArticles = [
    {
      icon: '📱',
      iconBg: '#00ff88',
      title: 'Safaricom Reports Strong Q3 Results',
      description: "Kenya's largest telco posts 12% growth in revenue driven by M-Pesa expansion",
      source: 'Business Daily',
      time: '2 hours ago'
    },
    {
      icon: '📊',
      iconBg: '#007acc',
      title: 'NSE 20 Index Hits New Monthly High',
      description: 'Banking and telecom sectors lead market rally amid positive investor sentiment',
      source: 'Capital FM',
      time: '4 hours ago'
    },
    {
      icon: '🏛',
      iconBg: '#666',
      title: 'Central Bank Maintains Rates at 12.5%',
      description: 'CBK keeps policy rate unchanged citing stable inflation outlook',
      source: 'The Star',
      time: '6 hours ago'
    },
    {
      icon: '🏦',
      iconBg: '#ff6b35',
      title: 'Equity Bank Expands to South Sudan',
      description: 'Regional banking group opens new subsidiary as part of expansion strategy',
      source: 'Standard',
      time: '8 hours ago'
    },
    {
      icon: '🏦',
      iconBg: '#666',
      title: 'KCB Group Posts Record Profits',
      description: 'Leading bank reports 18% increase in net profit driven by loan growth',
      source: 'Business Daily',
      time: '12 hours ago'
    },
    {
      icon: '🍺',
      iconBg: '#666',
      title: 'EABL Announces Dividend Payment',
      description: 'East African Breweries declares interim dividend of KES 4.50 per share',
      source: 'Capital FM',
      time: '1 day ago'
    }
  ];

  const tabs = [
    { id: 'headlines', icon: '📰', label: 'Headlines' },
    { id: 'latest', icon: '⏰', label: 'Latest' },
    { id: 'earnings', icon: '🏛', label: 'Earnings' },
    { id: 'watchlist', icon: '📈', label: 'Watchlist' }
  ];

  return (
    <div className="news">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>📰 Market News</h1>
          <p>Stay updated with latest market developments</p>
        </div>
        <div className="header-right">
          <div className="header-icon">📁</div>
          <div className="header-icon">🔍</div>
        </div>
      </div>

      {/* News Category Tabs */}
      <div className="news-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`news-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Breaking News Banner */}
      <div className="breaking-news">
        <div className="breaking-label">🔴 Breaking News</div>
        <div className="breaking-text">
          KCB Group announces strategic partnership with fintech startup to enhance digital banking services
        </div>
      </div>

      {/* News Articles */}
      <div className="news-list">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-item">
            <div className="news-icon" style={{ background: article.iconBg }}>
              {article.icon}
            </div>
            <div className="news-content">
              <div className="news-header">
                <h3 className="news-title">{article.title}</h3>
                <span className="news-time">{article.time}</span>
              </div>
              <p className="news-description">{article.description}</p>
              <p className="news-source">{article.source}</p>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default News;