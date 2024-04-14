import React from 'react';
import './login.css';
import LoginForm from './LoginForm';
import HomePage from './HomePage'; 
//import FinancialDashboard from "./components/main"; // Make sure this component exists and is exported
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"; // Fixed the import statement
import GroupManagement from './GroupManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/GroupManagement" element={<GroupManagement />} />
        <Route path="/Deposit" element={<Deposit />} />
        {/* If you have a FinancialDashboard Route, uncomment below */}
        {/* <Route path="/dashboard" element={<FinancialDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App; // Removed the duplicate export default statement
