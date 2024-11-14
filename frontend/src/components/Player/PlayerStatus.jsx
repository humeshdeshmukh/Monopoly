// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './PlayerStatus.css'; // Import corresponding CSS file for styling

const PlayerStatus = ({ player }) => {
  return (
    <div className="player-status">
      <h2 className="status-header">Player Status</h2>

      <div className="status-info">
        <div className="info-item">
          <h3>Player Name:</h3>
          <p>{player.name}</p>
        </div>

        <div className="info-item">
          <h3>Money:</h3>
          <p>${player.money}</p>
        </div>

        <div className="info-item">
          <h3>Properties Owned:</h3>
          {player.properties.length > 0 ? (
            <ul>
              {player.properties.map((property, index) => (
                <li key={index}>{property.name} - ${property.value}</li>
              ))}
            </ul>
          ) : (
            <p>No properties owned</p>
          )}
        </div>

        <div className="info-item">
          <h3>Total Assets:</h3>
          <p>${calculateTotalAssets(player)}</p>
        </div>
      </div>
    </div>
  );
};

// Calculate the total assets (money + value of properties)
const calculateTotalAssets = (player) => {
  const totalPropertiesValue = player.properties.reduce((total, property) => total + property.value, 0);
  return player.money + totalPropertiesValue;
};

// Prop validation
PlayerStatus.propTypes = {
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
};

export default PlayerStatus;
