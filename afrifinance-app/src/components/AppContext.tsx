import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Stock, PortfolioHolding, TradeResult, AppContextType } from '../types';
import { stockApi } from '../services/stockApi'; 

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'SAFCOM', name: 'Safaricom PLC', price: 26.80, change: 1.20, changePercent: 4.69 },
    { symbol: 'EQTY', name: 'Equity Group', price: 45.50, change: 2.30, changePercent: 5.33 },
    { symbol: 'KCB', name: 'KCB Group', price: 42.25, change: -0.75, changePercent: -1.74 },
    { symbol: 'COOP', name: 'Co-operative Bank', price: 14.30, change: -0.20, changePercent: -1.38 },
    { symbol: 'ABSA', name: 'Absa Bank Kenya', price: 11.95, change: 0.45, changePercent: 3.91 },
    { symbol: 'BAMB', name: 'Bamburi Cement', price: 18.75, change: 0.85, changePercent: 4.75 },
    { symbol: 'SCBK', name: 'Standard Chartered', price: 185.00, change: 5.70, changePercent: 5.7 }
  ]);

  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([
    { symbol: 'SAFCOM', shares: 1000, buyPrice: 11.50 },
    { symbol: 'EQTY', shares: 500, buyPrice: 54.20 },
    { symbol: 'KCB', shares: 400, buyPrice: 42.15 }
  ]);

  const [watchlist, setWatchlist] = useState<string[]>(['SAFCOM', 'EQTY']);
  const [userBalance, setUserBalance] = useState<number>(50000);

  // ✅ Add this
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Function to refresh stock data from API
  const refreshStockData = async () => {
    setIsLoading(true);
    try {
      const symbols = stocks.map(s => s.symbol);
      const updatedStocks = await stockApi.getMultipleQuotes(symbols);

      if (updatedStocks.length > 0) {
        setStocks(updatedStocks);
      }
    } catch (error) {
      console.error('Error refreshing stock data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = (symbol: string): void => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = (symbol: string): void => {
    setWatchlist(watchlist.filter(s => s !== symbol));
  };

  const buyStock = (symbol: string, shares: number, price: number): TradeResult => {
    const total = shares * price;
    if (total > userBalance) {
      return { success: false, message: 'Insufficient balance' };
    }

    setUserBalance(userBalance - total);

    const existingHolding = portfolio.find(p => p.symbol === symbol);
    if (existingHolding) {
      const totalShares = existingHolding.shares + shares;
      const totalCost = (existingHolding.shares * existingHolding.buyPrice) + total;
      const newAvgPrice = totalCost / totalShares;

      setPortfolio(portfolio.map(p => 
        p.symbol === symbol 
          ? { ...p, shares: totalShares, buyPrice: newAvgPrice }
          : p
      ));
    } else {
      setPortfolio([...portfolio, { symbol, shares, buyPrice: price }]);
    }

    return { success: true, message: `Bought ${shares} shares of ${symbol}` };
  };

  const sellStock = (symbol: string, shares: number, price: number): TradeResult => {
    const holding = portfolio.find(p => p.symbol === symbol);
    if (!holding || holding.shares < shares) {
      return { success: false, message: 'Insufficient shares' };
    }

    const total = shares * price;
    setUserBalance(userBalance + total);

    if (holding.shares === shares) {
      setPortfolio(portfolio.filter(p => p.symbol !== symbol));
    } else {
      setPortfolio(portfolio.map(p =>
        p.symbol === symbol
          ? { ...p, shares: p.shares - shares }
          : p
      ));
    }

    return { success: true, message: `Sold ${shares} shares of ${symbol}` };
  };

  const getStock = (symbol: string): Stock | undefined => {
    return stocks.find(s => s.symbol === symbol);
  };

  const getPortfolioValue = (): number => {
    return portfolio.reduce((total, holding) => {
      const stock = getStock(holding.symbol);
      return total + (stock ? stock.price * holding.shares : 0);
    }, 0);
  };

  // ✅ Add isLoading and refreshStockData to context value
  const value: AppContextType = {
    stocks,
    portfolio,
    watchlist,
    userBalance,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    buyStock,
    sellStock,
    getStock,
    getPortfolioValue,
    refreshStockData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
