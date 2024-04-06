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

const validateUserList = (users , username) => {
    if (users === ''){
       return username;
    }
    users += "," + username;
    return users;
}

async function addUserGroup(username , accountName , balance , users){
   

    try {
        const response = await fetch(`http://localhost:5050/update/addAccount/${username}` , {
            method : "PATCH",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                "newAccount" : {
                "name" : accountName,
                _id : new ObjectId(),
                "balance" : balance,
                "users" : users
                }
            })
        });
        if (!response.ok) {
            throw new Error("Failed to add group");
          }
      
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
        userList = validateUserList(users , username);
        await addUserGroup(username , accountName , balance , userList);
    } catch (error) {
        throw error;
    }
}

export default addGroup;