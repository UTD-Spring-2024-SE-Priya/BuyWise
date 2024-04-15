import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HomePage.css'




function HomePage() {
  const navigate = useNavigate();
  const { username , groupID, balance , groupName } = useParams();


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Account for: {username}</h1>
        <button className="button finance-management" onClick={() => navigate(`../GroupManagement/${username}`)}>
          back to groups
        </button>
      </header>
      <section className="dashboard-details">
        <div className="account-details">
          <h2>Account Details</h2>
          <button className="button" onClick={() => navigate('/edit')}>Edit</button>
          <button className="button" onClick={() => navigate(`/deposit/${username}/${groupID}/${balance}/${groupName}`)}>Deposit</button>
          <button className="button" onClick={() => navigate(`/Withdraw/${username}/${groupID}/${balance}/${groupName}`)}>Withdraw</button>
          <button className="button settings" onClick={() => navigate('/settings')}>Settings</button>
        </div>
        <div className="financial-summary">
          <div className="financial-item balance">
            <label>Account Balance</label>
            <div>${balance}</div>
          </div>
          <div className="financial-item income">
            <label>Monthly Income</label>
            <div>$3,210.00</div>
          </div>
          <div className="financial-item expenses">
            <label>Monthly Expenses</label>
            <div>$1,890.50</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart daily-balance-chart">
            <h3>Daily Balance Chart</h3>
            
          </div>
          <div className="chart transaction-history">
            <h3>Transaction History</h3>
            
          </div>
        </div>
        
      </section>
    </div>
  );
}


export default HomePage;