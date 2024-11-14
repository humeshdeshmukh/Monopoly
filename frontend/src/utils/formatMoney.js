// Utility function to format a number as currency
export const formatMoney = (amount) => {
    // Ensure the amount is a valid number
    if (isNaN(amount)) {
      return "$0.00"; // Return $0.00 if the amount is not a valid number
    }
  
    // Convert the amount to a fixed number with two decimals and format as currency
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  
  // Utility function to format a large number as currency without decimals
  export const formatMoneyNoDecimals = (amount) => {
    if (isNaN(amount)) {
      return "$0"; // Return $0 if the amount is not a valid number
    }
  
    return "$" + amount.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  
  // Utility function to format a money string with a specific currency symbol (optional)
  export const formatMoneyWithCurrency = (amount, currencySymbol = "$") => {
    if (isNaN(amount)) {
      return `${currencySymbol}0.00`; // Return a default currency format if amount is invalid
    }
  
    return currencySymbol + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  