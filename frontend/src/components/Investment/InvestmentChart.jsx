// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2'; // Chart.js React wrapper
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './InvestmentChart.css';

// Register the chart components required for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InvestmentChart = ({ investmentData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (investmentData) {
      const labels = investmentData.map(item => item.date); // Extract dates for x-axis
      const data = investmentData.map(item => item.value); // Extract values for y-axis

      // Prepare the chart data structure
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Investment Value Over Time',
            data: data,
            borderColor: '#4caf50', // Green color for the line
            backgroundColor: 'rgba(76, 175, 80, 0.2)', // Light green for the area under the line
            fill: true, // Fill area under the line
            tension: 0.4, // Line smoothness
            pointRadius: 5, // Point size
            pointHoverRadius: 8, // Point size on hover
            pointBackgroundColor: '#fff', // Point background color
            pointBorderColor: '#4caf50', // Point border color
          },
        ],
      });
    }
  }, [investmentData]);

  // Render the chart only if we have valid chart data
  return (
    <div className="investment-chart-container">
      <h2>Investment Growth Over Time</h2>
      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

// Chart options for customization
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Investment Growth',
      font: {
        size: 18,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10, // To avoid clutter
      },
    },
    y: {
      title: {
        display: true,
        text: 'Investment Value',
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

// Prop validation
InvestmentChart.propTypes = {
  investmentData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Date of investment entry
      value: PropTypes.number.isRequired, // Value of investment at that point in time
    })
  ).isRequired,
};

export default InvestmentChart;
