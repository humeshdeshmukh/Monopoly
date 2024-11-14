// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../../context/GameContext';
import { PlayerContext } from '../../context/PlayerContext';
// eslint-disable-next-line no-unused-vars
import { TileActions } from './TileActions';  // For specific tile interactions (like buying/selling)
import { formatMoney } from '../../utils/formatMoney';
import { Modal } from '../UI/Modal';
import './BoardTile.css';

/**
 * BoardTile component - represents a single tile on the board.
 * Handles various tile types and their interactions, such as property purchases, investments, taxes, etc.
 */
// eslint-disable-next-line no-unused-vars
const BoardTile = ({ tile, index }) => {
    const { gameState, setGameState } = useContext(GameContext);
    const { playerState, updatePlayerState } = useContext(PlayerContext);
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [tileDetails, setTileDetails] = useState(null);
    const [actionInProgress, setActionInProgress] = useState(false);  // Prevent multiple actions at once
    const history = useHistory();

    // Effect to handle changes to gameState, such as property ownership
    useEffect(() => {
        if (gameState?.action === 'buy' && gameState.tileId === tile.id) {
            // Perform any necessary state updates, animations, or UI changes after a buy action
            updatePlayerState({ type: 'updateOwnership', tileId: tile.id });
        }
    }, [gameState, tile.id, updatePlayerState]);

    /**
     * Handles the click on a tile, triggering an action or displaying detailed information.
     */
    const handleTileClick = () => {
        if (actionInProgress) return; // Prevent multiple clicks while action is in progress

        if (tile.type === 'investment') {
            // If the tile is an investment type, show investment details
            setTileDetails(tile);
            setShowModal(true);
        } else if (tile.type === 'property') {
            // For property-related tiles, navigate to the property page or details
            history.push(`/property/${tile.id}`);
        } else if (tile.type === 'event') {
            // For event-related tiles, handle special event logic
            handleEventTile();
        } else if (tile.type === 'tax') {
            // For tax tiles, deduct money from player's balance
            handleTaxTile();
        }
        // You can add other tile types and actions (like "chance", "community chest", etc.)
    };

    /**
     * Handles tax-related tiles, deducting the required amount from player's balance.
     */
    const handleTaxTile = () => {
        const taxAmount = tile.value || 0;
        if (playerState.balance >= taxAmount) {
            updatePlayerState({ type: 'deduct', amount: taxAmount });
            setGameState({ type: 'tax', tileId: tile.id });
        } else {
            // Show warning or notification about insufficient funds
            alert('You do not have enough balance to pay the tax.');
        }
    };

    /**
     * Handles event tiles (e.g., random events that affect the game state).
     */
    const handleEventTile = () => {
        // Example: Handle a special event like a random bonus or deduction
        const eventOutcome = Math.random() > 0.5 ? 'bonus' : 'penalty';
        if (eventOutcome === 'bonus') {
            const bonus = Math.floor(Math.random() * 500) + 100; // Random bonus between 100 and 500
            updatePlayerState({ type: 'add', amount: bonus });
            setGameState({ type: 'event', action: 'bonus', tileId: tile.id });
        } else {
            const penalty = Math.floor(Math.random() * 300) + 50; // Random penalty between 50 and 300
            updatePlayerState({ type: 'deduct', amount: penalty });
            setGameState({ type: 'event', action: 'penalty', tileId: tile.id });
        }
    };

    /**
     * Closes the modal that displays tile details.
     */
    const closeModal = () => {
        setShowModal(false);
        setTileDetails(null);
    };

    /**
     * Handles the player's action on an investment tile (e.g., buying a stock or property).
     */
    const handleInvestmentAction = (actionType) => {
        if (actionInProgress) return; // Prevent multiple actions at once

        setActionInProgress(true);
        if (actionType === 'buy') {
            // Validate purchase (ensure player has enough money)
            if (playerState.balance >= tile.value) {
                updatePlayerState({ type: 'buy', investment: tile });
                setGameState({ type: 'update', action: 'buy', tileId: tile.id });
            } else {
                alert('Insufficient funds to buy this investment!');
            }
        } else if (actionType === 'sell') {
            // Selling logic (e.g., selling a property or investment)
            alert('Selling feature not implemented yet.');
        }
        setActionInProgress(false); // End action and close modal
        setShowModal(false);
    };

    return (
        <div className={`board-tile ${tile.type}`} onClick={handleTileClick}>
            <div className="tile-content">
                <img
                    src={tile.icon}
                    alt={tile.name}
                    className="tile-icon"
                />
                <div className="tile-name">{tile.name}</div>
                {tile.type === 'investment' && (
                    <div className="investment-value">
                        {formatMoney(tile.value)}
                    </div>
                )}
                {tile.type === 'property' && (
                    <div className="property-status">
                        {tile.owner ? `Owned by ${tile.owner.name}` : 'Available'}
                    </div>
                )}
                {tile.type === 'event' && (
                    <div className="event-status">Event: {tile.description}</div>
                )}
                {tile.type === 'tax' && (
                    <div className="tax-value">Tax: {formatMoney(tile.value)}</div>
                )}
            </div>

            {/* Modal for displaying tile details */}
            {showModal && (
                <Modal onClose={closeModal} title={`${tile.name} Details`}>
                    <div className="tile-modal-content">
                        <p>{tile.description}</p>
                        {tile.type === 'investment' && (
                            <div className="investment-actions">
                                <button onClick={() => handleInvestmentAction('buy')}>
                                    Buy Investment
                                </button>
                                <button onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        )}
                        {tile.type === 'property' && (
                            <div className="property-actions">
                                <button
                                    onClick={() => handleInvestmentAction('buy')}
                                    disabled={tile.owner !== null}
                                >
                                    Buy Property
                                </button>
                            </div>
                        )}
                        {tile.type === 'tax' && (
                            <div className="tax-actions">
                                <button disabled>
                                    Pay Tax
                                </button>
                            </div>
                        )}
                        {tile.type === 'event' && (
                            <div className="event-actions">
                                <button disabled>
                                    Handle Event
                                </button>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

BoardTile.propTypes = {
    tile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['investment', 'property', 'event', 'tax']).isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        owner: PropTypes.object,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default BoardTile;
