import { useState } from 'react';

// Custom hook to manage player's investments in properties
const useInvestments = () => {
  // State to track player investments (properties they own and the value of those investments)
  const [investments, setInvestments] = useState([]);

  // Function to add a property to the player's investments
  const buyProperty = (property) => {
    setInvestments((prevInvestments) => {
      // Check if the player already owns this property
      const existingProperty = prevInvestments.find((investment) => investment.id === property.id);
      if (existingProperty) {
        return prevInvestments; // Property already owned, no need to add it again
      }
      // Add new property to investments
      return [...prevInvestments, { ...property, houses: 0, hotels: 0 }];
    });
  };

  // Function to upgrade a property with houses (or hotels if max houses are reached)
  const upgradeProperty = (propertyId) => {
    setInvestments((prevInvestments) => {
      return prevInvestments.map((investment) => {
        if (investment.id === propertyId) {
          // Upgrade property: Add a house if possible
          if (investment.houses < 4) {
            return { ...investment, houses: investment.houses + 1 };
          } else if (investment.houses === 4 && investment.hotels < 1) {
            // Upgrade to hotel once 4 houses are built
            return { ...investment, houses: 0, hotels: investment.hotels + 1 };
          }
        }
        return investment; // No changes for other properties
      });
    });
  };

  // Function to sell a property back to the bank
  const sellProperty = (propertyId) => {
    setInvestments((prevInvestments) => {
      return prevInvestments.filter((investment) => investment.id !== propertyId);
    });
  };

  // Function to calculate total investment value
  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => {
      // Calculate the value based on base property value and houses/hotels
      const houseValue = investment.houses * 50; // Example value per house
      const hotelValue = investment.hotels * 200; // Example value per hotel
      return total + investment.value + houseValue + hotelValue;
    }, 0);
  };

  // Return the investment state and helper functions
  return {
    investments,
    buyProperty,
    upgradeProperty,
    sellProperty,
    getTotalInvestmentValue,
  };
};

export default useInvestments;
