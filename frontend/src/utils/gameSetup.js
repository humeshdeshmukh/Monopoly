// Utility function to initialize the game board with properties and special spaces
export const initializeGameBoard = () => {
    return [
      { name: 'Start', value: 0, owner: null },
      { name: 'Mediterranean Avenue', value: 60, owner: null },
      { name: 'Community Chest', value: 0, owner: null, type: 'communityChest' },
      { name: 'Baltic Avenue', value: 60, owner: null },
      { name: 'Income Tax', value: 200, owner: null, type: 'incomeTax' },
      { name: 'Reading Railroad', value: 200, owner: null },
      { name: 'Oriental Avenue', value: 100, owner: null },
      { name: 'Chance', value: 0, owner: null, type: 'chance' },
      { name: 'Vermont Avenue', value: 100, owner: null },
      { name: 'Connecticut Avenue', value: 120, owner: null },
      { name: 'Jail', value: 0, owner: null, type: 'jail' },
      // Add all other Monopoly spaces here...
    ];
  };
  
  // Utility function to initialize players for the game
  export const initializePlayers = () => {
    return [
      { id: 1, name: 'Player 1', cash: 1500, properties: [], position: 0, isInJail: false },
      { id: 2, name: 'Player 2', cash: 1500, properties: [], position: 0, isInJail: false },
    ];
  };
  
  // Utility function to create a new game state
  export const setupNewGame = () => {
    const gameBoard = initializeGameBoard();
    const players = initializePlayers();
    
    return {
      players,
      currentPlayerIndex: 0,
      gameBoard,
      gameStatus: 'Not Started',
      diceRoll: [0, 0],
    };
  };
  
  // Utility function to start a new game
  export const startNewGame = () => {
    const gameState = setupNewGame();
    // Initialize the game context with the new game state
    return gameState;
  };
  