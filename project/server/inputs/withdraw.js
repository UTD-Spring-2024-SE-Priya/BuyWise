
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
    const initialBalance = parseFloat(json.groups[0].balance);
    if (initialBalance < parseFloat(withdrawAmount)){
        throw new Error("Not enough balance in your account");
    }
    try {
        const response = await fetch(`http://localhost:5050/update/balance/${json.groups[0]._id}`, {
            method : "PATCH",
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "balance" : initialBalance - parseFloat(withdrawAmount)
            })
        });
        if (!response.ok){
            throw new Error("Withdraw unsuccessful");
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
   
} catch (error) {
    throw new Error(error);
}



};


export default withdraw;