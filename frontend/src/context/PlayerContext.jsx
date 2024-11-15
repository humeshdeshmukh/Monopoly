// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for validation

// Create the PlayerContext to manage player-related state
const PlayerContext = createContext();

// A custom hook to use the PlayerContext
export const usePlayer = () => useContext(PlayerContext);

// A provider component to wrap your app and provide player state
export const PlayerProvider = ({ children }) => {
  // Initial player state
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', properties: [], cash: 1500, position: 0 },
    { id: 2, name: 'Player 2', properties: [], cash: 1500, position: 0 },
  ]);

  // Function to update the current player's cash
  const updateCash = (playerId, amount) => {
    setPlayers((prevPlayers) => 
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, cash: player.cash + amount }
          : player
      )
    );
  };

  // Function to add a property to the player's portfolio
  const buyProperty = (playerId, property) => {
    setPlayers((prevPlayers) => 
      prevPlayers.map(player =>
        player.id === playerId
          ? {
              ...player,
              properties: [...player.properties, property],
              cash: player.cash - property.value,
            }
          : player
      )
    );
  };

  // Function to move the player on the game board
  const movePlayer = (playerId, spaces) => {
    setPlayers((prevPlayers) => 
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, position: (player.position + spaces) % 40 }  // Assuming 40 spaces on the board
          : player
      )
    );
  };

  // Function to set the player's properties (e.g., when the game restarts)
  const setPlayerProperties = (playerId, properties) => {
    setPlayers((prevPlayers) => 
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, properties }
          : player
      )
    );
  };

  // Function to set the player's cash (e.g., when the game restarts)
  const setPlayerCash = (playerId, cash) => {
    setPlayers((prevPlayers) => 
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, cash }
          : player
      )
    );
  };

  // Provide the player state and actions through context
  return (
    <PlayerContext.Provider
      value={{
        players,
        updateCash,
        buyProperty,
        movePlayer,
        setPlayerProperties,
        setPlayerCash,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Add PropTypes validation for children
PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Explicitly export PlayerContext to be used in other components
export { PlayerContext };
