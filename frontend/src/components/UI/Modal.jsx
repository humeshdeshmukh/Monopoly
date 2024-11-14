// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Prop validation for the Modal component
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Controls if the modal is visible
  onClose: PropTypes.func.isRequired, // Function to close the modal
  title: PropTypes.string.isRequired, // Title of the modal
  children: PropTypes.node.isRequired, // Content to be displayed inside the modal
};

export default Modal;
