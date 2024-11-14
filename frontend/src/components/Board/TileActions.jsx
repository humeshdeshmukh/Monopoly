// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Assuming you have a Modal component for tile actions
import { updateTileOwner, handleRentPayment, handleTaxPayment, triggerEvent } from '../../utils/gameUtils'; // Utility functions
import './TileActions.css';

const TileActions = ({ tile, currentPlayer, onAction }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Function to handle buying a property
    const handleBuy = () => {
        if (currentPlayer.balance >= tile.price) {
            onAction('buy', tile); // Perform the buying action
            updateTileOwner(tile, currentPlayer); // Update tile owner
            setShowModal(false);
        } else {
            alert('Insufficient balance to buy this property.');
        }
    };

    // Function to handle selling a property
    // eslint-disable-next-line no-unused-vars
    const handleSell = () => {
        onAction('sell', tile);
        setShowModal(false);
    };

    // Function to handle paying rent
    const handlePayRent = () => {
        if (currentPlayer.balance >= tile.rentAmount) {
            handleRentPayment(currentPlayer, tile.rentAmount); // Pay rent
            setShowModal(false);
        } else {
            alert('Insufficient balance to pay rent.');
        }
    };

    // Function to handle paying tax
    const handlePayTax = () => {
        if (currentPlayer.balance >= tile.taxAmount) {
            handleTaxPayment(currentPlayer, tile.taxAmount); // Pay tax
            setShowModal(false);
        } else {
            alert('Insufficient balance to pay tax.');
        }
    };

    // Function to trigger an event (Community Chest/Chance)
    const handleEvent = () => {
        triggerEvent(currentPlayer); // Trigger event action
        setShowModal(false);
    };

    // Render modal content based on tile type
    const renderModalContent = () => {
        switch (tile.type) {
            case 'property':
                return (
                    <div>
                        <h3>Property: {tile.name}</h3>
                        <p>Price: ${tile.price}</p>
                        {tile.owner ? (
                            <p>Owner: {tile.owner.name}</p>
                        ) : (
                            <div>
                                <button onClick={handleBuy}>Buy</button>
                            </div>
                        )}
                    </div>
                );
            case 'tax':
                return (
                    <div>
                        <h3>Tax Tile: {tile.name}</h3>
                        <p>Pay tax of: ${tile.taxAmount}</p>
                        <button onClick={handlePayTax}>Pay Tax</button>
                    </div>
                );
            case 'event':
                return (
                    <div>
                        <h3>Event Tile: {tile.name}</h3>
                        <p>{tile.eventDescription}</p>
                        <button onClick={handleEvent}>Trigger Event</button>
                    </div>
                );
            case 'rent':
                return (
                    <div>
                        <h3>Rent Tile: {tile.name}</h3>
                        <p>Pay rent of: ${tile.rentAmount}</p>
                        <button onClick={handlePayRent}>Pay Rent</button>
                    </div>
                );
            case 'auction':
                return (
                    <div>
                        <h3>Auction for: {tile.name}</h3>
                        <p>Starting bid: ${tile.startingBid}</p>
                        <button onClick={() => navigate(`/auction/${tile.id}`)}>Start Auction</button>
                    </div>
                );
            default:
                return <p>No action available</p>;
        }
    };

    return (
        <div className="tile-actions">
            <button onClick={() => setShowModal(true)}>Tile Actions</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {renderModalContent()}
                </Modal>
            )}
        </div>
    );
};

TileActions.propTypes = {
    tile: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['property', 'tax', 'event', 'rent', 'auction']).isRequired,
        price: PropTypes.number,
        rentAmount: PropTypes.number,
        taxAmount: PropTypes.number,
        eventDescription: PropTypes.string,
        startingBid: PropTypes.number,
        owner: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
    currentPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
    }).isRequired,
    onAction: PropTypes.func.isRequired,
};

export default TileActions;
