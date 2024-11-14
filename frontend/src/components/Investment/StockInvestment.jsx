// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StockInvestment.css'; // Import CSS for styling

const StockInvestment = ({ investment, onViewDetails }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle details visibility
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <div className="stock-investment-container">
      <div className="stock-investment-header">
        <h3 className="stock-investment-title">{investment.stockName}</h3>
        <span className="stock-investment-value">
          ${investment.currentValue.toFixed(2)} 
        </span>
      </div>
      <div className="stock-investment-summary">
        <p><strong>Shares Owned:</strong> {investment.sharesOwned}</p>
        <p><strong>Purchase Price:</strong> ${investment.purchasePrice.toFixed(2)}</p>
        <p><strong>Return Rate:</strong> {investment.returnRate}%</p>
      </div>

      {/* Show details button */}
      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      {/* Investment Details */}
      {showDetails && (
        <div className="stock-investment-details">
          <p><strong>Description:</strong> {investment.description}</p>
          <p><strong>Risk Level:</strong> {investment.riskLevel}</p>
          <p><strong>Market Sector:</strong> {investment.marketSector}</p>
          <button className="view-button" onClick={() => onViewDetails(investment)}>
            View Full Details
          </button>
        </div>
      )}
    </div>
  );
};

// Prop validation
StockInvestment.propTypes = {
  investment: PropTypes.shape({
    stockName: PropTypes.string.isRequired, // Stock name
    currentValue: PropTypes.number.isRequired, // Current value of the stock
    sharesOwned: PropTypes.number.isRequired, // Number of shares owned
    purchasePrice: PropTypes.number.isRequired, // Purchase price per share
    returnRate: PropTypes.number.isRequired, // Return rate on the investment
    description: PropTypes.string.isRequired, // Stock description
    riskLevel: PropTypes.string.isRequired, // Risk level (e.g., Low, Medium, High)
    marketSector: PropTypes.string.isRequired, // Market sector the stock belongs to
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired, // Function to handle full investment details view
};

export default StockInvestment;
