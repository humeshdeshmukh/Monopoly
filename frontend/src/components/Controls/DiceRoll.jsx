// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DiceRoll.css'; // Import the CSS for styling

const DiceRoll = ({ onRoll, currentPlayer }) => {
  // State to track the dice values and whether the dice has been rolled
  const [dice, setDice] = useState({ die1: null, die2: null });
  const [isRolling, setIsRolling] = useState(false);

  // Function to simulate the dice roll
  const rollDice = () => {
    if (isRolling) return; // Prevent rolling while in the middle of an animation

    setIsRolling(true);
    
    // Simulate the dice rolls
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDice({ die1, die2 }); // Update the dice state with rolled values
      setIsRolling(false); // Allow next roll
      onRoll(die1 + die2); // Trigger the onRoll callback with the sum of the dice
    }, 1000); // Simulate a 1-second delay for rolling animation
  };

  return (
    <div className="dice-roll-container">
      <h3 className="dice-roll-header">Roll the Dice, {currentPlayer.name}</h3>

      {/* Dice display */}
      <div className="dice-container">
        <div className={`die die1 ${isRolling ? 'rolling' : ''}`}>{dice.die1 || '?'}</div>
        <div className={`die die2 ${isRolling ? 'rolling' : ''}`}>{dice.die2 || '?'}</div>
      </div>

      {/* Roll button */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`roll-button ${isRolling ? 'rolling' : ''}`}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

// PropTypes for validation
DiceRoll.propTypes = {
  onRoll: PropTypes.func.isRequired, // Function to handle the dice roll result
  currentPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DiceRoll;
