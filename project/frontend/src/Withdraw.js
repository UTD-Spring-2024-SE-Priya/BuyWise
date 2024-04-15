import React from 'react';
import './Withdraw.css'; // Ensure that the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';

function Withdraw() {
    const navigate = useNavigate();
    // You would add state and event handlers here as needed
    const handleBack = () => {
      navigate(-1);
    };
  

  return (
    <div className="withdraw-wrapper">
      <div className="withdraw-event">
        <h2>Withdraw</h2>
        <form className="withdraw-form">
          <div className="form-group">
            <label htmlFor="withdraw-date">Date</label>
            <input type="date" id="withdraw-date" name="withdraw-date" required />
          </div>
          <div className="form-group">
            <label htmlFor="withdraw-amount">Amount</label>
            <input type="number" id="withdraw-amount" name="withdraw-amount" required />
          </div>
          <button type="submit" className="withdraw-button">Withdraw</button>
        </form>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Withdraw;
