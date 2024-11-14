// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css'; // Import CSS for styling

const Tooltip = ({ message, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true); // Show the tooltip when the user hovers over the element
  };

  const handleMouseLeave = () => {
    setIsVisible(false); // Hide the tooltip when the user stops hovering
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children} {/* Render the wrapped child element */}
      {isVisible && (
        <div className={`tooltip ${position}`}>
          <span className="tooltip-text">{message}</span>
        </div>
      )}
    </div>
  );
};

// Prop validation for the Tooltip component
Tooltip.propTypes = {
  message: PropTypes.string.isRequired, // Tooltip message to display
  children: PropTypes.node.isRequired, // The element the tooltip will wrap
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']), // Position of the tooltip relative to the element
};

export default Tooltip;
