import React from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';


function Settings() {
  // You would replace these with actual data, perhaps from state or props
  const accountBalance = "$12,345.67";
  const monthlyIncome = "$3,210.00";
  const monthlyExpenses = "$1,890.50";

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleBack1 = () => {
    navigate(-2);
  };

  return (
    <div className="finance-page">
      <header className="finance-header">
        <h1>Personal Finance: Settings</h1>
        <button className="logout-button" onClick={() =>handleBack1()}>Log Out</button>
      </header>
      <div className="finance-info">
        <div className="finance-item balance">
          <h2>Account Balance</h2>
          <p>{accountBalance}</p>
        </div>
        <div className="finance-item income">
          <h2>Monthly Income</h2>
          <p>{monthlyIncome}</p>
        </div>
        <div className="finance-item expenses">
          <h2>Monthly Expenses</h2>
          <p>{monthlyExpenses}</p>
        </div>
      </div>

      <div className="settings-section">
        <h2>Settings</h2>
        <ul className="settings-list">
          <li>Edit Profile Information</li>
          <li>Change Password</li>
          <li>Manage Notifications</li>
          <li>Delete Account</li>
        </ul>
      </div>
      <button className="back-button" onClick={() =>handleBack()}>Back</button>
    </div>
  );
}

export default Settings;
