import React from 'react';
import './login.css';
import LoginForm from './LoginForm';
import HomePage from './HomePage'; 
import Deposit from './Deposit'; 
import GroupManagement from './GroupManagement';
import Withdraw from './Withdraw';
import CreateGroup from './CreateGroup';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"; // Fixed the import statement


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/GroupManagement" element={<GroupManagement />} />
        <Route path="/Deposit" element={<Deposit />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/create" element={<CreateGroup />} />
        {/* If you have a FinancialDashboard Route, uncomment below */}
        {/* <Route path="/dashboard" element={<FinancialDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App; // Removed the duplicate export default statement
