// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './PortfolioItem.css'; // Import corresponding CSS file for styling

const PortfolioItem = ({ item, onViewDetails, onRemoveItem }) => {
  // Handle the action to view the details of the portfolio item
  const handleViewDetails = () => {
    onViewDetails(item); // Pass the item to the parent for further actions
  };

  // Handle the action to remove the portfolio item
  const handleRemoveItem = () => {
    onRemoveItem(item); // Pass the item to the parent for removal
  };

  return (
    <div className="portfolio-item">
      <h3 className="portfolio-item-name">{item.name}</h3>
      <p className="portfolio-item-value">Value: ${item.value}</p>

      {/* Action buttons to view details or remove the item */}
      <div className="portfolio-item-actions">
        <button onClick={handleViewDetails} className="btn view-btn">
          View Details
        </button>
        <button onClick={handleRemoveItem} className="btn remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
};

// Prop validation
PortfolioItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default PortfolioItem;
