// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "./Modal.css"; // Make sure to style your modal appropriately

const Modal = ({ isOpen, onClose, children }) => {
  // Close the modal when the overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Do not render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Prop validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // If modal is open
  onClose: PropTypes.func.isRequired, // Function to close the modal
  children: PropTypes.node.isRequired, // Modal content
};

export default Modal;
