import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './components/AppContext';
import './App.css';

import Home from './components/Home';
import Markets from './components/Markets';
import News from './components/News';
import Discover from './components/Discover';
import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import StockDetail from './components/StockDetail';
import BottomNavigation from './components/BottomNavigation';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <div className="container">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/markets/:symbol" element={<StockDetail />} />
                <Route path="/news" element={<News />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <BottomNavigation />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;