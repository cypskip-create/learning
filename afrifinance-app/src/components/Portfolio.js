import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const holdings = [
    {
      symbol: 'SAFCOM',
      name: 'Safaricom',
      value: 12850,
      change: 11.7,
      shares: 1000,
      avgPrice: 11.50
    },
    {
      symbol: 'EQTY',
      name: 'Equity Group',
      value: 31250,
      change: 15.2,
      shares: 500,
      avgPrice: 54.20
    },
    {
      symbol: 'KCB',
      name: 'KCB Group',
      value: 18500,
      change: 8.4,
      shares: 400,
      avgPrice: 42.15
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalGain = 5600;
  const totalGainPercent = 9.8;

  return (
    <div className="portfolio">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Portfolio</h1>
          <p>Track your investments</p>
        </div>
        <div className="header-right">
          <div className="header-icon">📁</div>
        </div>
      </div>

      {/* Portfolio Value */}
      <div className="portfolio-value">
        <div className="total-value">KES {totalValue.toLocaleString()}</div>
        <div className="value-change">+KES {totalGain.toLocaleString()} ({totalGainPercent}%)</div>
        <div className="value-label">Total Portfolio Value</div>
      </div>

      {/* Performance Chart */}
      <div className="performance-section">
        <div className="performance-header">
          <div className="performance-icon">📈</div>
          <h3 className="performance-title">Performance</h3>
        </div>
        <div className="chart-placeholder">
          📊 Portfolio performance chart
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn add-trade-btn">
          ➕ Add Trade
        </button>
        <button className="action-btn sip-calculator-btn">
          📊 SIP Calculator
        </button>
      </div>

      {/* Holdings Section */}
      <div className="holdings-section">
        <div className="holdings-header">
          <div className="holdings-icon">⏱</div>
          <h3 className="holdings-title">Holdings</h3>
        </div>

        <div className="holdings-list">
          {holdings.map((holding, index) => (
            <div key={index} className="holding-item">
              <div className="holding-info">
                <h4>{holding.symbol}</h4>
                <p>{holding.name}</p>
              </div>
              <div className="holding-details">
                <div className="holding-value">KES {holding.value.toLocaleString()}</div>
                <div className="holding-stats">
                  <div className="holding-change positive">+{holding.change}%</div>
                  <div className="holding-avg">
                    {holding.shares} shares • Avg: KES {holding.avgPrice}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;