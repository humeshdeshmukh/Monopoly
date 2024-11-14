import { useState } from 'react';

const useDice = () => {
  // State to hold the dice rolls
  const [diceRoll, setDiceRoll] = useState([0, 0]);
  
  // Function to roll the dice
  const rollDice = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;  // Random number between 1 and 6
    const roll2 = Math.floor(Math.random() * 6) + 1;  // Random number between 1 and 6
    setDiceRoll([roll1, roll2]);  // Update the dice roll state
  };

  // Return dice roll results and the rollDice function
  return { diceRoll, rollDice };
};

export default useDice;
