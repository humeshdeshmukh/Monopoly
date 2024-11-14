// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './EndTurnButton.css'; // Import the CSS for custom styling

const EndTurnButton = ({ onEndTurn, currentPlayer, isTurnEnded }) => {
  return (
    <div className="end-turn-button-container">
      <button
        onClick={onEndTurn}
        disabled={isTurnEnded}
        className={`end-turn-btn ${isTurnEnded ? 'disabled' : ''}`}
      >
        {isTurnEnded ? 'Turn Ended' : `End Turn, ${currentPlayer.name}`}
      </button>
    </div>
  );
};

// PropTypes for validation
EndTurnButton.propTypes = {
  onEndTurn: PropTypes.func.isRequired, // Function to handle the end turn action
  currentPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isTurnEnded: PropTypes.bool.isRequired, // Whether the turn has ended or not
};

export default EndTurnButton;
