import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { buyProperty } from '../utils/gameUtils';  // Import the buyProperty function

const GameContext = createContext();

export const useGame = () => useContext(GameContext);  // Custom hook for consuming the context

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', properties: [], balance: 1500, position: 0 },
    { id: 2, name: 'Player 2', properties: [], balance: 1500, position: 0 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameBoard, setGameBoard] = useState([
    { name: 'Start', value: 0, owner: null },
    { name: 'Mediterranean Avenue', value: 60, owner: null },
    { name: 'Community Chest', value: 0, owner: null },
    // Add more tiles here
  ]);
  const [gameStatus, setGameStatus] = useState('Not Started');
  const [diceRoll, setDiceRoll] = useState([0, 0]);

  // Function to get the current tile based on the current player's position
  const getCurrentTile = () => {
    const currentPlayer = players[currentPlayerIndex];
    const currentPosition = currentPlayer.position || 0;
    return gameBoard[currentPosition];
  };

  const rollDice = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    setDiceRoll([roll1, roll2]);

    const currentPlayer = players[currentPlayerIndex];
    const currentPosition = currentPlayer.position || 0;
    let newPosition = (currentPosition + roll1 + roll2) % gameBoard.length;

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      position: newPosition,
    };
    setPlayers(updatedPlayers);
  };

  const endTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const startNewGame = () => {
    setPlayers([
      { id: 1, name: 'Player 1', properties: [], balance: 1500, position: 0 },
      { id: 2, name: 'Player 2', properties: [], balance: 1500, position: 0 },
    ]);
    setCurrentPlayerIndex(0);
    setGameBoard([
      { name: 'Start', value: 0, owner: null },
      { name: 'Mediterranean Avenue', value: 60, owner: null },
    ]);
    setGameStatus('In Progress');
  };

  const handleBuyProperty = (propertyIndex) => {
    const currentPlayer = players[currentPlayerIndex];
    buyProperty(propertyIndex, currentPlayer, gameBoard, players, setPlayers, setGameBoard);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        currentPlayerIndex,
        gameBoard,
        gameStatus,
        diceRoll,
        rollDice,
        endTurn,
        startNewGame,
        handleBuyProperty,
        getCurrentTile, // Provide getCurrentTile to the context
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GameContext }; // Explicitly export GameContext
