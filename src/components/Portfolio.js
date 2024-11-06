import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { loadPortfolio, addToPortfolio, removeFromPortfolio, analyzeStock } from '../services/api';
import './Portfolio.css';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPortfolioData = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const data = await loadPortfolio(idToken);
      setPortfolio(data.portfolio || []);
    } catch (error) {
      console.error('Error loading portfolio:', error);
      setError('Failed to load portfolio');
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const addStock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser.getIdToken();
      
      // First, get the stock analysis to get sector info
      const analysisData = await analyzeStock(symbol);
      
      // Then add the stock with sector info
      await addToPortfolio(idToken, { 
        symbol: symbol.toUpperCase(), 
        shares: Number(shares),
        purchasePrice: Number(purchasePrice),
        sector: analysisData.sector,
        industry: analysisData.industry
      });

      await loadPortfolioData();
      setSymbol('');
      setShares('');
      setPurchasePrice('');
    } catch (error) {
      console.error('Error adding stock:', error);
      setError('Failed to add stock to portfolio');
    } finally {
      setLoading(false);
    }
  };

  const removeStock = async (stockIndex) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await removeFromPortfolio(idToken, stockIndex);
      await loadPortfolioData();
    } catch (error) {
      console.error('Error removing stock:', error);
      setError('Failed to remove stock from portfolio');
    }
  };

  return (
    <div className="portfolio">
      <div className="banner-container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 0'
      }}>
        <img 
          src="/backdrop/banner.png"
          alt="Stock Analysis Banner"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
      
      <form onSubmit={addStock} className="add-stock-form">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Stock Symbol"
          required
        />
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          placeholder="Number of Shares"
          required
        />
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          placeholder="Cost"
          step="0.01"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Stock'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="portfolio-header">
        <div className="header-item">Stock</div>
        <div className="header-item">Amount</div>
        <div className="header-item">Cost</div>
        <div className="header-item">Total</div>
        <div className="header-item">Sector</div>
        <div className="header-item">Action</div>
      </div>

      <div className="portfolio-list">
        {portfolio.map((stock, index) => (
          <div key={index} className="portfolio-row">
            <div className="portfolio-cell">{stock.symbol}</div>
            <div className="portfolio-cell">{stock.shares}</div>
            <div className="portfolio-cell">${Number(stock.purchasePrice).toFixed(2)}</div>
            <div className="portfolio-cell">${(Number(stock.shares) * Number(stock.purchasePrice)).toFixed(2)}</div>
            <div className="portfolio-cell">{stock.sector || 'Unknown'}</div>
            <div className="portfolio-cell">
              <button 
                onClick={() => removeStock(index)}
                className="sold-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
