import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css'


function CreateGroup() {
  const navigate = useNavigate();
  // Add state variables for the form inputs
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [startingMoney, setStartingMoney] = useState('');
  const [userEmails, setUserEmails] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // Handle the group creation logic
    console.log({
      groupName,
      description,
      startingMoney,
      userEmails: userEmails.split(',').map(email => email.trim()) // Split the emails by comma and trim spaces
    });
    // Redirect to group management or display success message
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="create-group-container">
      <h2>Create Group</h2>
      <form onSubmit={handleCreateGroup} className="create-group-form">
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
        <textarea
          placeholder="Group description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter starting money"
          value={startingMoney}
          onChange={(e) => setStartingMoney(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Add users by email"
          value={userEmails}
          onChange={(e) => setUserEmails(e.target.value)}
          required
        />
        <button type="submit" className="create-group-button">Create Group</button>
      </form>
      <button onClick={goBack} className="back-button">Back</button>
    </div>
  );
}

export default CreateGroup;
