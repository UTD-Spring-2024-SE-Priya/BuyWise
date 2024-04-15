import React, { useRef } from 'react';
import './Deposit.css'; // Ensure that the path to your CSS file is correct
import { useNavigate , useParams } from 'react-router-dom';

function Deposit() {
    const navigate = useNavigate();
    const { username , groupID , balance } = useParams();
    const amountRef = useRef(null);
  // You would add state and event handlers here as needed
  const handleBack = () => {
    navigate(-1);
  };

  const handleDeposit = async e => {
    e.preventDefault();
    try {
      await deposit(amountRef.current.value , groupID);
      console.log("success");
      navigate(`../home/${username}/${groupID}/${parseFloat(balance) + parseFloat(amountRef.current.value)}`);
    } catch (error) {
      console.log(error);
    }
  }

  const deposit = async (depositAmount, groupID) => {

    if (depositAmount < 0){
        throw new Error("Value cannot be negative");
    }
    let data = null;
    
    try {  
        const data = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
        const json = await data.json();
        const initialBalance = parseFloat(json.groups[0].balance);
        console.log(json);
        try {
            const response = await fetch(`http://localhost:5050/update/balance/${json.groups[0]._id}`, {
                method : "PATCH",
                headers : {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    "balance" : initialBalance + parseFloat(depositAmount)
                })
            });
            if (!response.ok){
                throw new Error("Deposit unsuccessful");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
       
    } catch (error) {
        throw new Error(error);
    }
};




  return (
    <div className="deposit-wrapper">
      <div className="deposit-event">
        <h2>Deposit</h2>
        <form className="deposit-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" ref={amountRef} required />
          </div>
          <button type="submit" className="deposit-button" onClick={handleDeposit}>Add Deposit</button>
        </form>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Deposit;
