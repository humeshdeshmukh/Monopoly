// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal'; // Assuming you have a Modal component
import './TileDetailsModal.css'; // Optional: Add your custom styles for the modal

const TileDetailsModal = ({ tile, onAction, onClose }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    // Function to handle common actions for each tile
    const handleAction = (actionType) => {
        setLoading(true);
        setActionError(null); // Reset any previous errors

        try {
            // Simulate an action (e.g., buying, selling, etc.) via the onAction callback
            onAction(actionType, tile);
            setLoading(false);
            setShowModal(false); // Close the modal after the action
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setLoading(false);
            setActionError(`Failed to ${actionType} the tile. Please try again.`);
        }
    };

    // Render modal content based on tile type
    const renderModalContent = () => {
        switch (tile.type) {
            case 'property':
                return (
                    <div className="tile-modal-content">
                        <h3>Property: {tile.name}</h3>
                        <p>Price: ${tile.price}</p>
                        {tile.owner ? (
                            <p>Owned by: {tile.owner}</p>
                        ) : (
                            <p>This property is available for purchase.</p>
                        )}
                        <div className="action-buttons">
                            <button onClick={() => handleAction('buy')} disabled={loading || tile.owner}>
                                {tile.owner ? 'Already Owned' : 'Buy'}
                            </button>
                            <button onClick={() => handleAction('sell')} disabled={loading || !tile.owner}>
                                {tile.owner ? 'Sell' : 'Not Owned'}
                            </button>
                        </div>
                    </div>
                );
            case 'tax':
                return (
                    <div className="tile-modal-content">
                        <h3>Tax Tile: {tile.name}</h3>
                        <p>Pay tax of: ${tile.taxAmount}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleAction('payTax')} disabled={loading}>
                                Pay Tax
                            </button>
                        </div>
                    </div>
                );
            case 'event':
                return (
                    <div className="tile-modal-content">
                        <h3>Event Tile: {tile.name}</h3>
                        <p>{tile.eventDescription}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleAction('triggerEvent')} disabled={loading}>
                                Trigger Event
                            </button>
                        </div>
                    </div>
                );
            case 'rent':
                return (
                    <div className="tile-modal-content">
                        <h3>Rent Tile: {tile.name}</h3>
                        <p>Pay rent of: ${tile.rentAmount}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleAction('payRent')} disabled={loading}>
                                Pay Rent
                            </button>
                        </div>
                    </div>
                );
            default:
                return <p>No action available for this tile type.</p>;
        }
    };

    return (
        <div className="tile-details-modal">
            <button className="view-details-btn" onClick={() => setShowModal(true)} disabled={loading}>
                View Tile Details
            </button>

            {showModal && (
                <Modal onClose={onClose}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {renderModalContent()}
                            {actionError && <p className="error-message">{actionError}</p>}
                        </>
                    )}
                </Modal>
            )}
        </div>
    );
};

// PropTypes validation
TileDetailsModal.propTypes = {
    tile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['property', 'tax', 'event', 'rent']).isRequired,
        price: PropTypes.number,
        rentAmount: PropTypes.number,
        taxAmount: PropTypes.number,
        eventDescription: PropTypes.string,
        owner: PropTypes.string, // Optional, used for property ownership
    }).isRequired,
    onAction: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TileDetailsModal;
