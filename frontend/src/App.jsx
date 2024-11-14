import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Board from './components/Board/Board';
import ActionButtons from './components/Controls/ActionButtons';
import DiceRoll from './components/Controls/DiceRoll';
import EndTurnButton from './components/Controls/EndTurnButton';
import FinancialDashboard from './components/Dashboard/FinancialDashboard';
import EventList from './components/Events/EventList';
import InvestmentChart from './components/Investment/InvestmentChart';
import PlayerCard from './components/Player/PlayerCard';
import Modal from './components/UI/Modal';

function App() {
  // State management
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [diceRollResult, setDiceRollResult] = useState(null);
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    // Simulate fetching events data (can replace with API calls)
    setEvents([
      { id: 1, title: 'Tax Day', description: 'Pay your taxes!' },
      { id: 2, title: 'Invest in Property', description: 'Buy a new property.' },
    ]);
  }, []);

  // Function to handle dice roll
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRollResult(roll);
  };

  // Function to handle tile selection
  const handleTileSelection = (tile) => {
    setSelectedTile(tile);
    setOpenModal(true); // Open modal with tile details
  };

  // Function to handle turn ending
  const endTurn = () => {
    setCurrentPlayer((prev) => (prev === 'Player 1' ? 'Player 2' : 'Player 1'));
  };

  return (
    <div className="App">
      {/* Game Header */}
      <header>
        <h1>Monopoly Game</h1>
        <p>Current Player: {currentPlayer || 'Player 1'}</p>
      </header>

      {/* Game Board */}
      <Board onTileClick={handleTileSelection} />

      {/* Game Controls */}
      <div className="controls">
        <DiceRoll rollDice={rollDice} />
        <ActionButtons />
        <EndTurnButton endTurn={endTurn} />
      </div>

      {/* Player Dashboard */}
      <div className="dashboard">
        <PlayerCard player={currentPlayer} />
        <FinancialDashboard />
        <InvestmentChart />
      </div>

      {/* Events */}
      <div className="events">
        <EventList events={events} />
      </div>

      {/* Tile Details Modal */}
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <h2>Tile Details</h2>
          <p>{selectedTile ? selectedTile.details : 'No details available.'}</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
