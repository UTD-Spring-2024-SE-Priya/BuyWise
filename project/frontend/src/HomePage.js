import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  const [groups, setGroups] = useState([]); // State to store groups data
  const { username , groupID } = useParams(); // Get username from URL params
  const [data , setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      const fetchData = async () => {
          try {
              // Perform API call to fetch user data
              const response = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
              const userData = await response.json();
              // Extract groups array from user data
              const { groups } = userData;
              const index = await groups.findIndex(group => group._id === groupID);
              // Set the groups state with the fetched data
              setGroups(groups);
              setData(index);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      // Call fetchGroups function when component mounts
      fetchData();
  }, ); // Fetch data whenever the username changes

  return (
    <div className="dashboard-container">
        <header className="dashboard-header">
            <h1>Account: {username}'s {groups.length > 0 && data !== undefined && groups[data].name}</h1>
        </header>
        <h3>Users : {groups.length > 0 && data !== undefined && groups[data].users.split(',').join(', ')}</h3>
        <section className="dashboard-details">
            <div className="account-details">
                <h2>Account Details</h2>
                <button className="button" onClick={() => navigate(`/deposit/${username}/${groupID}/${groups[data].name}`)}>Deposit</button>
                <button className="button" onClick={() => navigate(`/Withdraw/${username}/${groupID}/${groups[data].name}`)}>Withdraw</button>
                <button className="button finance-management" onClick={() => navigate(`../GroupManagement/${username}`)}>
                    Back
                </button>
            </div>
            <div className="financial-summary">
                <div className="financial-item balance">
                    <label>Account Balance</label>
                    <div>${groups.length > 0 && data !== undefined && groups[data].balance}</div>
                </div>
                <div className="financial-item transaction">
                    <label>Transaction history</label>
                        
                            {groups.length > 0 && data !== undefined && groups[data].transactions.map((transaction, index) => (
                                <menu key={index}>
                                    <div>{transaction}</div>
                                </menu>
                            ))}
                        
                </div>
            </div>
        </section>
    </div>
);

}

export default HomePage;
