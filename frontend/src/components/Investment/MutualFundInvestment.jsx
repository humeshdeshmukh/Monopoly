// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MutualFundInvestment.css'; // Import CSS for styling

const MutualFundInvestment = ({ investment, onViewDetails }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle details visibility
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <div className="mutual-fund-investment-container">
      <div className="mutual-fund-header">
        <h3 className="mutual-fund-title">{investment.fundName}</h3>
        <span className="mutual-fund-value">
          ${investment.value.toFixed(2)}
        </span>
      </div>
      <div className="mutual-fund-summary">
        <p><strong>Investment Date:</strong> {investment.date}</p>
        <p><strong>Return Rate:</strong> {investment.returnRate}%</p>
      </div>

      {/* Show details button */}
      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      {/* Investment Details */}
      {showDetails && (
        <div className="mutual-fund-details">
          <p><strong>Description:</strong> {investment.description}</p>
          <p><strong>Risk Level:</strong> {investment.riskLevel}</p>
          <p><strong>Manager:</strong> {investment.manager}</p>
          <button className="view-button" onClick={() => onViewDetails(investment)}>
            View Full Details
          </button>
        </div>
      )}
    </div>
  );
};

// Prop validation
MutualFundInvestment.propTypes = {
  investment: PropTypes.shape({
    fundName: PropTypes.string.isRequired, // Fund name
    value: PropTypes.number.isRequired,    // Investment value
    date: PropTypes.string.isRequired,     // Date of investment
    returnRate: PropTypes.number.isRequired, // Annual return rate
    description: PropTypes.string.isRequired, // Investment description
    riskLevel: PropTypes.string.isRequired,  // Risk level (e.g., Low, Medium, High)
    manager: PropTypes.string.isRequired,    // Fund manager's name
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired, // Function to handle full investment details view
};

export default MutualFundInvestment;
