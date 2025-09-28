import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Market from './components/Markets';
import News from './components/News';
import Discover from'./components/Discover';
import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import BottomNavigation from './components/BottomNavigation';

function App(){
  return(
    <Router>
      <div className="app">
        <div className="container">
          <main className="main-content">
            <Routes>
              <Route path="/"element={<Home />} />
              <Route path="/markets" element={<Market />} />
              <Route path="/news" element={<News />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>          
          </main>
          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}

export default App;