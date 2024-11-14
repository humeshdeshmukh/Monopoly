// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import CSS for styling

const Button = ({ label, onClick, type, disabled }) => {
  // Default button type is 'primary'
  const buttonClass = `btn ${type ? type : 'primary'} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={!disabled ? onClick : null}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// Prop validation for the Button component
Button.propTypes = {
  label: PropTypes.string.isRequired, // Button label text
  onClick: PropTypes.func, // Function to call on button click
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']), // Button type for style
  disabled: PropTypes.bool, // Disabled state for the button
};

Button.defaultProps = {
  type: 'primary', // Default to primary type if not provided
  disabled: false, // Default to enabled state
};

export default Button;
