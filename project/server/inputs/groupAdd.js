import { ObjectId } from "mongodb";

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
                "users" : userList,
                transactions : []
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

export const addGroup = async (username , accountName , balance, users) => {
    try {
        validateName(accountName);
        validateBalance(balance);
        let userList;
        userList = await validateUserList(users , username);
        let ID = new ObjectId();
        let allUsers = userList.split(",");
        for (const user of allUsers){
            await addUserGroup(user , accountName , balance  , ID , userList);
        }
        return ID;
    } catch (error) {
        throw error;
    }
}

export default addGroup;