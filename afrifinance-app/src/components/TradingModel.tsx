import React, { useState } from 'react';
import { useAppContext } from '../components/AppContext';
import { Stock } from '../types';
import './TradingModel.css';

interface TradingModelProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
}

const TradingModel: React.FC<TradingModelProps> = ({ stock, isOpen, onClose }) => {
  const { buyStock, sellStock, userBalance, portfolio } = useAppContext();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [shares, setShares] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen || !stock) return null;

  const holding = portfolio.find(p => p.symbol === stock.symbol);
  const sharesOwned = holding?.shares || 0;
  const totalCost = parseFloat(shares || '0') * stock.price;
  const canAfford = totalCost <= userBalance;
  const canSell = tradeType === 'sell' && sharesOwned >= parseFloat(shares || '0');

  const handleTrade = () => {
    const numShares = parseFloat(shares);
    
    if (!numShares || numShares <= 0) {
      setNotification({ message: 'Please enter a valid number of shares', type: 'error' });
      return;
    }

    let result;
    if (tradeType === 'buy') {
      result = buyStock(stock.symbol, numShares, stock.price);
    } else {
      result = sellStock(stock.symbol, numShares, stock.price);
    }

    setNotification({ 
      message: result.message, 
      type: result.success ? 'success' : 'error' 
    });

    if (result.success) {
      setShares('');
      setTimeout(() => {
        onClose();
        setNotification(null);
      }, 2000);
    }
  };

  const handleClose = () => {
    setShares('');
    setNotification(null);
    onClose();
  };

  return (
    <div className="model-overlay" onClick={handleClose}>
      <div className="model-content" onClick={(e) => e.stopPropagation()}>
        <div className="model-header">
          <h2>Trade {stock.symbol}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="stock-info-model">
          <h3>{stock.name}</h3>
          <div className="current-price-model">
            <span className="price-label">Current Price:</span>
            <span className="price-value">KES {stock.price.toFixed(2)}</span>
          </div>
          <div className={`price-change-model ${stock.change >= 0 ? 'positive' : 'negative'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
        </div>

        <div className="trade-type-selector">
          <button
            className={`type-btn ${tradeType === 'buy' ? 'active buy' : ''}`}
            onClick={() => setTradeType('buy')}
          >
            BUY
          </button>
          <button
            className={`type-btn ${tradeType === 'sell' ? 'active sell' : ''}`}
            onClick={() => setTradeType('sell')}
          >
            SELL
          </button>
        </div>

        <div className="form-section">
          <label>Number of Shares</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            placeholder="Enter shares"
            min="1"
          />
          {tradeType === 'sell' && (
            <div className="shares-owned">You own: {sharesOwned} shares</div>
          )}
        </div>

        <div className="trade-summary">
          <div className="summary-row">
            <span>Price per share:</span>
            <span>KES {stock.price.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Total {tradeType === 'buy' ? 'cost' : 'proceeds'}:</span>
            <span className="total-amount">KES {totalCost.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Available balance:</span>
            <span>KES {userBalance.toFixed(2)}</span>
          </div>
        </div>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <button
          className={`execute-trade-btn ${tradeType === 'buy' ? 'buy-btn' : 'sell-btn'}`}
          onClick={handleTrade}
          disabled={
            !shares || 
            parseFloat(shares) <= 0 || 
            (tradeType === 'buy' && !canAfford) ||
            (tradeType === 'sell' && !canSell)
          }
        >
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {shares || '0'} Shares
        </button>
      </div>
    </div>
  );
};

export default TradingModel;