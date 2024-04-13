import React from 'react';
import './main.css'; // Import your main CSS file

class FinancialDashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-container">
                <nav className="header-section">
                    <div className="account-details">
                        <h1>Account Details</h1>
                        <button aria-label="Settings" className="settings-button">Settings</button>
                    </div>
                </nav>
                <button className="group-button">Group Finance Management</button>
                <main>
                    <section className="financial-summary">
                        <div className="monthly-expenses">
                            <span className="amount">$1,890.50</span>
                            <span className="label">Monthly Expenses</span>
                        </div>
                        <div className="monthly-income">
                            <span className="amount">$3,210.00</span>
                            <span className="label">Monthly Income</span>
                        </div>
                        <div className="account-balance">
                            <span className="amount">$12,345.67</span>
                            <span className="label">Account Balance</span>
                        </div>
                    </section>
                    <section className="action-buttons">
                        <button className="withdraw-button">Withdraw</button>
                        <button className="deposit-button">Deposit</button>
                        <button className="edit-button">Edit</button>
                    </section>
                    <section className="charts-container">
                        <div className="chart-container">
                            <h2>Daily Balance Chart</h2>
                            <canvas id="dailyBalanceChart"></canvas>
                        </div>
                        <div className="chart-container">
                            <h2>History Chart</h2>
                            <canvas id="historyChart"></canvas>
                        </div>
                    </section>
                </main>
                <footer className="footer-section">
                    <button className="history-button">History</button>
                </footer>
                <nav className="navigation">
                    <button className="back-button">Back</button>
                </nav>
            </div>
        );
    }
}

export default FinancialDashboard;
