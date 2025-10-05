import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';
import TradingModal from './TradingModel';
import './EnhancedStockDetail.css';

const EnhancedStockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { getStock, portfolio, watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1D');
  const [orderType, setOrderType] = useState('market');

  const stock = symbol ? getStock(symbol) : null;
  const holding = stock ? portfolio.find(p => p.symbol === stock.symbol) : null;
  const isInWatchlist = stock ? watchlist.includes(stock.symbol) : false;

  if (!stock) {
    return (
      <div className="enhanced-stock-detail">
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

  // Mock order book data
  const orderBook = {
    bids: [
      { price: stock.price - 0.05, volume: 15000 },
      { price: stock.price - 0.10, volume: 22000 },
      { price: stock.price - 0.15, volume: 18500 },
      { price: stock.price - 0.20, volume: 30000 },
      { price: stock.price - 0.25, volume: 25000 }
    ],
    asks: [
      { price: stock.price + 0.05, volume: 12000 },
      { price: stock.price + 0.10, volume: 20000 },
      { price: stock.price + 0.15, volume: 16000 },
      { price: stock.price + 0.20, volume: 28000 },
      { price: stock.price + 0.25, volume: 22000 }
    ]
  };

  // Mock key metrics
  const keyMetrics = {
    marketCap: (Math.random() * 100 + 50).toFixed(2) + 'B',
    peRatio: (Math.random() * 20 + 5).toFixed(2),
    eps: (Math.random() * 5).toFixed(2),
    dividendYield: (Math.random() * 5).toFixed(2) + '%',
    week52High: (stock.price * 1.3).toFixed(2),
    week52Low: (stock.price * 0.7).toFixed(2),
    avgVolume: (Math.random() * 1000000).toFixed(0),
    beta: (Math.random() * 2).toFixed(2),
    revenue: (Math.random() * 50 + 10).toFixed(2) + 'B',
    netIncome: (Math.random() * 10 + 2).toFixed(2) + 'B'
  };

  return (
    <div className="enhanced-stock-detail">
      {/* Sticky Header */}
      <div className="sticky-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← 
          </button>
          <div className="stock-mini-info">
            <span className="mini-symbol">{stock.symbol}</span>
            <span className="mini-price">KES {stock.price.toFixed(2)}</span>
            <span className={`mini-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
          <div className="header-actions">
            <button className={`icon-btn ${isInWatchlist ? 'active' : ''}`} onClick={handleWatchlist}>
              {isInWatchlist ? '💚' : '🤍'}
            </button>
            <button className="icon-btn">📊</button>
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⋮</button>
          </div>
        </div>
      </div>

      {/* Main Stock Info */}
      <div className="stock-main-info">
        <div className="stock-header-section">
          <h1 className="stock-symbol">{stock.symbol}</h1>
          <p className="stock-name">{stock.name}</p>
          <div className="stock-tags">
            <span className="tag">NSE</span>
            <span className="tag">Banking</span>
          </div>
        </div>

        <div className="price-section">
          <div className="current-price-large">KES {stock.price.toFixed(2)}</div>
          <div className={`price-change-large ${stock.change >= 0 ? 'positive' : 'negative'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
          <div className="price-time">Market Open • Updated just now</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn buy" onClick={() => setIsModalOpen(true)}>
          <span className="action-icon">📈</span>
          <span>Buy</span>
        </button>
        {holding && (
          <button className="quick-action-btn sell" onClick={() => setIsModalOpen(true)}>
            <span className="action-icon">📉</span>
            <span>Sell</span>
          </button>
        )}
        <button className="quick-action-btn">
          <span className="action-icon">⚡</span>
          <span>Alerts</span>
        </button>
        <button className="quick-action-btn">
          <span className="action-icon">📰</span>
          <span>News</span>
        </button>
      </div>

      {/* Timeframe Selector */}
      <div className="timeframe-selector">
        {['1D', '5D', '1M', '3M', '6M', '1Y', 'ALL'].map(tf => (
          <button
            key={tf}
            className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="chart-placeholder">
        <div className="chart-mock">
          <p>Chart for {timeframe} timeframe</p>
          <p className="chart-hint">Interactive chart would go here</p>
        </div>
      </div>

      {/* Market Depth / Order Book */}
      <div className="market-depth-section">
        <h3 className="section-title">Market Depth</h3>
        <div className="order-book">
          <div className="order-book-header">
            <span>Price (KES)</span>
            <span>Volume</span>
            <span>Total</span>
          </div>
          
          {/* Asks (Sell Orders) */}
          <div className="asks-section">
            {orderBook.asks.reverse().map((ask, idx) => (
              <div key={idx} className="order-row ask">
                <span className="price negative">{ask.price.toFixed(2)}</span>
                <span className="volume">{ask.volume.toLocaleString()}</span>
                <div className="depth-bar ask-bar" style={{ width: `${(ask.volume / 30000) * 100}%` }}></div>
              </div>
            ))}
          </div>

          {/* Spread */}
          <div className="spread-row">
            <span className="spread-label">Spread</span>
            <span className="spread-value">0.10 (0.37%)</span>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="bids-section">
            {orderBook.bids.map((bid, idx) => (
              <div key={idx} className="order-row bid">
                <span className="price positive">{bid.price.toFixed(2)}</span>
                <span className="volume">{bid.volume.toLocaleString()}</span>
                <div className="depth-bar bid-bar" style={{ width: `${(bid.volume / 30000) * 100}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="key-metrics-section">
        <h3 className="section-title">Key Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Market Cap</span>
            <span className="metric-value">{keyMetrics.marketCap}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">P/E Ratio</span>
            <span className="metric-value">{keyMetrics.peRatio}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">EPS</span>
            <span className="metric-value">{keyMetrics.eps}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Dividend Yield</span>
            <span className="metric-value">{keyMetrics.dividendYield}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">52W High</span>
            <span className="metric-value">{keyMetrics.week52High}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">52W Low</span>
            <span className="metric-value">{keyMetrics.week52Low}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Avg Volume</span>
            <span className="metric-value">{keyMetrics.avgVolume}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Beta</span>
            <span className="metric-value">{keyMetrics.beta}</span>
          </div>
        </div>
      </div>

      {/* Detailed Tabs */}
      <div className="detail-tabs-section">
        <div className="detail-tabs">
          {['Overview', 'Financials', 'Analysis', 'News', 'Options'].map(tab => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content-area">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="info-section">
                <h4>Today's Range</h4>
                <div className="range-bar">
                  <span className="range-label">{(stock.price - 0.8).toFixed(2)}</span>
                  <div className="range-slider">
                    <div className="range-fill" style={{ width: '60%' }}></div>
                    <div className="range-marker" style={{ left: '60%' }}></div>
                  </div>
                  <span className="range-label">{(stock.price + 1.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="info-section">
                <h4>52 Week Range</h4>
                <div className="range-bar">
                  <span className="range-label">{keyMetrics.week52Low}</span>
                  <div className="range-slider">
                    <div className="range-fill" style={{ width: '45%' }}></div>
                    <div className="range-marker" style={{ left: '45%' }}></div>
                  </div>
                  <span className="range-label">{keyMetrics.week52High}</span>
                </div>
              </div>

              {holding && (
                <div className="your-position-card">
                  <h4>Your Position</h4>
                  <div className="position-grid">
                    <div className="position-item">
                      <span>Shares</span>
                      <strong>{holding.shares}</strong>
                    </div>
                    <div className="position-item">
                      <span>Avg Cost</span>
                      <strong>{holding.buyPrice.toFixed(2)}</strong>
                    </div>
                    <div className="position-item">
                      <span>Market Value</span>
                      <strong>{(stock.price * holding.shares).toFixed(2)}</strong>
                    </div>
                    <div className="position-item">
                      <span>P&L</span>
                      <strong className={(stock.price - holding.buyPrice) >= 0 ? 'positive' : 'negative'}>
                        {((stock.price - holding.buyPrice) * holding.shares).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="info-section">
                <h4>About {stock.name}</h4>
                <p className="about-text">
                  {stock.name} is a leading company in the Kenyan financial sector, listed on the 
                  Nairobi Securities Exchange. The company has demonstrated consistent growth and 
                  strong market performance.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="financials-tab">
              <div className="financial-grid">
                <div className="financial-card">
                  <h5>Revenue</h5>
                  <p className="financial-value">{keyMetrics.revenue}</p>
                  <span className="financial-growth positive">+12.5% YoY</span>
                </div>
                <div className="financial-card">
                  <h5>Net Income</h5>
                  <p className="financial-value">{keyMetrics.netIncome}</p>
                  <span className="financial-growth positive">+8.3% YoY</span>
                </div>
                <div className="financial-card">
                  <h5>Gross Profit</h5>
                  <p className="financial-value">{(parseFloat(keyMetrics.netIncome) * 1.5).toFixed(2)}B</p>
                  <span className="financial-growth positive">+10.2% YoY</span>
                </div>
                <div className="financial-card">
                  <h5>Operating Income</h5>
                  <p className="financial-value">{(parseFloat(keyMetrics.netIncome) * 1.2).toFixed(2)}B</p>
                  <span className="financial-growth positive">+7.8% YoY</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="analysis-tab">
              <div className="analyst-rating">
                <h4>Analyst Recommendations</h4>
                <div className="rating-bars">
                  <div className="rating-row">
                    <span>Strong Buy</span>
                    <div className="rating-bar">
                      <div className="rating-fill buy" style={{ width: '45%' }}></div>
                    </div>
                    <span>9</span>
                  </div>
                  <div className="rating-row">
                    <span>Buy</span>
                    <div className="rating-bar">
                      <div className="rating-fill buy" style={{ width: '30%' }}></div>
                    </div>
                    <span>6</span>
                  </div>
                  <div className="rating-row">
                    <span>Hold</span>
                    <div className="rating-bar">
                      <div className="rating-fill hold" style={{ width: '20%' }}></div>
                    </div>
                    <span>4</span>
                  </div>
                  <div className="rating-row">
                    <span>Sell</span>
                    <div className="rating-bar">
                      <div className="rating-fill sell" style={{ width: '5%' }}></div>
                    </div>
                    <span>1</span>
                  </div>
                </div>
              </div>

              <div className="price-target">
                <h4>Price Target</h4>
                <div className="target-info">
                  <div className="target-item">
                    <span>Low</span>
                    <strong>{(stock.price * 0.9).toFixed(2)}</strong>
                  </div>
                  <div className="target-item">
                    <span>Average</span>
                    <strong className="positive">{(stock.price * 1.15).toFixed(2)}</strong>
                  </div>
                  <div className="target-item">
                    <span>High</span>
                    <strong>{(stock.price * 1.4).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="news-tab">
              <div className="news-list">
                <div className="news-item-detail">
                  <div className="news-source">Business Daily • 2h ago</div>
                  <h4>{stock.name} Reports Strong Q3 Earnings</h4>
                  <p>Company posts 15% growth in revenue driven by strong market performance...</p>
                </div>
                <div className="news-item-detail">
                  <div className="news-source">Capital FM • 5h ago</div>
                  <h4>Market Analysis: Banking Sector Outlook</h4>
                  <p>Analysts remain bullish on banking sector performance for remainder of year...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trading Modal */}
      <TradingModal
        stock={stock}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default EnhancedStockDetail;