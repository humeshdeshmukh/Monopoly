import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from './App'; // Import the main App component
import { BrowserRouter as Router } from 'react-router-dom'; // For routing if you have multiple pages

// Rendering the root component to the DOM
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <Router> {/* Wrapping the app with Router if you use React Router */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // Root div where the app will be rendered
);
