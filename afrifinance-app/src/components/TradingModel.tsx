import React, { useState, useEffect } from 'react';
import { useAppContext } from '../components/AppContext';
import { Stock } from '../types';
import './TradingModel.css';

interface TradingModelProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  initialTradeType?: 'buy' | 'sell';
}

const TradingModel: React.FC<TradingModelProps> = ({ stock, isOpen, onClose, initialTradeType = 'buy' }) => {
  const { buyStock, sellStock, portfolio, balance } = useAppContext();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>(initialTradeType);
  const [shares, setShares] = useState<number>(1);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState<string>(stock.price.toFixed(2));
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Update trade type when initialTradeType changes
  useEffect(() => {
    setTradeType(initialTradeType);
  }, [initialTradeType]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setShares(1);
      setOrderType('market');
      setLimitPrice(stock.price.toFixed(2));
      setNotification(null);
    }
  }, [isOpen, stock.price]);

  const holding = portfolio.find(p => p.symbol === stock.symbol);
  const executePrice = orderType === 'market' ? stock.price : parseFloat(limitPrice) || stock.price;
  const totalCost = shares * executePrice;
  const canBuy = totalCost <= balance && shares > 0;
  const canSell = holding && shares <= holding.shares && shares > 0;

  if (!isOpen) return null;

  const handleTrade = () => {
    try {
      if (tradeType === 'buy') {
        if (!canBuy) {
          setNotification({ type: 'error', message: 'Insufficient balance!' });
          return;
        }
        buyStock(stock.symbol, shares, executePrice);
        setNotification({ type: 'success', message: `Successfully bought ${shares} shares of ${stock.symbol}!` });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (tradeType === 'sell') {
        if (!canSell) {
          setNotification({ type: 'error', message: 'Insufficient shares!' });
          return;
        }
        sellStock(stock.symbol, shares, executePrice);
        setNotification({ type: 'success', message: `Successfully sold ${shares} shares of ${stock.symbol}!` });
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Transaction failed. Please try again.' });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSharesChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setShares(numValue);
    }
  };

  return (
    <div className="trading-modal-overlay" onClick={handleOverlayClick}>
      <div className="trading-modal-content">
        <div className="modal-header">
          <h2>{tradeType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Notification */}
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* Stock Info */}
          <div className="price-display">
            <span className="label">{stock.name}</span>
            <span className="value">KES {stock.price.toFixed(2)}</span>
          </div>

          {/* Trade Type Toggle */}
          <div className="trade-type-toggle">
            <button
              className={`toggle-btn ${tradeType === 'buy' ? 'active buy' : ''}`}
              onClick={() => setTradeType('buy')}
            >
              Buy
            </button>
            <button
              className={`toggle-btn ${tradeType === 'sell' ? 'active sell' : ''}`}
              onClick={() => setTradeType('sell')}
              disabled={!holding}
            >
              Sell {!holding && '(No shares)'}
            </button>
          </div>

          {/* Order Type */}
          <div className="order-type-section">
            <label>Order Type</label>
            <div className="order-type-btns">
              <button
                className={`order-type-btn ${orderType === 'market' ? 'active' : ''}`}
                onClick={() => setOrderType('market')}
              >
                Market Order
              </button>
              <button
                className={`order-type-btn ${orderType === 'limit' ? 'active' : ''}`}
                onClick={() => setOrderType('limit')}
              >
                Limit Order
              </button>
            </div>
          </div>

          {/* Limit Price Input (if limit order) */}
          {orderType === 'limit' && (
            <div className="input-group">
              <label>Limit Price (KES)</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
          )}

          {/* Shares Input */}
          <div className="input-group">
            <label>Number of Shares</label>
            <div className="shares-input-wrapper">
              <button
                className="share-btn"
                onClick={() => setShares(Math.max(0, shares - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={shares}
                onChange={(e) => handleSharesChange(e.target.value)}
                min="0"
                max={tradeType === 'sell' && holding ? holding.shares : undefined}
              />
              <button
                className="share-btn"
                onClick={() => setShares(shares + 1)}
              >
                +
              </button>
            </div>
            {tradeType === 'sell' && holding && (
              <span className="available-shares">Available: {holding.shares} shares</span>
            )}
            {tradeType === 'buy' && (
              <span className="available-shares">Available balance: KES {balance.toFixed(2)}</span>
            )}
          </div>

          {/* Total Cost/Proceeds */}
          <div className="total-section">
            <div className="total-row">
              <span>Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}</span>
              <span className="total-value">KES {totalCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Warning Messages */}
          {tradeType === 'buy' && !canBuy && shares > 0 && (
            <div className="warning-message">
              ⚠️ Insufficient balance. You need KES {(totalCost - balance).toFixed(2)} more.
            </div>
          )}

          {tradeType === 'sell' && !canSell && shares > 0 && (
            <div className="warning-message">
              ⚠️ You don't have enough shares. You only have {holding?.shares || 0} shares.
            </div>
          )}

          {shares === 0 && (
            <div className="warning-message">
              ⚠️ Please enter a valid number of shares (minimum 1).
            </div>
          )}

          {/* Action Button */}
          <button
            className={`trade-action-btn ${tradeType}`}
            onClick={handleTrade}
            disabled={
              shares === 0 ||
              (tradeType === 'buy' && !canBuy) ||
              (tradeType === 'sell' && !canSell)
            }
          >
            {tradeType === 'buy' ? '📈 Buy Now' : '📉 Sell Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingModel;