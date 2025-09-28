import React, { useState } from 'react';
import './Markets.css';

const Markets = () => {
  const [activeTab, setActiveTab] = useState('stocks');

  const marketTabs = [
    { id: 'stocks', icon: '📈', label: 'Stocks' },
    { id: 'crypto', icon: '₿', label: 'Crypto' },
    { id: 'etfs', icon: '📊', label: 'ETFs' },
    { id: 'options', icon: '📋', label: 'Options' },
    { id: 'commodities', icon: '🏗', label: 'Commodities' },
    { id: 'bonds', icon: '🏦', label: 'Bonds' }
  ];

  const topGainers = [
    { symbol: 'EQTY', name: 'Equity Group', price: 62.50, change: 13.12 },
    { symbol: 'SAFCOM', name: 'Safaricom PLC', price: 12.85, change: 1.18 },
    { symbol: 'KCB', name: 'KCB Group', price: 45.20, change: 0.85 }
  ];

  const topLosers = [
    { symbol: 'BAMB', name: 'Bamburi Cement', price: 85.30, change: -2.4 },
    { symbol: 'EABL', name: 'EABL', price: 142.00, change: -1.8 },
    { symbol: 'SCBK', name: 'Standard Chartered', price: 168.50, change: -0.9 }
  ];

  const majorIndices = [
    { name: 'NSE 20', value: 1847.23, change: 1.2, isPositive: true },
    { name: 'NSE 25', value: 3542.87, change: 0.8, isPositive: true },
    { name: 'All Share', value: 112.45, change: -0.3, isPositive: false },
    { name: 'S&P 500', value: 4532.76, change: 0.5, isPositive: true }
  ];

  return (
    <div className="markets">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Markets</h1>
          <p>Global market overview</p>
        </div>
        <div className="header-right">
          <div className="header-icon">🔍</div>
          <div className="header-icon">🔔</div>
        </div>
      </div>

      {/* AI Quick Take */}
      <div className="ai-section">
        <h2>⚡ AI Quick Take</h2>
        <p>Markets showing positive momentum today with banking sector leading gains. NSE 20 up 1.2% driven by strong earnings reports from major institutions.</p>
      </div>

      {/* Market Tabs */}
      <div className="market-tabs">
        {marketTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Market Sections */}
      <div className="market-sections">
        {/* Top Gainers */}
        <div className="market-section">
          <div className="section-header">
            <h3 className="section-title">📈 Top Gainers</h3>
            <a href="#" className="view-all">View All</a>
          </div>
          <div className="stock-list">
            {topGainers.map((stock) => (
              <div key={stock.symbol} className="stock-item">
                <div className="stock-info">
                  <h4>{stock.symbol}</h4>
                  <p>{stock.name}</p>
                </div>
                <div className="stock-price">
                  <div className="price">KES {stock.price.toFixed(2)}</div>
                  <div className="change positive">+{stock.change.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="market-section">
          <div className="section-header">
            <h3 className="section-title">📉 Top Losers</h3>
            <a href="#" className="view-all">View All</a>
          </div>
          <div className="stock-list">
            {topLosers.map((stock) => (
              <div key={stock.symbol} className="stock-item">
                <div className="stock-info">
                  <h4>{stock.symbol}</h4>
                  <p>{stock.name}</p>
                </div>
                <div className="stock-price">
                  <div className="price">KES {stock.price.toFixed(2)}</div>
                  <div className="change negative">{stock.change.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Major Indices */}
      <div className="indices-section">
        <h3>Major Indices</h3>
        <div className="indices-list">
          {majorIndices.map((index, i) => (
            <div key={i} className="index-item">
              <div className="index-info">
                <h4>{index.name}</h4>
                <div className="value">{index.value.toFixed(2)}</div>
              </div>
              <div className="index-change">
                <span className={`change-icon ${index.isPositive ? 'positive' : 'negative'}`}>
                  {index.isPositive ? '📈' : '📉'}
                </span>
                <span className={`change-text ${index.isPositive ? 'positive' : 'negative'}`}>
                  {index.isPositive ? '+' : ''}{index.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Markets;