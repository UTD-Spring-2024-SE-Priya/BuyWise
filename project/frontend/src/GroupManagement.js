import React from 'react';
import './GroupManagement.css'; // make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

function GroupManagement() {
  // Mock data for the groups
  const groups = [
    { name: 'ACM', balance: '2,500.00', joined: 'Jan 12, 2023' },
    { name: 'AIS', balance: '1,200.00', joined: 'Feb 9, 2023' },
    { name: 'Pony Club', balance: '3,750.00', joined: 'Mar 5, 2023' },
  ];

  const navigate = useNavigate();

  // Function to handle the back button click
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="group-management-container">
      <h2>My Groups</h2>
      <div className="group-list">
        {groups.map((group) => (
          <div key={group.name} className="group-item">
            <h3>{group.name}</h3>
            <p>Group Balance: ${group.balance}</p>
            <p>Date Joined: {group.joined}</p>
          </div>
        ))}
      </div>
      <button className="create-group-btn">Create Group</button>
      <button className="back-btn" onClick={handleBack}>Back</button>
    </div>
  );
}

export default GroupManagement;
