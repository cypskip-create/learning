import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';
import TradingModel from './TradingModel';
import './StockDetail.css';

const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { getStock, portfolio, watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const stock = symbol ? getStock(symbol) : null;
  const holding = stock ? portfolio.find(p => p.symbol === stock.symbol) : null;
  const isInWatchlist = stock ? watchlist.includes(stock.symbol) : false;

  if (!stock) {
    return (
      <div className="stock-detail">
        <div className="error-message">
          <h2>Stock not found</h2>
          <button onClick={() => navigate('/markets')} className="btn-back">
            Back to Markets
          </button>
        </div>
      </div>
    );
  }

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  // Generate mock historical data for chart
  const generateChartData = () => {
    const data = [];
    let price = stock.price;
    for (let i = 30; i >= 0; i--) {
      price = price + (Math.random() - 0.5) * 2;
      data.push({ day: i, price: price });
    }
    return data.reverse();
  };

  const chartData = generateChartData();
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));

  return (
    <div className="stock-detail">
      {/* Header */}
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button 
          className={`watchlist-btn ${isInWatchlist ? 'active' : ''}`}
          onClick={handleWatchlist}
        >
          {isInWatchlist ? '💚 In Watchlist' : '🤍 Add to Watchlist'}
        </button>
      </div>

      {/* Stock Info */}
      <div className="stock-header">
        <div className="stock-title">
          <h1>{stock.symbol}</h1>
          <p>{stock.name}</p>
        </div>
        <div className="stock-price-section">
          <div className="current-price">KES {stock.price.toFixed(2)}</div>
          <div className={`price-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <h3>30-Day Price Chart</h3>
        <div className="chart-container">
          <svg width="100%" height="200" viewBox="0 0 600 200">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={stock.change >= 0 ? '#00ff88' : '#ff6b6b'} stopOpacity="0.3" />
                <stop offset="100%" stopColor={stock.change >= 0 ? '#00ff88' : '#ff6b6b'} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area fill */}
            <path
              d={`M 0 ${200 - ((chartData[0].price - minPrice) / (maxPrice - minPrice)) * 180}
                  ${chartData.map((point, i) => 
                    `L ${(i / (chartData.length - 1)) * 600} ${200 - ((point.price - minPrice) / (maxPrice - minPrice)) * 180}`
                  ).join(' ')}
                  L 600 200 L 0 200 Z`}
              fill="url(#chartGradient)"
            />
            
            {/* Line */}
            <path
              d={`M 0 ${200 - ((chartData[0].price - minPrice) / (maxPrice - minPrice)) * 180}
                  ${chartData.map((point, i) => 
                    `L ${(i / (chartData.length - 1)) * 600} ${200 - ((point.price - minPrice) / (maxPrice - minPrice)) * 180}`
                  ).join(' ')}`}
              stroke={stock.change >= 0 ? '#00ff88' : '#ff6b6b'}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <button 
          className={`detail-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`detail-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={`detail-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Open</span>
                <span className="info-value">KES {(stock.price - 0.5).toFixed(2)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">High</span>
                <span className="info-value">KES {(stock.price + 1.2).toFixed(2)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Low</span>
                <span className="info-value">KES {(stock.price - 0.8).toFixed(2)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Volume</span>
                <span className="info-value">{(Math.random() * 1000000).toFixed(0)}</span>
              </div>
            </div>

            {holding && (
              <div className="your-position">
                <h3>Your Position</h3>
                <div className="position-details">
                  <div className="position-row">
                    <span>Shares owned:</span>
                    <span className="position-value">{holding.shares}</span>
                  </div>
                  <div className="position-row">
                    <span>Average cost:</span>
                    <span className="position-value">KES {holding.buyPrice.toFixed(2)}</span>
                  </div>
                  <div className="position-row">
                    <span>Current value:</span>
                    <span className="position-value">KES {(stock.price * holding.shares).toFixed(2)}</span>
                  </div>
                  <div className="position-row">
                    <span>Total P&L:</span>
                    <span className={`position-value ${(stock.price - holding.buyPrice) >= 0 ? 'positive' : 'negative'}`}>
                      {((stock.price - holding.buyPrice) * holding.shares).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-content">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">KES {(Math.random() * 100 + 50).toFixed(2)}B</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">P/E Ratio</span>
                <span className="stat-value">{(Math.random() * 20 + 5).toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">52 Week High</span>
                <span className="stat-value">KES {(stock.price * 1.3).toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">52 Week Low</span>
                <span className="stat-value">KES {(stock.price * 0.7).toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dividend Yield</span>
                <span className="stat-value">{(Math.random() * 5).toFixed(2)}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Beta</span>
                <span className="stat-value">{(Math.random() * 2).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-content">
            <h3>About {stock.name}</h3>
            <p>
              {stock.name} is a leading company listed on the Nairobi Securities Exchange (NSE). 
              The company operates in the Kenyan market and is known for its strong performance 
              and solid fundamentals.
            </p>
            <div className="company-info">
              <div className="info-row">
                <span className="info-label">CEO:</span>
                <span>John Doe</span>
              </div>
              <div className="info-row">
                <span className="info-label">Founded:</span>
                <span>1990</span>
              </div>
              <div className="info-row">
                <span className="info-label">Employees:</span>
                <span>{(Math.random() * 10000 + 1000).toFixed(0)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Headquarters:</span>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-fixed">
        <button 
          className="action-btn buy-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Buy {stock.symbol}
        </button>
        {holding && (
          <button 
            className="action-btn sell-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Sell {stock.symbol}
          </button>
        )}
      </div>

      {/* Trading Modal */}
      <TradingModel
        stock={stock}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StockDetail;