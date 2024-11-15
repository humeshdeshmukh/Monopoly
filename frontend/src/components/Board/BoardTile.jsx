/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';  // Updated import
import { GameContext } from '../../context/GameContext';
import { PlayerContext } from '../../context/PlayerContext';
import { usePortfolio } from '../../context/PortfolioContext';  // Correct import of the custom hook
import TileActions from './TileActions';  // For specific tile interactions (like buying/selling)
import { formatMoney } from '../../utils/formatMoney';
import Modal from '../UI/Modal';
import './BoardTile.css';

const BoardTile = ({ tile, index }) => {
    const { gameState, setGameState } = useContext(GameContext);
    const { playerState, updatePlayerState } = useContext(PlayerContext);
    const { portfolio, addProperty, removeProperty, getTotalPropertyValue } = usePortfolio();  // Access portfolio context
    const [showModal, setShowModal] = useState(false);
    const [tileDetails, setTileDetails] = useState(null);
    const [actionInProgress, setActionInProgress] = useState(false);  // Prevent multiple actions at once
    const navigate = useNavigate();  // Initialize navigate

    useEffect(() => {
        if (gameState?.action === 'buy' && gameState.tileId === tile.id) {
            updatePlayerState({ type: 'updateOwnership', tileId: tile.id });
        }
    }, [gameState, tile.id, updatePlayerState]);

    const handleTileClick = () => {
        if (actionInProgress) return; // Prevent multiple clicks while action is in progress

        if (tile.type === 'investment') {
            setTileDetails(tile);
            setShowModal(true);
        } else if (tile.type === 'property') {
            navigate(`/property/${tile.id}`);  // Using navigate instead of history.push
        } else if (tile.type === 'event') {
            handleEventTile();
        } else if (tile.type === 'tax') {
            handleTaxTile();
        }
    };

    const handleTaxTile = () => {
        const taxAmount = tile.value || 0;
        if (playerState.balance >= taxAmount) {
            updatePlayerState({ type: 'deduct', amount: taxAmount });
            setGameState({ type: 'tax', tileId: tile.id });
        } else {
            alert('You do not have enough balance to pay the tax.');
        }
    };

    const handleEventTile = () => {
        const eventOutcome = Math.random() > 0.5 ? 'bonus' : 'penalty';
        if (eventOutcome === 'bonus') {
            const bonus = Math.floor(Math.random() * 500) + 100;
            updatePlayerState({ type: 'add', amount: bonus });
            setGameState({ type: 'event', action: 'bonus', tileId: tile.id });
        } else {
            const penalty = Math.floor(Math.random() * 300) + 50;
            updatePlayerState({ type: 'deduct', amount: penalty });
            setGameState({ type: 'event', action: 'penalty', tileId: tile.id });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setTileDetails(null);
    };

    const handleInvestmentAction = (actionType) => {
        if (actionInProgress) return;

        setActionInProgress(true);
        if (actionType === 'buy') {
            if (playerState.balance >= tile.value) {
                updatePlayerState({ type: 'buy', investment: tile });
                setGameState({ type: 'update', action: 'buy', tileId: tile.id });
            } else {
                alert('Insufficient funds to buy this investment!');
            }
        } else if (actionType === 'sell') {
            alert('Selling feature not implemented yet.');
        }
        setActionInProgress(false);
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
