#!/bin/bash

# Define the parent directory as 'backend'
cd backend

# Define project structure
mkdir -p {controllers,models,routes,middlewares,utils,config}

# Controllers
touch controllers/{authController.js,investmentController.js,portfolioController.js,eventController.js,playerController.js,gameController.js}

# Models
touch models/{User.js,Investment.js,Portfolio.js,Event.js,Transaction.js,Game.js}

# Routes
touch routes/{authRoutes.js,investmentRoutes.js,portfolioRoutes.js,eventRoutes.js,playerRoutes.js,gameRoutes.js,transactionRoutes.js}

# Middlewares
touch middlewares/{authMiddleware.js,errorHandler.js,validateRequest.js}

# Utils
touch utils/{gameHelper.js,investmentHelper.js,randomEventHelper.js,transactionHelper.js,formatMoney.js,sendEmail.js}

# Config
touch config/{db.js,dotenvConfig.js,gameConfig.js}

# Other files
touch {.env,server.js,package.json,README.md}

echo "Backend structure for monopoly-investment-game-backend created successfully!"
