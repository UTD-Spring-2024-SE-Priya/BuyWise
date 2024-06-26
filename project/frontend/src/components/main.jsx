import React from 'react';
import './main.css'; // Import your main CSS file
import { useParams } from 'react-router-dom';


const FinancialDashboard = () => {
    const { username } = useParams();
        return (
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Individual Account Dashboard</h1>
                    <button className="button finance-management">Group Finance Management</button>
                </header>
                <section className="dashboard-details">
                    <div className="account-details">
                        <h2>Account for : {username}</h2>
                        <button className="button edit">Edit</button>
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
                            <div className="chart-placeholder">Daily Balance Chart Here</div>
                        </div>
                        <div className="chart transaction-history">
                            <h3>Transaction History</h3>
                            <div className="history-placeholder">History</div>
                        </div>
                    </div>
                    <button className="button back">Back</button>
                </section>
            </div>
        );
    };


export default FinancialDashboard;
