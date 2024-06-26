// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GroupManagement from './GroupManagement';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import CreateGroup from './CreateGroup';
import LoginForm from './LoginForm';
import Edit from './Edit'; 
import Settings from './Settings';
import Reset from './Reset';


export default function App() {
  // Define the chart data somewhere appropriate or fetch it from an API

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home/:username/:groupID" element={<HomePage />} />
        <Route path="/GroupManagement/:username" element={<GroupManagement />} />
        <Route path="/deposit/:username/:groupID/:groupName" element={<Deposit />} />
        <Route path="/withdraw/:username/:groupID/:groupName" element={<Withdraw />} />
        <Route path="/GroupManagement/:username/create" element={<CreateGroup />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Reset" element={<Reset />} />
        {/* Route for the Line Chart. Adjust the path as needed */}
        
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}
