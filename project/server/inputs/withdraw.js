import e from "express";

const withdraw = async (username, withdrawAmount, groupID) => {
 // Check if withdrawAmount is null or empty
if (!withdrawAmount || withdrawAmount.trim() === '') {
    throw new Error("Value cannot be empty");
}

if (withdrawAmount < 0){
    throw new Error("Value cannot be negative");
}
let data = null;


// Check if withdrawAmount is a valid number
if (!/^\d+(\.\d+)?$/.test(withdrawAmount.trim())) {
    throw new Error("Value is not a number");
}
    let response = null; // Declare a variable to hold the response
    try {
        // Await the fetch request and store the response
        response = await fetch(`http://localhost:5050/${username}/${groupID}`);
        if (!response.ok) {
            throw new Error("Username group combo not found");
        }
        // Parse the response body as JSON
        data = await response.json();
        const groupIndex = data.groups.findIndex(group => group._id === groupID);
        if (data.groups[groupIndex].balance < parseFloat(withdrawAmount)) {
            throw new Error("Not enough balance in your account");
        }
    } catch (error) {
        throw new Error(error);
    }

    try {
        const groupIndex = data.groups.findIndex(group => group._id === groupID);
        let updateResponse = await fetch(`http://localhost:5050/update/${username}/${groupID}` , {
            method : "PATCH" ,
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "balance": data.groups[groupIndex].balance - parseFloat(withdrawAmount)
            })
        });
        if (!updateResponse.ok){
            throw new Error("Withdraw unsuccessful");
        }
    } catch (error) {
        console.log(error);
    }



};


export default withdraw;