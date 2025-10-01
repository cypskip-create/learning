import React from 'react';
import { useAppContext } from './AppContext';
import './Portfolio.css';

const Portfolio = () => {
  const { portfolio, stocks, getStock, getPortfolioValue } = useAppContext();

  const totalValue = getPortfolioValue();
  
  // Calculate gains
  type Holding = {
    symbol: string;
    shares: number;
    buyPrice: number;
  };

  const calculateGain = (holding: Holding) => {
    const stock = getStock(holding.symbol);
    if (!stock) return { gain: 0, gainPercent: 0 };
    
    const currentValue = stock.price * holding.shares;
    const costBasis = holding.buyPrice * holding.shares;
    const gain = currentValue - costBasis;
    const gainPercent = (gain / costBasis) * 100;
    
    return { gain, gainPercent };
  };

  const totalGain = portfolio.reduce((sum, holding) => {
    const { gain } = calculateGain(holding);
    return sum + gain;
  }, 0);

  const totalGainPercent = totalValue > 0 ? (totalGain / (totalValue - totalGain)) * 100 : 0;

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
        <div className={`value-change ${totalGain >= 0 ? 'positive' : 'negative'}`}>
          {totalGain >= 0 ? '+' : ''}KES {Math.abs(totalGain).toFixed(0).toLocaleString()} ({totalGainPercent.toFixed(1)}%)
        </div>
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
          {portfolio.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
              No holdings yet. Start trading to build your portfolio!
            </p>
          ) : (
            portfolio.map((holding, index) => {
              const stock = getStock(holding.symbol);
              const { gain, gainPercent } = calculateGain(holding);
              const currentValue = stock ? stock.price * holding.shares : 0;

              return (
                <div key={index} className="holding-item">
                  <div className="holding-info">
                    <h4>{holding.symbol}</h4>
                    <p>{stock?.name}</p>
                  </div>
                  <div className="holding-details">
                    <div className="holding-value">KES {currentValue.toLocaleString()}</div>
                    <div className="holding-stats">
                      <div className={`holding-change ${gain >= 0 ? 'positive' : 'negative'}`}>
                        {gain >= 0 ? '+' : ''}{gainPercent.toFixed(1)}%
                      </div>
                      <div className="holding-avg">
                        {holding.shares} shares • Avg: KES {holding.buyPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;