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
        const userGroupIndex = json.groups.findIndex(group => group._id === groupID);
        const initialBalance = parseFloat(json.groups[userGroupIndex].balance);
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
                        "balance": initialBalance + parseFloat(depositAmount)
                    })
                });
                if (!updateResponse.ok){
                    throw new Error("Deposit unsuccessful");
                }
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export default deposit;
