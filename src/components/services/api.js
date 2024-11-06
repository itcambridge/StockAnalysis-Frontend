const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    const hostname = window.location.hostname;
    const projectId = hostname.split('-')[0];
    return `https://${projectId}.repl.co`;
  }
  return process.env.REACT_APP_API_URL || '';
};

export const analyzeStock = async (symbol) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/analyze/${symbol}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Error handling and response processing
    return await response.json();
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
};

export const loadPortfolio = async (token) => {
  // Fetches user's portfolio
};

export const addToPortfolio = async (token, stockData) => {
  // Adds a stock to portfolio
};

export const removeFromPortfolio = async (token, index) => {
  // Removes a stock from portfolio
}; 