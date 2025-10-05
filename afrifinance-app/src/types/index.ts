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