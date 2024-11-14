// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PortfolioItem from './PortfolioItem'; // Import PortfolioItem component
import './PortfolioOverview.css'; // Import CSS file for styling

const PortfolioOverview = ({ player }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Memoize calculateTotalValue to prevent unnecessary re-creations
  const calculateTotalValue = useCallback(() => {
    let total = 0;
    player.properties.forEach((item) => {
      total += item.value; // Assume `value` is a property of each item
    });
    setTotalValue(total);
  }, [player.properties]); // Only recompute when player properties change

  // Handle removing a portfolio item
  const handleRemoveItem = (itemToRemove) => {
    setPortfolioItems(portfolioItems.filter(item => item !== itemToRemove));
    calculateTotalValue(); // Recalculate total value after removal
  };

  // Handle viewing details of a portfolio item
  const handleViewDetails = (item) => {
    // For simplicity, just alerting details
    alert(`Item Details: ${item.name}\nValue: $${item.value}`);
  };

  useEffect(() => {
    setPortfolioItems(player.properties); // Populate the portfolio with the player's properties
    calculateTotalValue(); // Calculate the initial total value
  }, [player, calculateTotalValue]); // Now no warning since the function is memoized

  return (
    <div className="portfolio-overview">
      <h2>{player.name}&apos;s Portfolio</h2>
      <div className="portfolio-summary">
        <h3>Total Value: ${totalValue}</h3>
        <div className="portfolio-items">
          {portfolioItems.length === 0 ? (
            <p>No items in portfolio</p>
          ) : (
            portfolioItems.map((item, index) => (
              <PortfolioItem
                key={index}
                item={item}
                onViewDetails={handleViewDetails}
                onRemoveItem={handleRemoveItem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Prop validation
PortfolioOverview.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PortfolioOverview;
