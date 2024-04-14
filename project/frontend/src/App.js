// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GroupManagement from './GroupManagement';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import CreateGroup from './CreateGroup';
import LineChart from './LineChart'; // Import LineChart component
import LoginForm from './LoginForm';
import Edit from './Edit'; 
import Settings from './Settings';


export default function App() {
  // Define the chart data somewhere appropriate or fetch it from an API
  const chartData = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: 'Users Gained',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/GroupManagement" element={<GroupManagement />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/create" element={<CreateGroup />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/settings" element={<Settings />} />
        {/* Route for the Line Chart. Adjust the path as needed */}
        <Route path="/line-chart" element={<LineChart chartData={chartData} />} />
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}
