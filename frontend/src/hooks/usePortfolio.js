import React, { useEffect } from 'react';
import usePlayerActions from '../hooks/usePlayerActions'; // Adjust the path as needed

const PlayerActions = () => {
  const {
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
  } = usePlayerActions();

  useEffect(() => {
    if (isPlayerTurn) {
      takeTurn(); // Automatically take the turn when it's the player's turn
    }
  }, [isPlayerTurn, takeTurn]); // Add 'takeTurn' to the dependency array

  return (
    <div>
      <h3>Player Actions</h3>
      <p>Position: {position}</p>
      <p>Balance: ${balance}</p>
      <p>Dice Roll: {diceResult}</p>
      <div>
        {isPlayerTurn ? (
          <button onClick={takeTurn}>Roll Dice & Take Turn</button>
        ) : (
          <button onClick={skipTurn}>End Turn</button>
        )}
      </div>

      <h4>Actions</h4>
      <button onClick={() => handleBuyProperty({ id: 1, name: 'Mediterranean Avenue', value: 60 })}>
        Buy Mediterranean Avenue
      </button>
      <button onClick={() => handleUpgradeProperty(1)}>Upgrade Property</button>
      <button onClick={() => handleSellProperty(1)}>Sell Property</button>
      <button onClick={() => payRent(50)}>Pay Rent ($50)</button>
      <button onClick={() => payFine(100)}>Pay Fine ($100)</button>
    </div>
  );
};

export default PlayerActions;
