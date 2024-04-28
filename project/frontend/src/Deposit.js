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
    const depositAmount = amountRef.current.value;
    if (!depositAmount || depositAmount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }
    try {
      await deposit(amountRef.current.value, groupID);
      await transaction(dateValue , amountRef.current.value , description , groupID , username);
      console.log("success");
      navigate(`../home/${username}/${groupID}`);
    } catch (error) {
      alert("Deposit failed : " + error.message);
      console.log(error);
    }
  }

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const deposit = async (depositAmount, groupID) => {
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
      const { groups } = json;
      const index = await groups.findIndex(group => group._id === groupID);

      const initialBalance = parseFloat(json.groups[index].balance);
      const updateResponse = await fetch(`http://localhost:5050/update/balance/${json.groups[index]._id}`, {
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

  const transaction = async (date , amount , description , groupID , username) => {

    console.log(date);
    console.log(amount);
    console.log(description);
    console.log(groupID);
    console.log(username);


    let transactionToAdd = date + " : " + username +  " deposited " + amount + " : " + description;

  
    try {
      const response = await fetch(`http://localhost:5050/add/transaction/${groupID}`, {
        method : "PATCH",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          "transaction" : transactionToAdd
        })
      });
  
      if (!response.ok){
        throw new Error("Transaction add unsuccessful");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

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
