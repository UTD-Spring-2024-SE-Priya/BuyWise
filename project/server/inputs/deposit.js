const deposit = async (depositAmount, groupID) => {
    // Check if depositAmount is null or empty
    if (!depositAmount || depositAmount.trim() === '') {
        throw new Error("Value cannot be empty");
    }

    if (depositAmount < 0){
        throw new Error("Value cannot be negative");
    }
    let data = null;

    // Check if depositAmount is a valid number
    if (!/^\d+(\.\d+)?$/.test(depositAmount.trim())) {
        throw new Error("Value is not a number");
    }
    
    try {  
        const data = await fetch(`http://localhost:5050/find/user/group/${groupID}`);
        const json = await data.json();
        const initialBalance = parseFloat(json.groups[0].balance);
        try {
            const response = await fetch(`http://localhost:5050/update/balance/${json.groups[0]._id}`, {
                method : "PATCH",
                headers : {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    "balance" : initialBalance + parseFloat(depositAmount)
                })
            });
            if (!response.ok){
                throw new Error("Deposit unsuccessful");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
       
    } catch (error) {
        throw new Error(error);
    }
};

export default deposit;
