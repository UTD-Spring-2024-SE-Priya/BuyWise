import React from 'react';
import './GroupManagement.css'; // make sure to create this CSS file
import { useNavigate , useParams } from 'react-router-dom';

async function GroupManagement() {
  
  const { username } = useParams();
  let jsonData;
  console.log(username);

  try {
    const data = await fetch(`http://localhost:5050/username/${username}`);
    jsonData = await data.json();
    console.log(jsonData);
  } catch (error) {
    throw new Error(error);
  }

  const { groups } = jsonData;
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
            <p>Group Balance: {group.balance}</p>
          </div>
        ))}
      </div>
      <button className="button edit" onClick={() => navigate('/create')}>Create Group</button>
      <button className="back-btn" onClick={handleBack}>Back</button>
    </div>
  );
}

export default GroupManagement;
