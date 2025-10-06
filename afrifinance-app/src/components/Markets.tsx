import React, { useState } from 'react';
import { useAppContext } from '../components/AppContext';
import { Stock } from '../types';
import { useNavigate } from 'react-router-dom';
import TradingModel from './TradingModel';
import './Markets.css';

  

const Markets: React.FC = () => {
  const { stocks, refreshStockData, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('stocks');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const topGainers = [...stocks]
    .filter(s => s.change > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);

  const topLosers = [...stocks]
    .filter(s => s.change < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  const handleStockClick = (stock: Stock) => {
    navigate(`/stock/${stock.symbol}`);
  };


  const marketTabs = [
    { id: 'stocks', icon: '📈', label: 'Stocks' },
    { id: 'crypto', icon: '₿', label: 'Crypto' },
    { id: 'etfs', icon: '📊', label: 'ETFs' },
    { id: 'options', icon: '📋', label: 'Options' },
    { id: 'commodities', icon: '🏗', label: 'Commodities' },
    { id: 'bonds', icon: '🏦', label: 'Bonds' }
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
          
        </div>
        <div className="header-right">
    <button 
      onClick={refreshStockData} 
      disabled={isLoading}
      style={{ 
        background: '#00ff88', 
        border: 'none', 
        padding: '8px 16px', 
        borderRadius: '8px',
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
    >
      {isLoading ? '🔄 Refreshing...' : '🔄 Refresh'}
    </button>
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
        {marketTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >{tab.icon} {tab.label}
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
            {topGainers.map((stock, index) => (
              <div
                key={index}
                className="stock-item clickable"
                onClick={() => handleStockClick(stock)}
              >
                <div className='stock-info'>
                  <h4>{stock.symbol}</h4>
                  <p>{stock.name}</p>
                </div>
                <div className='stock-price'>
                  <div className='price'>KES {stock.price.toFixed(2)}</div>
                  <div className='change positive'>+{stock.changePercent.toFixed(2)}%</div>
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
            {topLosers.map((stock, index) => (
              <div
                key={index}
                className="stock-item clickable"
                onClick={() => handleStockClick(stock)}
              >
                <div className='stock-info'>
                  <h4>{stock.symbol}</h4>
                  <p>{stock.name}</p>
                </div>
                <div className='stock-price'>
                  <div className='price'>KES {stock.price.toFixed(2)}</div>
                  <div className='change negative'>{stock.changePercent.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Model */}
      {selectedStock &&(
      <TradingModel
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      )}
    </div>
  );
};
         

export default Markets;