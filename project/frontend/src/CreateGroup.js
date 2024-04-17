import React, { useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import './CreateGroup.css';
import ObjectID from 'bson-objectid';

function CreateGroup() {
  const navigate = useNavigate();
  // Add state variables for the form inputs
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [startingMoney, setStartingMoney] = useState('');
  const [userEmails, setUserEmails] = useState('');
  const { username } = useParams();

  const validateName = (accountName) => {
    if (!accountName || accountName.trim() === '') {
        throw new Error("account name cannot be empty");
      }
}

const validateBalance = (balance) => {
    if (!balance || balance.trim() === '') {
        throw new Error("Value cannot be empty");
    }

    if (balance < 0){
        throw new Error("Value cannot be negative");
    }
    
    if (!/^\d+(\.\d+)?$/.test(balance.trim())) {
        throw new Error("Value is not a number");
    }
    
}

const validateUserList = async (users, username) => {
    if (!users.trim()) {
        return username;
    }

    if (/\s/.test(users)) {
        throw new Error("User list cannot contain spaces");
    }

    if (/,{2,}|,$/.test(users)) {
        throw new Error("Invalid input: Multiple consecutive commas or comma at the end");
    }


    users += "," + username;

    let splitArray = users.split(",");

    for (const user of splitArray){
        if (!await checkUsernameExists(user.trim())) {
            throw new Error(`User does not exist`);
        }
    }

    return users;
}

const checkUsernameExists = async (username) => {
    try {
        const response = await fetch(`http://localhost:5050/username/${username}`);
        return response.ok; // Returns true if user exists, false otherwise
    } catch (error) {
        console.error("Error checking user existence:", error.message);
        throw new Error("Failed to check user existence");
    }
}


async function addUserGroup(username , accountName , balance , id , userList){
   

    try {
        const response = await fetch(`http://localhost:5050/update/addAccount/${username}` , {
            method : "PATCH",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                "newAccount" : {
                "name" : accountName,
                _id : id,
                "balance" : parseFloat(balance),
                "users" : userList
                }
            })
        });
        if (!response.ok) {
            throw new Error("Failed to add group");
          }
          const data  = await response.json();
          return data.groupID;
          
        } catch (error) {
          console.error("Error adding group:", error.message);
          throw error;
}
}

const addGroup = async (username , accountName , balance, users) => {
    try {
        validateName(accountName);
        validateBalance(balance);
        let userList;
        userList = await validateUserList(users , username);
        let ID = new ObjectID();
        let allUsers = userList.split(",");
        for (const user of allUsers){
            await addUserGroup(user , accountName , balance  , ID , userList);
        }
        return ID;
    } catch (error) {
        throw error;
    }
}

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const objID = new ObjectID();
    const stringObjID = objID.toString();
    console.log({
      stringObjID,
      username,
      groupName,
      description,
      startingMoney,
      userEmails
    });

    try {
      await addGroup (username , groupName , startingMoney , userEmails);
      console.log("success");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    
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
          placeholder="Add users by username"
          value={userEmails}
          onChange={(e) => setUserEmails(e.target.value)}
        />
        <button type="submit" className="create-group-button">Create Group</button>
      </form>
      <button onClick={goBack} className="back-button">Back</button>
    </div>
  );
}

export default CreateGroup;
