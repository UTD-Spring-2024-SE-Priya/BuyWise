
const withdraw = async (username, withdrawAmount, groupName) => {
 // Check if withdrawAmount is null or empty
if (!withdrawAmount || withdrawAmount.trim() === '') {
    throw new Error("Value cannot be empty");
}
let data = null;


// Check if withdrawAmount is a valid number
if (!/^\d+$/.test(withdrawAmount.trim())) {
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
        // Access properties from the response data
        if (data.groups[0].totalBalance < parseFloat(withdrawAmount)) {
            throw new Error("Not enough balance in your account");
        }
    } catch (error) {
        throw new Error("Not enough balance in your account");
    }

    try {
        const groupIndex = data.groups.findIndex(group => group.name === groupName);
        let updateResponse = await fetch(`http://localhost:5050/update/${username}/${groupName}` , {
            method : "PATCH" ,
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "balance": data.groups[groupIndex].totalBalance - parseFloat(withdrawAmount)
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