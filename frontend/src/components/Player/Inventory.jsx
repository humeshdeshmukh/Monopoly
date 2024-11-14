// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Inventory.css'; // Import CSS for styling

const Inventory = ({ player, onUseItem, onViewItemDetails }) => {
  return (
    <div className="inventory-container">
      <h2 className="inventory-title">{player.name}&apos;s Inventory</h2>

      {/* Display money balance */}
      <div className="inventory-money">
        <p>
          <strong>Money:</strong> ${player.money.toFixed(2)}
        </p>
      </div>

      {/* Display owned properties */}
      <div className="inventory-properties">
        <h3>Owned Properties</h3>
        {player.properties.length === 0 ? (
          <p>No properties owned</p>
        ) : (
          <ul className="properties-list">
            {player.properties.map((property, index) => (
              <li key={index} className="property-item">
                <div className="property-info">
                  <span className="property-name">{property.name}</span>
                  <span className="property-value">${property.value}</span>
                </div>
                <div className="property-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => onViewItemDetails(property)}
                  >
                    View Details
                  </button>
                  <button
                    className="use-item-btn"
                    onClick={() => onUseItem(property)}
                  >
                    Use Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display other inventory items (if any) */}
      <div className="inventory-other-items">
        <h3>Other Items</h3>
        {player.otherItems.length === 0 ? (
          <p>No other items</p>
        ) : (
          <ul className="other-items-list">
            {player.otherItems.map((item, index) => (
              <li key={index} className="other-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <div className="item-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => onViewItemDetails(item)}
                  >
                    View Details
                  </button>
                  <button
                    className="use-item-btn"
                    onClick={() => onUseItem(item)}
                  >
                    Use Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Prop validation
Inventory.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired, // Player's name
    money: PropTypes.number.isRequired, // Amount of money the player has
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Property name
        value: PropTypes.number.isRequired, // Property value
      })
    ).isRequired,
    otherItems: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Item name
        quantity: PropTypes.number.isRequired, // Quantity of the item
      })
    ).isRequired,
  }).isRequired,
  onUseItem: PropTypes.func.isRequired, // Function to handle using an item
  onViewItemDetails: PropTypes.func.isRequired, // Function to handle viewing item details
};

export default Inventory;
