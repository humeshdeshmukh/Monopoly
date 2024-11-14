// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EventModal.css'; // Assuming you have some CSS for styling the modal

const EventModal = ({ event, isOpen, onClose }) => {
  // State for managing modal visibility and handling closing
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen); // Keep the modal open/closed based on prop change
  }, [isOpen]);

  // Function to handle closing the modal
  const handleClose = () => {
    setIsModalOpen(false);
    onClose(); // Notify the parent component that the modal is closed
  };

  if (!event) {
    return null; // If no event is passed, return nothing
  }

  return (
    <div
      className={`modal-overlay ${isModalOpen ? 'open' : ''}`}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="modal-header">
          <h2 className="modal-title">{event.title}</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop validation using PropTypes
EventModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string, // optional, if you want to display an image
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired, // Controls if the modal is open or closed
  onClose: PropTypes.func.isRequired, // Callback to handle closing the modal
};

export default EventModal;
