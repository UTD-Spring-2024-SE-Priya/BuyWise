
const withdraw = async (withdrawAmount, groupID) => {
 // Check if withdrawAmount is null or empty
if (!withdrawAmount || withdrawAmount.trim() === '') {
    throw new Error("Value cannot be empty");
}

if (withdrawAmount < 0){
    throw new Error("Value cannot be negative");
}




// Check if withdrawAmount is a valid number
if (!/^\d+(\.\d+)?$/.test(withdrawAmount.trim())) {
    throw new Error("Value is not a number");
}
    
try {  
    const data = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
    const json = await data.json();
    const userGroupIndex = json.groups.findIndex(group => group._id === groupID);
    const initialBalance = parseFloat(json.groups[userGroupIndex].balance);
    if (initialBalance < parseFloat(withdrawAmount)){
        throw new Error("Not enough balance in your account");
    }
    let eachUser = json.groups[userGroupIndex].users;
    let arrayUsers = eachUser.split(",");
    for (const user of arrayUsers){
        try {
            const curUser = await fetch(`http://localhost:5050/username/${user}`);
            const jsonCurUser = await curUser.json();
            const groupIndex = jsonCurUser.groups.findIndex(group => group._id === groupID);
            if (groupIndex === -1) {
                throw new Error("Group found");
            }
            // Perform deposit by updating balance
            let updateResponse = await fetch(`http://localhost:5050/update/${user}/${groupID}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "balance": initialBalance - parseFloat(withdrawAmount)
                })
            });
            if (!updateResponse.ok){
                throw new Error("Deposit unsuccessful");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
} catch (error) {
    throw new Error(error);
}



};


export default withdraw;