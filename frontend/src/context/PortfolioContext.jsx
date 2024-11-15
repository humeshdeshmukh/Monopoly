// src/context/PortfolioContext.jsx
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for validation

// Create the PortfolioContext to manage the portfolio state
const PortfolioContext = createContext();

// A custom hook to use the PortfolioContext
const usePortfolio = () => useContext(PortfolioContext);

// A provider component to wrap your app and provide portfolio state
const PortfolioProvider = ({ children }) => {
  // Initial portfolio state (stores properties owned by players)
  const [portfolio, setPortfolio] = useState([
    { playerId: 1, properties: [] },  // Player 1's portfolio
    { playerId: 2, properties: [] },  // Player 2's portfolio
  ]);

  // Function to add a property to a player's portfolio
  const addProperty = (playerId, property) => {
    setPortfolio((prevPortfolio) => 
      prevPortfolio.map((playerPortfolio) =>
        playerPortfolio.playerId === playerId
          ? {
              ...playerPortfolio,
              properties: [...playerPortfolio.properties, property],
            }
          : playerPortfolio
      )
    );
  };

  // Function to remove a property from a player's portfolio
  const removeProperty = (playerId, propertyIndex) => {
    setPortfolio((prevPortfolio) => 
      prevPortfolio.map((playerPortfolio) =>
        playerPortfolio.playerId === playerId
          ? {
              ...playerPortfolio,
              properties: playerPortfolio.properties.filter(
                (_, index) => index !== propertyIndex
              ),
            }
          : playerPortfolio
      )
    );
  };

  // Function to get the total value of properties owned by a player
  const getTotalPropertyValue = (playerId) => {
    const playerPortfolio = portfolio.find(p => p.playerId === playerId);
    if (playerPortfolio) {
      return playerPortfolio.properties.reduce((total, property) => total + property.value, 0);
    }
    return 0;
  };

  // Provide the portfolio state and actions through context
  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addProperty,
        removeProperty,
        getTotalPropertyValue,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Add PropTypes validation for children
PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export PortfolioContext, PortfolioProvider, and usePortfolio hook
export { PortfolioContext, PortfolioProvider, usePortfolio };
