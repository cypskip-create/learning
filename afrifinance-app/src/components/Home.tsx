import React, {useState, useEffect} from "react";
import './Home.css';

const Home = () =>{
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <div className="home">
            <div className="header">
                <div className="header-left">
                    <h1>afriFinance</h1>
                    <p>Good morning, Investor</p>
                </div>
                <div className="header-right">
                    <div className="header-icon">🔍</div>
                    <div className="notification-badge">2</div>
                    <div className="header-icon">🔔</div>
                </div>
            </div>
            
            {/* Morning Brief */}
            <div className="morning-brief">
                <div className="brief-header">
                    <h2>📈 Morning Brief</h2>
                    <div className="brief-date">{formatDate(currentTime)}</div>
                </div>
                <div className="brief-content">
                    <div className="brief-item">
                        <h3>📈 NSE up 1.2% as banking sector rallies</h3>
                        <p>Equity Bank leads gains on strong Q3 earnings beat. KES steady at 129.5 vs USD</p>
                    </div>
                    <div className="key-focus">
                        <div className="key-focus-label">Key Focus:</div>
                        <div>EABL earnings call at 2:00 PM EAT, inflation data due Thursday</div>
                    </div>
                </div>
            </div>

            {/* NSE Fund Tracking */}
            <div className="fund-tracking">
                <h2>NSE Fund Tracking</h2>
                <div className="indices-grid">
                    <div className="index-card">
                        <div className="index-name">NSE 20 Index</div>
                        <div className="index-value">1,847.23</div>
                        <div className="index-change positive">↗ +1.2%</div>
                    </div>
                    <div className="index-card">
                        <div className="index-name">NSE 25 Index</div>
                        <div className="index-value">3,542.87</div>
                        <div className="index-change positive">↗ +0.8%</div>
                    </div>
                    <div className="index-card">
                        <div className="index-name">All Share Index</div>
                        <div className="index-value">112.45</div>
                        <div className="index-change negative">📉 -0.3%</div>
                    </div>
                    <div className="index-card">
                        <div className="index-name">FTSE NSE Kenya 15</div>
                        <div className="index-value">1,234.56</div>
                        <div className="index-change positive">↗ +2.1%</div>
                    </div>
                    <div className="index-card">
                        <div className="index-name">NSE Growth Index</div>
                        <div className="index-value">987.32</div>
                        <div className="index-change negative">📉 -1.5%</div>
                    </div>
                </div>
            </div>

            {/* Main Sections */}
            <div className="sections-grid">
                {/* Top Movers */}
                <div className="section">
                    <h3><span className="section-icon">📈</span> Top Movers</h3>
                    <div className="stock-item">
                        <div className="stock-info">
                            <h4>EQTY</h4>
                            <p>Equity Group</p>
                        </div>
                        <div className="stock-price">
                            <div className="price">KES 62.50</div>
                            <div className="change positive">↗ +8.2%</div>
                        </div>
                    </div>
                    <div className="stock-item">
                        <div className="stock-info">
                            <h4>SCBK</h4>
                            <p>Standard Chartered</p>
                        </div>
                        <div className="stock-price">
                            <div className="price">KES 185.00</div>
                            <div className="change positive">↗ +5.7%</div>
                        </div>
                    </div>
                    <div className="stock-item">
                        <div className="stock-info">
                            <h4>SAFCOM</h4>
                            <p>Safaricom</p>
                        </div>
                        <div className="stock-price">
                            <div className="price">KES 12.85</div>
                            <div className="change positive">↗ +4.1%</div>
                        </div>
                    </div>
                </div>
                {/* My Watchlist */}
                <div className="section">
                    <h3><span className="section-icon">💚</span> My Watchlist</h3>
                    <div className="watchlist-summary">
                        <div className="watchlist-card">
                            <h4>📈 Today</h4>
                            <div className="value">+ KES 2,450</div>
                            <div className="change">+3.2%</div>
                        </div>
                        <div className="watchlist-card">
                            <h4>📊 Total</h4>
                            <div className="value">+ KES 18,320</div>
                            <div className="change">+12.7%</div>
                        </div>
                    </div>
                    <div className="stock-item">
                        <div className="stock-info">
                            <h4>SAFCOM</h4>
                        </div>
                        <div className="stock-price">
                            <div className="price">KES 12.85</div>
                            <div className="change positive">+1.18%</div>
                        </div>
                    </div>
                    <div className="stock-item">
                        <div className="stock-info">
                            <h4>EQTY</h4>
                        </div>
                        <div className="stock-price">
                            <div className="price">KES 62.50</div>
                            <div className="change positive">+13.12%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;