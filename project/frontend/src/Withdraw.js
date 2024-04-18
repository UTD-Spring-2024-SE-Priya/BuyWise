import React , { useRef } from 'react';
import './Withdraw.css'; // Ensure that the path to your CSS file is correct
import { useNavigate , useParams } from 'react-router-dom';

function Withdraw() {
    const navigate = useNavigate();
    const { username , groupID , groupName } = useParams();
    const amountRef = useRef(null);
    const date = useRef(null);
    // You would add state and event handlers here as needed
    const handleBack = () => {
      navigate(-1);
    };

    const handleWithdraw = async e => {
      e.preventDefault();
      try {
        await withdraw(amountRef.current.value , groupID);
        console.log("success");
        navigate(`../home/${username}/${groupID}`);
      } catch (error) {
        console.log(error);
      }
    }

    const withdraw = async (withdrawAmount, groupID) => {

      if (!withdrawAmount){
        throw new Error("Value cannot be empty");
      }

      if (withdrawAmount < 0){
          throw new Error("Value cannot be negative");
      }
      let data = null;
      
      try {  
          const data = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
          const json = await data.json();
          const initialBalance = parseFloat(json.groups[0].balance);
          if (initialBalance < parseFloat(withdrawAmount)){
            throw new Error("Not enough balance in your account");
        }
          console.log(json);
          try {
              const response = await fetch(`http://localhost:5050/update/balance/${json.groups[0]._id}`, {
                  method : "PATCH",
                  headers : {
                      "Content-type" : "application/json"
                  },
                  body: JSON.stringify({
                      "balance" : initialBalance - parseFloat(withdrawAmount)
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
    <div className="withdraw-wrapper">
      <div className="withdraw-event">
        <h2>Withdraw from account: {groupName}</h2>
        <form className="withdraw-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" placeholder="Ex: 85" ref={amountRef} required />
            <label htmlFor="date">Date</label>
            <input type="string" id="date" name="date" placeholder="Ex: May 10" ref={date} required />
          </div>
          <button type="submit" className="withdraw-button" onClick={handleWithdraw} >Withdraw </button>
        </form>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Withdraw;
