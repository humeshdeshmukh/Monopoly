import axios from 'axios';

// Define the base URL for the API (replace with your actual endpoint)
const API_BASE_URL = 'https://yourapi.com/api/events';

// Function to get the list of game events
export const getGameEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data; // Return the event data
  } catch (error) {
    console.error('Error fetching game events:', error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// Function to get events related to a specific player
export const getPlayerEvents = async (playerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching events for player ${playerId}:`, error);
    throw error;
  }
};

// Function to trigger a new event, such as a player action or game state change
export const triggerEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/new`, eventData);
    return response.data; // Return the response from the server (new event info)
  } catch (error) {
    console.error('Error triggering event:', error);
    throw error;
  }
};

// Function to update the game state based on player actions
export const updateGameState = async (gameStateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, gameStateData);
    return response.data;
  } catch (error) {
    console.error('Error updating game state:', error);
    throw error;
  }
};

// Function to delete an event (if needed, for instance, when a round is reset)
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
};
