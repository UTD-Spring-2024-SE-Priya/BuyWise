import React, { useRef, useState } from 'react';
import './Withdraw.css';
import { useNavigate, useParams } from 'react-router-dom';

function Withdraw() {
  const navigate = useNavigate();
  const { username, groupID, groupName } = useParams();
  const amountRef = useRef(null); // Still using ref here for simplicity in this specific use case
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // Using controlled component for date

  const handleBack = () => {
    navigate(-1);
  };

 
  const handleWithdraw = async e => {
    e.preventDefault();
    const withdrawAmount = amountRef.current.value;
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }
    try {
      await withdraw(withdrawAmount, groupID);
      await transaction(date , amountRef.current.value , description , groupID , username);
      console.log("Withdrawal successful");
      navigate(`../home/${username}/${groupID}`);
    } catch (error) {
      alert("Withdrawal failed: " + error.message);
      console.error(error);
    }
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const withdraw = async (withdrawAmount, groupID) => {
    const response = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
    if (!response.ok) {
      throw new Error("Failed to fetch group data");
    }
    const json = await response.json();
    const { groups } = json;

    const index = await groups.findIndex(group => group._id === groupID);
    const initialBalance = parseFloat(json.groups[index].balance);

    if (initialBalance < parseFloat(withdrawAmount)) {
      throw new Error("Not enough balance in your account");
    }

    const updateResponse = await fetch(`http://localhost:5050/update/balance/${json.groups[index]._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "balance": initialBalance - parseFloat(withdrawAmount)
      })
    });

    if (!updateResponse.ok) {
      throw new Error("Withdrawal unsuccessful");
    }
  };

  const transaction = async (date , amount , description , groupID , username) => {

    console.log(date);
    console.log(amount);
    console.log(description);
    console.log(groupID);
    console.log(username);


    let transactionToAdd = date + " : " + username +  " withdrew " + amount + " : " + description;

  
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
    <div className="withdraw-wrapper">
      <div className="withdraw-event">
        <h2>Withdraw from account: {groupName}</h2>
        <form className="withdraw-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" placeholder="Ex: 85" ref={amountRef} required />
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={date} onChange={handleDateChange} required />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} placeholder="Ex: Food for event" />
          </div>
          <button type="submit" className="withdraw-button" onClick={handleWithdraw}>Withdraw</button>
        </form>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Withdraw;
