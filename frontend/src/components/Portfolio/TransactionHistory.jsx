// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './TransactionHistory.css'; // Import the CSS for styling

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <div className="transaction-info">
                <p><strong>Action:</strong> {transaction.action}</p>
                <p><strong>Property:</strong> {transaction.property}</p>
                <p><strong>Value:</strong> ${transaction.value}</p>
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Prop validation for the TransactionHistory component
TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired, // Action (buy, sell, etc.)
      property: PropTypes.string.isRequired, // Property name
      value: PropTypes.number.isRequired, // Transaction value
      date: PropTypes.string.isRequired, // Date of transaction (ISO format)
    })
  ).isRequired,
};

export default TransactionHistory;
