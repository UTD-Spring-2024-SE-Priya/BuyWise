import React from 'react';
import { Line } from 'react-chartjs-2';

import { Data } from './Data'; // Adjust the import path as needed

function LineChart() {
  const chartData = {
    labels: Data.map(data => data.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: Data.map(data => data.userGain),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
      },
      {
        label: 'Users Lost',
        data: Data.map(data => data.userLost),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
      }
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h4>User Statistics</h4>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
