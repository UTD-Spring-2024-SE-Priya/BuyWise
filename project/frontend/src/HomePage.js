import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HomePage.css'




function HomePage() {
  const navigate = useNavigate();
  const { username , groupID, balance , groupName , groupUsers } = useParams();


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Account: {username}'s {groupName}</h1>
      </header>
      <h3>Users : {groupUsers}</h3>
      <section className="dashboard-details">
        <div className="account-details">
          <h2>Account Details</h2>
          <button className="button" onClick={() => navigate(`/deposit/${username}/${groupID}/${balance}/${groupName}/${groupUsers}`)}>Deposit</button>
          <button className="button" onClick={() => navigate(`/Withdraw/${username}/${groupID}/${balance}/${groupName}/${groupUsers}`)}>Withdraw</button>
          <button className="button finance-management" onClick={() => navigate(`../GroupManagement/${username}`)}>
          back
        </button>
        </div>
        <div className="financial-summary">
          <div className="financial-item balance">
            <label>Account Balance</label>
            <div>${balance}</div>
          </div>
          
  
        </div>
        
      </section>
    </div>
  );
}


export default HomePage;