const deposit = async (username, depositAmount, groupName) => {
    // Check if depositAmount is null or empty
    if (!depositAmount || depositAmount.trim() === '') {
        throw new Error("Value cannot be empty");
    }
    let data = null;

    // Check if depositAmount is a valid number
    if (!/^\d+$/.test(depositAmount.trim())) {
        throw new Error("Value is not a number");
    }
    let response = null; // Declare a variable to hold the response
    try {
        // Await the fetch request and store the response
        response = await fetch(`http://localhost:5050/${username}/${groupName}`);
        if (!response.ok) {
            throw new Error("Username group combo not found");
        }
        // Parse the response body as JSON
        data = await response.json();
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }

    try {
        const groupIndex = data.groups.findIndex(group => group.name === groupName);
        if (groupIndex === -1) {
            throw new Error("Group not found");
        }
        // Perform deposit by updating balance
        let updateResponse = await fetch(`http://localhost:5050/update/${username}/${groupName}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "balance": data.groups[groupIndex].totalBalance + parseFloat(depositAmount)
            })
        });
        if (!updateResponse.ok){
            throw new Error("Deposit unsuccessful");
        }
    } catch (error) {
        console.log(error);
    }
};

export default deposit;
