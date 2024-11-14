// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './FinancialDashboard.css';

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const FinancialDashboard = ({ currentPlayer, assets, liabilities }) => {
  // State to hold financial data for chart and other components
  const [financialData, setFinancialData] = useState({
    balanceHistory: [currentPlayer.balance],
    assetHistory: [assets],
    liabilityHistory: [liabilities],
  });

  // Effect to simulate or update financial data (could be replaced with actual API calls)
  useEffect(() => {
    // Simulating financial data updates over time for demo purposes
    const interval = setInterval(() => {
      setFinancialData(prevData => {
        const newBalance = prevData.balanceHistory[prevData.balanceHistory.length - 1] + (Math.random() * 200 - 100); // Random change to balance
        const newAssets = prevData.assetHistory[prevData.assetHistory.length - 1] + (Math.random() * 100 - 50); // Random asset growth
        const newLiabilities = prevData.liabilityHistory[prevData.liabilityHistory.length - 1] - (Math.random() * 50); // Liability reduction

        return {
          balanceHistory: [...prevData.balanceHistory, newBalance],
          assetHistory: [...prevData.assetHistory, newAssets],
          liabilityHistory: [...prevData.liabilityHistory, newLiabilities],
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Chart.js data setup
  const chartData = {
    labels: Array.from({ length: financialData.balanceHistory.length }, (_, i) => `Turn ${i + 1}`),
    datasets: [
      {
        label: 'Balance',
        data: financialData.balanceHistory,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Assets',
        data: financialData.assetHistory,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Liabilities',
        data: financialData.liabilityHistory,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="financial-dashboard">
      <h2 className="dashboard-header">Financial Dashboard</h2>
      <div className="financial-info">
        {/* Player's Current Balance */}
        <div className="financial-card">
          <h3>Balance</h3>
          <p className="financial-amount">${currentPlayer.balance.toFixed(2)}</p>
        </div>

        {/* Player's Assets */}
        <div className="financial-card">
          <h3>Assets</h3>
          <p className="financial-amount">${assets.toFixed(2)}</p>
        </div>

        {/* Player's Liabilities */}
        <div className="financial-card">
          <h3>Liabilities</h3>
          <p className="financial-amount">${liabilities.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart Section for Financial Visualization */}
      <div className="financial-chart">
        <h3>Financial Overview</h3>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Financial Performance Over Time',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Turns',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount ($)',
              },
              beginAtZero: true,
            },
          },
        }} />
      </div>
    </div>
  );
};

// PropTypes for validation
FinancialDashboard.propTypes = {
  currentPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  assets: PropTypes.number.isRequired,
  liabilities: PropTypes.number.isRequired,
};

export default FinancialDashboard;
