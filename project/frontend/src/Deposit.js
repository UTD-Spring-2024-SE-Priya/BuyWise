import React from 'react';
import './Deposit.css'; // Ensure that the path to your CSS file is correct

function Deposit() {
  // You would add state and event handlers here as needed

  return (
    <div className="deposit-wrapper">
      <div className="deposit-event">
        <h2>Deposit</h2>
        <form className="deposit-form">
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input type="date" id="start-date" name="start-date" required />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" required />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <select id="frequency" name="frequency" required>
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button type="submit" className="deposit-button">Add Deposit</button>
        </form>
        <button className="back-button">Back</button>
      </div>
    </div>
  );
}

export default Deposit;
