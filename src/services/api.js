export const getBaseUrl = () => {
  return "https://51312610-ba77-404b-9074-d0d526465186-00-1a29wwrcd8an6.riker.replit.dev:5000";
};

export const analyzeStock = async (symbol) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/analyze/${symbol}`;
    console.log('Making request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
};

export const loadPortfolio = async (token) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/portfolio`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading portfolio:', error);
    throw error;
  }
};

export const addToPortfolio = async (token, stockData) => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/portfolio/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockData)
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    throw error;
  }
};

export const removeFromPortfolio = async (token, index) => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/portfolio/remove`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index })
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing from portfolio:', error);
    throw error;
  }
}; 