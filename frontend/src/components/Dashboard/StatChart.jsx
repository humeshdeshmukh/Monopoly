// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatChart = ({ data, chartType }) => {
  // Data for the chart
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Player Statistics',
        data: data.values,
        borderColor: '#4caf50', // Line color for line chart
        backgroundColor: '#4caf50', // Bar color for bar chart
        fill: chartType === 'line' ? true : false, // Only fill the line chart area
        tension: 0.4, // Smoothness of the line
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Player Stats Over Time',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  // Render the selected chart type
  return (
    <div className="stat-chart">
      {chartType === 'line' ? (
        <Line data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

// Prop validation
StatChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
  }).isRequired,
  chartType: PropTypes.oneOf(['line', 'bar']).isRequired,
};

export default StatChart;
