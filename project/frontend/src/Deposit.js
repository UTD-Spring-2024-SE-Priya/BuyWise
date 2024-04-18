import React, { useRef, useState } from 'react';
import './Deposit.css';
import { useNavigate, useParams } from 'react-router-dom';

function Deposit() {
  const navigate = useNavigate();
  const { username, groupID, groupName } = useParams();
  const amountRef = useRef(null);
  const [description, setDescription] = useState('');
  const [dateValue, setDateValue] = useState(''); 

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeposit = async e => {
    e.preventDefault();
    try {
      await deposit(amountRef.current.value, description, groupID);
      console.log("success");
      navigate(`../home/${username}/${groupID}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const deposit = async (depositAmount, description, groupID) => {
    if (!depositAmount) {
      throw new Error("Value cannot be empty");
    }
    if (depositAmount < 0) {
      throw new Error("Value cannot be negative");
    }
    try {  
      const response = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch group data");
      }
      const json = await response.json();
      const initialBalance = parseFloat(json.groups[0].balance);
      const updateResponse = await fetch(`http://localhost:5050/update/balance/${json.groups[0]._id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "balance": initialBalance + parseFloat(depositAmount) })
      });
      if (!updateResponse.ok) {
        throw new Error("Deposit unsuccessful");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="deposit-wrapper">
      <div className="deposit-event">
        <h2>Deposit to account: {groupName}</h2>
        <form className="deposit-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" placeholder="Ex: 85" ref={amountRef} required />
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={dateValue} onChange={handleDateChange} required />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} placeholder="Ex: Food for event" />
          </div>
          <button type="submit" className="deposit-button" onClick={handleDeposit}>Add Deposit</button>
        </form>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Deposit;
