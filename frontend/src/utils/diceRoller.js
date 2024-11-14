// Function to simulate rolling two dice
export const rollDice = () => {
    // Generate a random number between 1 and 6 for each die
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
  
    // Return the sum of both dice and the individual dice values
    return {
      total: die1 + die2,
      die1,
      die2,
    };
  };
  
  // Function to simulate a dice roll with a specific modifier
  export const rollDiceWithModifier = (modifier = 0) => {
    const { total, die1, die2 } = rollDice();
    
    // Apply the modifier to the total roll
    const modifiedTotal = total + modifier;
  
    return {
      total: modifiedTotal,
      die1,
      die2,
      modifier,
    };
  };
  
  // Function to simulate multiple dice rolls (for advanced scenarios)
  export const rollMultipleDice = (numDice = 2) => {
    let total = 0;
    const diceRolls = [];
  
    // Roll the specified number of dice
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      diceRolls.push(roll);
      total += roll;
    }
  
    return {
      total,
      diceRolls,
    };
  };
  