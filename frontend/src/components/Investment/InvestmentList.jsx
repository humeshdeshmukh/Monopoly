// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './InvestmentList.css'; // Import the CSS file for styling

const InvestmentList = ({ investments, onInvestmentClick }) => {
  // Handle the case when there is no investment data
  if (!investments || investments.length === 0) {
    return <p>No investments available</p>;
  }

  return (
    <div className="investment-list-container">
      <h2>Investment Portfolio</h2>
      <div className="investment-list">
        {investments.map((investment, index) => (
          <div 
            key={index} 
            className="investment-item" 
            onClick={() => onInvestmentClick(investment)}
          >
            <div className="investment-header">
              <span className="investment-date">{investment.date}</span>
              <span className="investment-value">${investment.value.toFixed(2)}</span>
            </div>
            <div className="investment-summary">
              <p><strong>Investment Type:</strong> {investment.type}</p>
              <p><strong>Description:</strong> {investment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
InvestmentList.propTypes = {
  investments: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Date of the investment
      value: PropTypes.number.isRequired, // Investment value
      type: PropTypes.string.isRequired, // Type of the investment
      description: PropTypes.string.isRequired, // Description of the investment
    })
  ).isRequired,
  onInvestmentClick: PropTypes.func.isRequired, // Function to handle investment item click
};

export default InvestmentList;
