// Function to calculate ROI for a property investment
export const calculatePropertyROI = (initialValue, rentalIncome, holdingPeriod) => {
    if (holdingPeriod <= 0) {
      throw new Error('Holding period must be greater than 0');
    }
  
    // ROI formula: (Rental Income * Holding Period) / Initial Investment
    const roi = (rentalIncome * holdingPeriod) / initialValue;
    return roi * 100; // Return ROI as a percentage
  };
  
  // Function to calculate ROI for stock investments
  export const calculateStockROI = (purchasePrice, currentPrice, dividendIncome) => {
    if (purchasePrice <= 0) {
      throw new Error('Purchase price must be greater than 0');
    }
  
    // ROI formula: (Current Value + Dividend Income - Initial Investment) / Initial Investment
    const roi = (currentPrice + dividendIncome - purchasePrice) / purchasePrice;
    return roi * 100; // Return ROI as a percentage
  };
  
  // Function to calculate ROI for a generic investment (e.g., business, stocks, property)
  export const calculateInvestmentROI = (initialInvestment, finalValue, earnings) => {
    if (initialInvestment <= 0) {
      throw new Error('Initial investment must be greater than 0');
    }
  
    // ROI formula: (Final Value + Earnings - Initial Investment) / Initial Investment
    const roi = (finalValue + earnings - initialInvestment) / initialInvestment;
    return roi * 100; // Return ROI as a percentage
  };
  