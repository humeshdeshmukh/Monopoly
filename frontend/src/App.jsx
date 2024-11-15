import React, { useState, useEffect, useReducer } from 'react';
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

// Reducer function for managing the game state
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, currentPlayer: action.payload };
    case 'ROLL_DICE':
      return { ...state, diceRollResult: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, openModal: action.payload };
    case 'SELECT_TILE':
      return { ...state, selectedTile: action.payload, openModal: true };
    case 'END_TURN':
      return {
        ...state,
        currentPlayer: state.currentPlayer.name === 'Player 1' ? { name: 'Player 2', assets: state.currentPlayer.assets, liabilities: state.currentPlayer.liabilities } : { name: 'Player 1', assets: state.currentPlayer.assets, liabilities: state.currentPlayer.liabilities },
        isTurnEnded: true
      };
    case 'UPDATE_ASSETS':
      return { ...state, currentPlayer: { ...state.currentPlayer, assets: action.payload } };
    case 'UPDATE_LIABILITIES':
      return { ...state, currentPlayer: { ...state.currentPlayer, liabilities: action.payload } };
    default:
      return state;
  }
};

function App() {
  // UseReducer for complex state management
  const [state, dispatch] = useReducer(gameReducer, {
    currentPlayer: { name: 'Player 1', assets: [], liabilities: [] },
    diceRollResult: null,
    events: [],
    openModal: false,
    selectedTile: null,
    isTurnEnded: false,
    investmentData: [],
  });

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_EVENTS', payload: [{ id: 1, title: 'Tax Day', description: 'Pay your taxes!' }, { id: 2, title: 'Invest in Property', description: 'Buy a new property.' }] });
      dispatch({ type: 'SET_INVESTMENT_DATA', payload: [{ year: 2020, investment: 1000 }, { year: 2021, investment: 1500 }, { year: 2022, investment: 2000 }] });
    }, 1000);
  }, []);

  // Function to handle dice roll
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    dispatch({ type: 'ROLL_DICE', payload: roll });
  };

  // Function to handle tile selection
  const handleTileSelection = (tile) => {
    dispatch({ type: 'SELECT_TILE', payload: tile });
  };

  // Function to handle turn ending
  const endTurn = () => {
    dispatch({ type: 'END_TURN' });
  };

  // Action Handlers
  const handleBuy = () => {
    console.log("Buying...");
  };

  const handleSell = () => {
    console.log("Selling...");
  };

  const handlePayRent = () => {
    console.log("Paying rent...");
  };

  const handlePayTax = () => {
    console.log("Paying tax...");
  };

  return (
    <div className="App">
      {/* Game Header */}
      <header>
        <h1>Monopoly Game</h1>
        <p>Current Player: {state.currentPlayer.name}</p>
        {state.diceRollResult && <p>Dice Roll: {state.diceRollResult}</p>}
      </header>

      {/* Game Board */}
      <Board onTileClick={handleTileSelection} />

      {/* Game Controls */}
      <div className="controls">
        <DiceRoll onRoll={rollDice} currentPlayer={state.currentPlayer} />
        <ActionButtons
          onBuy={handleBuy}
          onSell={handleSell}
          onPayRent={handlePayRent}
          onPayTax={handlePayTax}
          tile={state.selectedTile}
          currentPlayer={state.currentPlayer}
        />
        <EndTurnButton onEndTurn={endTurn} currentPlayer={state.currentPlayer} isTurnEnded={state.isTurnEnded} />
      </div>

      {/* Player Dashboard */}
      <div className="dashboard">
        <PlayerCard player={state.currentPlayer} />
        <FinancialDashboard currentPlayer={state.currentPlayer} assets={state.currentPlayer.assets} liabilities={state.currentPlayer.liabilities} />
        <InvestmentChart investmentData={state.investmentData} />
      </div>

      {/* Events */}
      <div className="events">
        <EventList events={state.events} />
      </div>

      {/* Tile Details Modal */}
      {state.openModal && (
        <Modal onClose={() => dispatch({ type: 'TOGGLE_MODAL', payload: false })}>
          <h2>Tile Details</h2>
          <p>{state.selectedTile ? state.selectedTile.details : 'No details available.'}</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
