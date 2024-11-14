// ActionButtons.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './ActionButtons.css'; // Import the CSS for custom styles

const ActionButtons = ({ onBuy, onSell, onPayRent, onPayTax, tile, currentPlayer }) => {
    return (
        <div className="action-buttons-container">
            <button
                onClick={onBuy}
                disabled={currentPlayer.balance < tile.price || tile.owner}
                className="action-btn buy-btn"
            >
                Buy
            </button>
            <button
                onClick={onSell}
                disabled={!tile.owner || tile.owner !== currentPlayer.name}
                className="action-btn sell-btn"
            >
                Sell
            </button>
            <button
                onClick={onPayRent}
                disabled={currentPlayer.balance < tile.rentAmount || !tile.owner}
                className="action-btn rent-btn"
            >
                Pay Rent
            </button>
            <button
                onClick={onPayTax}
                disabled={currentPlayer.balance < tile.taxAmount}
                className="action-btn tax-btn"
            >
                Pay Tax
            </button>
        </div>
    );
};

// PropTypes for validation
ActionButtons.propTypes = {
    onBuy: PropTypes.func.isRequired,
    onSell: PropTypes.func.isRequired,
    onPayRent: PropTypes.func.isRequired,
    onPayTax: PropTypes.func.isRequired,
    tile: PropTypes.shape({
        price: PropTypes.number.isRequired,
        rentAmount: PropTypes.number.isRequired,
        taxAmount: PropTypes.number.isRequired,
        owner: PropTypes.string,
    }).isRequired,
    currentPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
    }).isRequired,
};

export default ActionButtons;
