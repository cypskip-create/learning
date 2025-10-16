import React from "react";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import "./Watchlist.css";

const Watchlist: React.FC = () => {
  const { watchlist, stocks, removeFromWatchlist, toggleWatchlist, getStock } = useAppContext();
  const navigate = useNavigate();

  const watchlistStocks = watchlist
    .map((symbol) => getStock(symbol))
    .filter((stock): stock is NonNullable<typeof stock> => stock !== undefined);

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
         <button className="back-btn" onClick={() => navigate(-1)}>
          ← 
        </button>
        <h2>📋 My Watchlist</h2>
       
      </header>

      {watchlistStocks.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty 😔</p>
          <button className="discover-btn" onClick={() => navigate("/markets")}>
            Discover Stocks →
          </button>
        </div>
      ) : (
        <div className="watchlist-container">
          {watchlistStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="watchlist-item"
              onClick={() => navigate(`/stock/${stock.symbol}`)}
            >
              <div className="stock-info">
                <h3>{stock.symbol}</h3>
                <p>{stock.name}</p>
              </div>

              <div className="stock-details">
                <div className="price">KES {stock.price.toFixed(2)}</div>
                <div
                  className={`change ${
                    stock.change >= 0 ? "positive" : "negative"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(stock.symbol);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
