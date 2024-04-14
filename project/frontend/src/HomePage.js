import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

const username = "Superman"; 


function HomePage() {
  const navigate = useNavigate();


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Individual Account Dashboard: {username}</h1>
        <button className="button finance-management" onClick={() => navigate('/group-management')}>
          Group Finance Management
        </button>
      </header>
      <section className="dashboard-details">
        <div className="account-details">
          <h2>Account Details</h2>
          <button className="button" onClick={() => navigate('/edit')}>Edit</button>
          <button className="button" onClick={() => navigate('/Deposit')}>Deposit</button>
          <button className="button" onClick={() => navigate('/Withdraw')}>Withdraw</button>
          <button className="button settings" onClick={() => navigate('/settings')}>Settings</button>
        </div>
        <div className="financial-summary">
          <div className="financial-item balance">
            <label>Account Balance</label>
            <div>$12,345.67</div>
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
            
            {/* Dummy graph here. Use a library like Chart.js or similar */}
          </div>
          <div className="chart transaction-history">
            <h3>Transaction History</h3>
            {/* Dummy graph here. Use a library like Chart.js or similar */}
          </div>
        </div>
        <button className="button back" onClick={() => navigate(-1)}>Back</button>
      </section>
    </div>
  );
}


export default HomePage;