// Utility function to simulate a random event (e.g., Chance, Community Chest)
export const getRandomEvent = () => {
    const events = [
      { type: 'Chance', description: 'Move forward 3 spaces', effect: movePlayerForward },
      { type: 'Chance', description: 'Go directly to Jail', effect: sendPlayerToJail },
      { type: 'Community Chest', description: 'You have won a beauty contest! Collect $50', effect: rewardPlayer },
      { type: 'Community Chest', description: 'Pay hospital fees of $100', effect: penalizePlayer },
      { type: 'Chance', description: 'Advance to Boardwalk', effect: advanceToBoardwalk },
      { type: 'Chance', description: 'Pay $200 in taxes', effect: payTax },
    ];
  
    // Get a random event from the events list
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];
  
    return randomEvent;
  };
  
  // Helper function to move the player forward by a certain number of spaces
  const movePlayerForward = (player, spaces) => {
    player.position = (player.position + spaces) % 40; // 40 spaces on the board
    return player;
  };
  
  // Helper function to send the player directly to Jail
  const sendPlayerToJail = (player) => {
    player.position = 10; // Jail is located at position 10
    player.isInJail = true;
    return player;
  };
  
  // Helper function to reward the player with money
  const rewardPlayer = (player) => {
    player.cash += 50; // Award $50 to the player
    return player;
  };
  
  // Helper function to penalize the player with a fine
  const penalizePlayer = (player) => {
    player.cash -= 100; // Charge a $100 fine
    return player;
  };
  
  // Helper function to advance the player to Boardwalk
  const advanceToBoardwalk = (player) => {
    player.position = 39; // Boardwalk is located at position 39
    return player;
  };
  
  // Helper function to make the player pay taxes
  const payTax = (player) => {
    player.cash -= 200; // Charge $200 in taxes
    return player;
  };
  
  