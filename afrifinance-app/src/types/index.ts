export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PortfolioHolding {
  symbol: string;
  shares: number;
  buyPrice: number;
}

export interface TradeResult {
  success: boolean;
  message: string;
}

export interface AppContextType {
  stocks: Stock[];
  portfolio: PortfolioHolding[];
  watchlist: string[];
  userBalance: number;
  balance:number;
  isLoading: boolean;
  toggleWatchlist: (symbol: string) => void;
  refreshStockData: () => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  buyStock: (symbol: string, shares: number, price: number) => TradeResult;
  sellStock: (symbol: string, shares: number, price: number) => TradeResult;
  getStock: (symbol: string) => Stock | undefined;
  getPortfolioValue: () => number;
  
  }

export interface NewsArticle {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  source: string;
  time: string;
}

export interface Feature {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  stat: string;
  statColor: string;
}

export interface FeedPost {
  avatar: string;
  avatarBg: string;
  username: string;
  badge: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export interface SubscriptionPlan {
  name: string;
  price: string;
  isCurrent: boolean;
  features: string[];
}

export interface SettingsOption {
  title: string;
  description: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  week52High?: number;
  week52Low?: number;
  avgVolume?: number;
  beta?: number;
  eps?: number;
  sector?: string;
  industry?: string;
}

export interface OrderBook {
  bids: { price: number; volume: number }[];
  asks: { price: number; volume: number }[];
}

export interface StockNews {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
}

export interface Financials {
  revenue: number;
  netIncome: number;
  grossProfit: number;
  operatingIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  cashFlow: number;
}