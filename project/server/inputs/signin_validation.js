import db from "../db/connection.js";


export const signIn = async (username, password) => {

    if (!username || username.trim() === ' '){
        throw new Error("Username cannot be empty");
    }
    if (!password || password.trim() === ' '){
        throw new Error("Password cannot be empty");
    }

    try {
        let collection = await db.collection("allUsers");
        const user = await collection.findOne({ username, password });
        
        if (user) {
            // User signed in successfully
            return { success: true, message: "Sign in successful" };
        } else {
            // No credential match
            throw new Error("Username or Password mismatch");
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw new Error("Internal error");
    }
};



export default signIn;