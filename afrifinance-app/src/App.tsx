import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './components/AppContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

import Auth from './components/Auth';
import Home from './components/Home';
import Markets from './components/Markets';
import News from './components/News';
import Discover from './components/Discover';
import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import Watchlist from './components/Watchlist';
import BottomNavigation from './components/BottomNavigation';
import EnhancedStockDetail from './components/EnhancedStockDetail';

// ✅ Import Search Components
import { SearchProvider } from './components/SearchContext';
import SearchBar from './components/SearchBar';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Authentication route */}
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/markets"
        element={
          <ProtectedRoute>
            <Markets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stock/:symbol"
        element={
          <ProtectedRoute>
            <EnhancedStockDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      />
      <Route
        path="/discover"
        element={
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <SearchProvider>
          <Router>
            <div className="app">
              {/* Global Search Overlay */}
              <SearchBar />

              <div className="container">
                <main className="main-content">
                  <AppRoutes />
                </main>
                <BottomNavigation />
              </div>
            </div>
          </Router>
        </SearchProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
