#!/bin/bash

# Root directory for the project
ROOT_DIR="frontend"

# Function to create directories if they don't exist
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "Created directory: $1"
    else
        echo "Directory already exists: $1"
    fi
}

# Function to create files if they don't exist
create_file() {
    if [ ! -f "$1" ]; then
        touch "$1"
        echo "Created file: $1"
    else
        echo "File already exists: $1"
    fi
}

# Create the basic project structure
create_dir "$ROOT_DIR/public/assets/images/icons"
create_dir "$ROOT_DIR/public/assets/audio"
create_dir "$ROOT_DIR/src/assets/data"
create_dir "$ROOT_DIR/src/assets/styles"
create_dir "$ROOT_DIR/src/components/Board/styles"
create_dir "$ROOT_DIR/src/components/Investment"
create_dir "$ROOT_DIR/src/components/Portfolio"
create_dir "$ROOT_DIR/src/components/Events"
create_dir "$ROOT_DIR/src/components/Dashboard"
create_dir "$ROOT_DIR/src/components/Controls"
create_dir "$ROOT_DIR/src/components/Player"
create_dir "$ROOT_DIR/src/components/UI"
create_dir "$ROOT_DIR/src/hooks"
create_dir "$ROOT_DIR/src/context"
create_dir "$ROOT_DIR/src/services"
create_dir "$ROOT_DIR/src/utils"

# Create the necessary files in the project
create_file "$ROOT_DIR/public/index.html"
create_file "$ROOT_DIR/public/favicon.ico"
create_file "$ROOT_DIR/src/App.jsx"
create_file "$ROOT_DIR/src/index.jsx"
create_file "$ROOT_DIR/src/assets/data/stocksData.js"
create_file "$ROOT_DIR/src/assets/data/mutualFundsData.js"
create_file "$ROOT_DIR/src/assets/data/eventsData.js"
create_file "$ROOT_DIR/src/assets/data/gameRules.js"
create_file "$ROOT_DIR/src/assets/styles/main.css"
create_file "$ROOT_DIR/src/assets/styles/Board.css"
create_file "$ROOT_DIR/src/assets/styles/Investment.css"
create_file "$ROOT_DIR/src/components/Board/Board.jsx"
create_file "$ROOT_DIR/src/components/Board/BoardTile.jsx"
create_file "$ROOT_DIR/src/components/Board/TileActions.jsx"
create_file "$ROOT_DIR/src/components/Board/TileDetailsModal.jsx"
create_file "$ROOT_DIR/src/components/Investment/InvestmentList.jsx"
create_file "$ROOT_DIR/src/components/Investment/StockInvestment.jsx"
create_file "$ROOT_DIR/src/components/Investment/MutualFundInvestment.jsx"
create_file "$ROOT_DIR/src/components/Investment/InvestmentChart.jsx"
create_file "$ROOT_DIR/src/components/Investment/InvestmentDetail.jsx"
create_file "$ROOT_DIR/src/components/Portfolio/PortfolioOverview.jsx"
create_file "$ROOT_DIR/src/components/Portfolio/PortfolioItem.jsx"
create_file "$ROOT_DIR/src/components/Portfolio/PortfolioSummary.jsx"
create_file "$ROOT_DIR/src/components/Portfolio/TransactionHistory.jsx"
create_file "$ROOT_DIR/src/components/Events/EventCard.jsx"
create_file "$ROOT_DIR/src/components/Events/EventList.jsx"
create_file "$ROOT_DIR/src/components/Events/EventModal.jsx"
create_file "$ROOT_DIR/src/components/Dashboard/FinancialDashboard.jsx"
create_file "$ROOT_DIR/src/components/Dashboard/StatChart.jsx"
create_file "$ROOT_DIR/src/components/Dashboard/NetWorthCalculator.jsx"
create_file "$ROOT_DIR/src/components/Controls/ActionButtons.jsx"
create_file "$ROOT_DIR/src/components/Controls/DiceRoll.jsx"
create_file "$ROOT_DIR/src/components/Controls/EndTurnButton.jsx"
create_file "$ROOT_DIR/src/components/Player/PlayerStatus.jsx"
create_file "$ROOT_DIR/src/components/Player/PlayerCard.jsx"
create_file "$ROOT_DIR/src/components/Player/Inventory.jsx"
create_file "$ROOT_DIR/src/components/Player/PlayerActions.jsx"
create_file "$ROOT_DIR/src/components/UI/Button.jsx"
create_file "$ROOT_DIR/src/components/UI/Modal.jsx"
create_file "$ROOT_DIR/src/components/UI/Tooltip.jsx"
create_file "$ROOT_DIR/src/hooks/usePortfolio.js"
create_file "$ROOT_DIR/src/hooks/useEvents.js"
create_file "$ROOT_DIR/src/hooks/useInvestments.js"
create_file "$ROOT_DIR/src/hooks/useDice.js"
create_file "$ROOT_DIR/src/hooks/usePlayerActions.js"
create_file "$ROOT_DIR/src/pages/Home.jsx"
create_file "$ROOT_DIR/src/pages/GamePage.jsx"
create_file "$ROOT_DIR/src/context/GameContext.js"
create_file "$ROOT_DIR/src/context/PortfolioContext.js"
create_file "$ROOT_DIR/src/context/PlayerContext.js"
create_file "$ROOT_DIR/src/services/stockApi.js"
create_file "$ROOT_DIR/src/services/eventApi.js"
create_file "$ROOT_DIR/src/utils/calculateROI.js"
create_file "$ROOT_DIR/src/utils/randomEvent.js"
create_file "$ROOT_DIR/src/utils/formatMoney.js"
create_file "$ROOT_DIR/src/utils/diceRoller.js"
create_file "$ROOT_DIR/src/utils/gameSetup.js"
create_file "$ROOT_DIR/.env"
create_file "$ROOT_DIR/package.json"
create_file "$ROOT_DIR/README.md"

echo "Frontend directory structure is set up!"
