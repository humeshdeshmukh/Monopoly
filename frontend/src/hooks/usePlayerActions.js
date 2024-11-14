import { useState } from 'react';
import useInvestments from './useInvestments'; // Importing the investments hook
import useDice from './useDice'; // Importing the dice rolling hook

// Custom hook to manage player actions such as rolling dice, moving, buying/selling properties, and more
const usePlayerActions = () => {
  // State to track the player's position on the board
  const [position, setPosition] = useState(0);

  // State to track player's balance (money)
  const [balance, setBalance] = useState(1500); // Starting balance, typical in Monopoly

  // State to track whether it's the player's turn or not
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Using the useInvestments hook for property-related actions
  // eslint-disable-next-line no-unused-vars
  const { buyProperty, upgradeProperty, sellProperty, getTotalInvestmentValue } = useInvestments();

  // Using the useDice hook for dice rolling logic
  const { rollDice, diceResult } = useDice();

  // Function to handle player movement after rolling the dice
  const movePlayer = (steps) => {
    let newPosition = position + steps;
    if (newPosition >= 40) {
      newPosition -= 40; // Looping back to the start if the player exceeds the board
      handlePassingGo(); // Special action when passing 'Go'
    }
    setPosition(newPosition);
  };

  // Function to handle passing 'Go' (collecting $200)
  const handlePassingGo = () => {
    setBalance(balance + 200); // Collect $200 when passing 'Go'
  };

  // Function to handle a player's turn (rolling dice, moving, etc.)
  const takeTurn = () => {
    if (!isPlayerTurn) return;

    // Roll the dice to determine movement
    const roll = rollDice();
    movePlayer(roll); // Move the player by the number of rolled steps

    // Example: Simulate buying property if player lands on unowned property
    // This logic would depend on your game state, e.g., checking the board to see if a property is available
    const property = { id: 1, name: 'Mediterranean Avenue', value: 60 }; // Example property
    buyProperty(property); // Assuming player buys property

    setIsPlayerTurn(false); // End the player's turn
  };

  // Function to handle player buying a property
  const handleBuyProperty = (property) => {
    if (balance >= property.value) {
      buyProperty(property);
      setBalance(balance - property.value); // Deduct the cost of the property
    } else {
      alert('Not enough money to buy this property!');
    }
  };

  // Function to handle player upgrading a property
  const handleUpgradeProperty = (propertyId) => {
    upgradeProperty(propertyId);
    setBalance(balance - 50); // Example: Deducting the cost of a house upgrade (you can adjust this based on your logic)
  };

  // Function to handle selling a property
  const handleSellProperty = (propertyId) => {
    sellProperty(propertyId);
    setBalance(balance + 50); // Example: Getting money from selling a property
  };

  // Function to simulate paying rent (deduct from player's balance)
  const payRent = (rentAmount) => {
    setBalance(balance - rentAmount);
  };

  // Function to simulate paying fines (deduct from player's balance)
  const payFine = (fineAmount) => {
    setBalance(balance - fineAmount);
  };

  // Function to skip player's turn
  const skipTurn = () => {
    setIsPlayerTurn(false);
  };

  // Return all actions and states related to the player's actions
  return {
    position,
    balance,
    isPlayerTurn,
    takeTurn,
    handleBuyProperty,
    handleUpgradeProperty,
    handleSellProperty,
    payRent,
    payFine,
    skipTurn,
    diceResult,
  };
};

export default usePlayerActions;
