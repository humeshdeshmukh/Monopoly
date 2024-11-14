// File Path: D:\my programs\Monopoly game\frontend\src\components\Board\Board.jsx

// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import BoardTile from './BoardTile';
import TileActions from './TileActions';
import TileDetailsModal from './TileDetailsModal';
import { GameContext } from '../../context/GameContext';
import { PortfolioContext } from '../../context/PortfolioContext';
import { PlayerContext } from '../../context/PlayerContext';
import './styles/Board.css';

const Board = () => {
  // eslint-disable-next-line no-unused-vars
  const { tiles, currentPlayer, movePlayer, endTurn, setTileDetails, getCurrentTile } = useContext(GameContext);
  const { addInvestment } = useContext(PortfolioContext);
  const { playerStatus, updatePlayerStatus } = useContext(PlayerContext);
  
  const [selectedTile, setSelectedTile] = useState(null); // State for currently selected tile
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    console.log('Current player:', currentPlayer);
  }, [currentPlayer]);

  // Function to handle when a tile is clicked
  const handleTileClick = (tileId) => {
    const tile = tiles.find((t) => t.id === tileId);
    setSelectedTile(tile);
    setShowModal(true); // Open modal to display tile details
  };

  // Function to handle closing the tile details modal
  const closeModal = () => {
    setSelectedTile(null);
    setShowModal(false);
  };

  // Function to handle investment actions
  const handleInvestment = (investmentType, amount) => {
    // Deduct the investment amount from player's balance and add to portfolio
    if (playerStatus.balance >= amount) {
      addInvestment(investmentType, amount);
      updatePlayerStatus({
        ...playerStatus,
        balance: playerStatus.balance - amount,
        netWorth: playerStatus.netWorth + amount
      });
      alert(`Investment of $${amount} in ${investmentType} successful!`);
    } else {
      alert('Insufficient balance for this investment.');
    }
  };

  return (
    <div className="board-container">
      <h2 className="board-title">Monopoly Investment Game</h2>
      
      {/* Render the board tiles in a grid layout */}
      <div className="board-grid">
        {tiles.map((tile, index) => (
          <BoardTile 
            key={tile.id}
            tile={tile}
            index={index}
            onClick={() => handleTileClick(tile.id)}
          />
        ))}
      </div>

      {/* Tile Actions Component */}
      {selectedTile && (
        <TileActions 
          tile={selectedTile} 
          onInvestment={handleInvestment} 
          playerStatus={playerStatus}
        />
      )}

      {/* Tile Details Modal Component */}
      {showModal && selectedTile && (
        <TileDetailsModal 
          tile={selectedTile} 
          onClose={closeModal}
          onInvestment={handleInvestment}
        />
      )}

      {/* Player Information Display */}
      <div className="player-info">
        <h3>Player: {currentPlayer.name}</h3>
        <p>Current Position: {getCurrentTile()?.name || 'Starting Point'}</p>
        <p>Balance: ${playerStatus.balance.toFixed(2)}</p>
        <p>Net Worth: ${playerStatus.netWorth.toFixed(2)}</p>
        <button onClick={endTurn} className="end-turn-btn">
          End Turn
        </button>
      </div>
    </div>
  );
};

export default Board;
