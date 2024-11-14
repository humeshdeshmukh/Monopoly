// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NetWorthCalculator.css'; // Add appropriate CSS for styling

// eslint-disable-next-line no-unused-vars
const NetWorthCalculator = ({ currentPlayer, assets, liabilities, propertyValue }) => {
  // State to hold calculated net worth and history data
  const [netWorth, setNetWorth] = useState(0);
  const [history, setHistory] = useState([0]);

  // Effect to update net worth based on assets, liabilities, and property value
  useEffect(() => {
    const calculateNetWorth = () => {
      // Calculate the net worth
      const newNetWorth = (assets + propertyValue) - liabilities;
      setNetWorth(newNetWorth);

      // Update the history with the current net worth
      setHistory(prevHistory => [...prevHistory, newNetWorth]);
    };

    // Call the calculate function immediately
    calculateNetWorth();

    // Optionally, we can add logic to simulate changes over time for the demo
    const interval = setInterval(() => {
      // Simulate random changes in assets, liabilities, and property value
      const randomAssetChange = Math.random() * 200 - 100; // Random fluctuation in assets
      const randomLiabilityChange = Math.random() * 100 - 50; // Random fluctuation in liabilities
      const randomPropertyChange = Math.random() * 150 - 75; // Random property value change

      // Update assets, liabilities, and property value with the simulated changes
      const newAssets = assets + randomAssetChange;
      const newLiabilities = liabilities + randomLiabilityChange;
      const newPropertyValue = propertyValue + randomPropertyChange;

      // Call the function to recalculate net worth with the new values
      calculateNetWorth(newAssets, newLiabilities, newPropertyValue);
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [assets, liabilities, propertyValue]); // Recalculate when these props change

  return (
    <div className="net-worth-calculator">
      <h2 className="header">Net Worth Calculator</h2>

      <div className="financial-info">
        {/* Current Player's Net Worth */}
        <div className="info-card">
          <h3>Net Worth</h3>
          <p className="amount">${netWorth.toFixed(2)}</p>
        </div>

        {/* Player's Assets */}
        <div className="info-card">
          <h3>Assets</h3>
          <p className="amount">${assets.toFixed(2)}</p>
        </div>

        {/* Player's Liabilities */}
        <div className="info-card">
          <h3>Liabilities</h3>
          <p className="amount">${liabilities.toFixed(2)}</p>
        </div>

        {/* Player's Property Value */}
        <div className="info-card">
          <h3>Property Value</h3>
          <p className="amount">${propertyValue.toFixed(2)}</p>
        </div>
      </div>

      {/* History of Net Worth Over Time */}
      <div className="history-section">
        <h3>Net Worth History</h3>
        <ul>
          {history.map((netWorth, index) => (
            <li key={index}>Turn {index + 1}: ${netWorth.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// PropTypes for validation
NetWorthCalculator.propTypes = {
  currentPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  assets: PropTypes.number.isRequired,
  liabilities: PropTypes.number.isRequired,
  propertyValue: PropTypes.number.isRequired,
};

export default NetWorthCalculator;
