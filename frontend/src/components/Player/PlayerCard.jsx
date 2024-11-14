// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './PlayerCard.css'; // Import the corresponding CSS file for styling

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <div className="player-card-header">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-money">${player.money}</p>
      </div>

      <div className="player-properties">
        <h4>Properties:</h4>
        <ul>
          {player.properties.length > 0 ? (
            player.properties.map((property, index) => (
              <li key={index} className="property-item">
                {property.name} - ${property.value}
              </li>
            ))
          ) : (
            <li className="no-properties">No Properties</li>
          )}
        </ul>
      </div>

      <div className="player-actions">
        {/* You can add buttons or other actions here, like a "View Details" button */}
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

// Prop validation to ensure the right type of data is passed to the component
PlayerCard.propTypes = {
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

export default PlayerCard;
