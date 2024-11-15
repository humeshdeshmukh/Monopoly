import React from 'react';
import PropTypes from 'prop-types';
import './ActionButtons.css'; // Import the CSS for custom styles

const ActionButtons = ({ onBuy, onSell, onPayRent, onPayTax, tile, currentPlayer }) => {
    // Validate and handle potential invalid props
    const validTile = tile && typeof tile === 'object' && tile.price !== undefined && tile.rentAmount !== undefined && tile.taxAmount !== undefined;
    const validCurrentPlayer = currentPlayer && typeof currentPlayer === 'object' && currentPlayer.balance !== undefined && currentPlayer.name !== undefined;

    if (!validTile) {
        console.error('Invalid tile passed to ActionButtons', tile);
    }

    if (!validCurrentPlayer) {
        console.error('Invalid currentPlayer passed to ActionButtons', currentPlayer);
    }

    // Default to safe values if props are invalid
    const safeTile = validTile ? tile : { price: 0, rentAmount: 0, taxAmount: 0, owner: null };
    const safeCurrentPlayer = validCurrentPlayer ? currentPlayer : { name: '', balance: 0 };

    // Action button logic for enabling/disabling based on the current state
    const canBuy = safeCurrentPlayer.balance >= safeTile.price && !safeTile.owner;
    const canSell = safeTile.owner === safeCurrentPlayer.name;
    const canPayRent = safeCurrentPlayer.balance >= safeTile.rentAmount && safeTile.owner;
    const canPayTax = safeCurrentPlayer.balance >= safeTile.taxAmount;

    return (
        <div className="action-buttons-container">
            {/* Buy Button */}
            <button
                onClick={onBuy}
                disabled={!canBuy}
                className="action-btn buy-btn"
            >
                Buy
            </button>

            {/* Sell Button */}
            <button
                onClick={onSell}
                disabled={!canSell}
                className="action-btn sell-btn"
            >
                Sell
            </button>

            {/* Pay Rent Button */}
            <button
                onClick={onPayRent}
                disabled={!canPayRent}
                className="action-btn rent-btn"
            >
                Pay Rent
            </button>

            {/* Pay Tax Button */}
            <button
                onClick={onPayTax}
                disabled={!canPayTax}
                className="action-btn tax-btn"
            >
                Pay Tax
            </button>
        </div>
    );
};

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
