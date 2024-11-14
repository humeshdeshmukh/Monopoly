// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './PortfolioSummary.css'; // Import CSS for styling

const PortfolioSummary = ({ player, totalValue }) => {
  return (
    <div className="portfolio-summary">
      <h2>{player.name}&apos;s Portfolio Summary</h2>
      <div className="portfolio-details">
        <p><strong>Total Properties:</strong> {player.properties.length}</p>
        <p><strong>Total Value:</strong> ${totalValue}</p>
        <div className="actions">
          <button onClick={() => alert("Viewing more details...")}>View Details</button>
        </div>
      </div>
    </div>
  );
};

// Prop validation for the PortfolioSummary component
PortfolioSummary.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default PortfolioSummary;
