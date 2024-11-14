// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PlayerActions.css';

const PlayerActions = ({ player, onBuyProperty, onSellProperty, onEndTurn }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [action, setAction] = useState('');

  // Handle buying a property
  const handleBuyProperty = () => {
    if (selectedProperty && player.money >= selectedProperty.value) {
      onBuyProperty(selectedProperty);
      setAction('buy');
    } else {
      alert('Not enough money to buy this property or no property selected!');
    }
  };

  // Handle selling a property
  const handleSellProperty = () => {
    if (selectedProperty && player.properties.includes(selectedProperty)) {
      onSellProperty(selectedProperty);
      setAction('sell');
    } else {
      alert('You do not own this property or no property selected!');
    }
  };

  // Handle end of turn
  const handleEndTurn = () => {
    onEndTurn(player);
  };

  // Render buttons based on the selected action
  const renderActionButtons = () => {
    if (action === 'buy') {
      return <button onClick={handleBuyProperty} className="action-btn buy-btn">Buy Property</button>;
    }
    if (action === 'sell') {
      return <button onClick={handleSellProperty} className="action-btn sell-btn">Sell Property</button>;
    }
    return (
      <div>
        <button onClick={handleBuyProperty} className="action-btn buy-btn">Buy Property</button>
        <button onClick={handleSellProperty} className="action-btn sell-btn">Sell Property</button>
      </div>
    );
  };

  return (
    <div className="player-actions-container">
      <h2>Actions for {player.name}</h2>

      {/* Select property to interact with */}
      <div className="property-selection">
        <h3>Select Property</h3>
        <select
          onChange={(e) => setSelectedProperty(JSON.parse(e.target.value))}
          value={selectedProperty ? JSON.stringify(selectedProperty) : ''}
        >
          <option value="">-- Select a Property --</option>
          {player.properties.map((property, index) => (
            <option key={index} value={JSON.stringify(property)}>
              {property.name} - ${property.value}
            </option>
          ))}
        </select>
      </div>

      {/* Display action buttons */}
      <div className="action-buttons">
        {renderActionButtons()}
      </div>

      {/* End turn button */}
      <div className="end-turn">
        <button onClick={handleEndTurn} className="action-btn end-turn-btn">
          End Turn
        </button>
      </div>
    </div>
  );
};

// Prop validation
PlayerActions.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onBuyProperty: PropTypes.func.isRequired,
  onSellProperty: PropTypes.func.isRequired,
  onEndTurn: PropTypes.func.isRequired,
};

export default PlayerActions;
