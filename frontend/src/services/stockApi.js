import axios from 'axios';

// Define the base URL for the stock API (replace with your actual endpoint)
const API_BASE_URL = 'https://yourapi.com/api/stock';

// Function to get all available stocks
export const getStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data; // Return stock data
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error; // Rethrow error to handle it elsewhere
  }
};

// Function to get the details of a specific stock by its ID
export const getStockById = async (stockId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/details/${stockId}`);
    return response.data; // Return the specific stock data
  } catch (error) {
    console.error(`Error fetching stock with ID ${stockId}:`, error);
    throw error;
  }
};

// Function to buy stocks (player purchasing stock in the game)
export const buyStock = async (playerId, stockId, quantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/buy`, {
      playerId,
      stockId,
      quantity,
    });
    return response.data; // Return response with updated player or stock info
  } catch (error) {
    console.error('Error buying stock:', error);
    throw error;
  }
};

// Function to sell stocks (player selling stock in the game)
export const sellStock = async (playerId, stockId, quantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sell`, {
      playerId,
      stockId,
      quantity,
    });
    return response.data; // Return response with updated player or stock info
  } catch (error) {
    console.error('Error selling stock:', error);
    throw error;
  }
};

// Function to get the latest stock prices
export const getStockPrices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prices`);
    return response.data; // Return stock prices
  } catch (error) {
    console.error('Error fetching stock prices:', error);
    throw error;
  }
};

// Function to update stock prices (could be used when prices fluctuate in the game)
export const updateStockPrice = async (stockId, newPrice) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, {
      stockId,
      newPrice,
    });
    return response.data; // Return response with updated stock price
  } catch (error) {
    console.error(`Error updating stock price for stock ${stockId}:`, error);
    throw error;
  }
};
