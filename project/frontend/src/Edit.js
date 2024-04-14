import React from 'react';
import './Edit.css'; // make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

function Edit() {
    const [transactionId, amount, date] = ""; 
    const navigate = useNavigate();
    // You would add state and event handlers here as needed
    const handleBack = () => {
      navigate(-1);
    };
  

  return (
    <div className="edit-transaction-page">
      
      <div className="edit-transaction-container">
        <h2>Editing Transaction: #{transactionId}</h2>
        <input
          className="transaction-id-input"
          type="text"
          value={transactionId}
          
          placeholder="Enter transaction ID"
        />
        
      </div>
      
      <input
        type="text"
        value={amount}
        placeholder="Enter new amount"
      />
      <input
        type="date"
        value={date}
      />
      <button className="update-button" >Update Transaction</button>
      <button className="delete-button" >Delete Transaction</button>
      <button className="back-button" onClick={() => handleBack()}>Back</button>
    </div>
    
  );
}

export default Edit; 