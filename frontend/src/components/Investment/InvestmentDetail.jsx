// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './InvestmentDetail.css'; // Import the CSS file for styles

const InvestmentDetail = ({ investmentData }) => {
  // Check if there's any investment data to display
  if (!investmentData || investmentData.length === 0) {
    return <p>No investment data available</p>;
  }

  return (
    <div className="investment-detail-container">
      <h2>Investment Details</h2>
      <div className="investment-list">
        {investmentData.map((item, index) => (
          <div key={index} className="investment-item">
            <div className="investment-date">
              <strong>Date:</strong> {item.date}
            </div>
            <div className="investment-value">
              <strong>Value:</strong> ${item.value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
InvestmentDetail.propTypes = {
  investmentData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Date of the investment entry
      value: PropTypes.number.isRequired, // Value of the investment at that point in time
    })
  ).isRequired,
};

export default InvestmentDetail;
