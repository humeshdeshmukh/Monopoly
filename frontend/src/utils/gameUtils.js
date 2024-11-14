// gameUtils.js

// Function to update the owner of a tile
export const updateTileOwner = (tile, currentPlayer) => {
    if (tile.owner) {
      return `Tile already owned by ${tile.owner.name}`;
    }
  
    // Set the tile's owner to the current player
    tile.owner = currentPlayer;
    return `${currentPlayer.name} now owns ${tile.name}`;
  };
  
  // Function to handle rent payment when a player lands on a tile owned by another player
  export const handleRentPayment = (tile, currentPlayer) => {
    if (!tile.owner || tile.owner === currentPlayer) {
      return "You can't pay rent on a tile you own!";
    }
  
    const rentAmount = tile.rent; // Assuming rent is a simple property of the tile
    if (currentPlayer.balance < rentAmount) {
      return `${currentPlayer.name} doesn't have enough money to pay rent!`;
    }
  
    // Deduct rent from current player's balance and add to tile owner's balance
    currentPlayer.balance -= rentAmount;
    tile.owner.balance += rentAmount;
    return `${currentPlayer.name} paid ${rentAmount} in rent to ${tile.owner.name}`;
  };
  
  // Function to handle tax payment when a player lands on a tax tile
  export const handleTaxPayment = (currentPlayer, taxAmount) => {
    if (currentPlayer.balance < taxAmount) {
      return `${currentPlayer.name} doesn't have enough money to pay the tax!`;
    }
  
    // Deduct tax amount from the player's balance
    currentPlayer.balance -= taxAmount;
    return `${currentPlayer.name} paid ${taxAmount} in taxes.`;
  };
  
  // Function to trigger an event on a tile (could be a chance or community chest)
  export const triggerEvent = (tile, currentPlayer) => {
    if (!tile.event) {
      return "No event to trigger on this tile.";
    }
  
    // Example of handling events (e.g., drawing a chance card)
    const eventResult = tile.event(currentPlayer);
    return `${currentPlayer.name} triggered an event: ${eventResult}`;
  };
  
  // Function to handle player buying a property
  export const buyProperty = (propertyIndex, currentPlayer, gameBoard, players, setPlayers, setGameBoard) => {
    const property = gameBoard[propertyIndex];
  
    if (!property.owner && currentPlayer.balance >= property.value) {
      // Player can afford the property, buy it
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer.id - 1] = {
        ...currentPlayer,
        balance: currentPlayer.balance - property.value,
        properties: [...currentPlayer.properties, property],
      };
      setPlayers(updatedPlayers);
  
      const updatedGameBoard = [...gameBoard];
      updatedGameBoard[propertyIndex] = { ...property, owner: currentPlayer };
      setGameBoard(updatedGameBoard);
    } else {
      alert('Cannot buy property');
    }
  };
  