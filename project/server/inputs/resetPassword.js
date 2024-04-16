import fetch from 'node-fetch';
import { validatePassword } from './input_validation.js'; 

const validateUsername = async (username) => {

    if (username.trim() === '' || !username){
        throw new Error("Username and password are required")
    }

    try {
        const response = await fetch(`http://localhost:5050/username/${username}`);
        if (!response.ok){
            throw new Error("Username not found")
        }
    } catch (error) {
        throw new Error(error);
    }
}

const resetPassword = async (username, newPassword, confirmPassword) => {
    try {
        
        await validateUsername(username);
        validatePassword(newPassword, confirmPassword); 
        //make patch req if validation successful
        const endpoint = `http://localhost:5050/reset-password`;
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, newPassword}) 
        });
        
        const result = await response.json(); 
        
    
        if (!response.ok) {
            throw new Error(result.message || "Password reset unsuccessful");
        }
        
        return result.message;
    } catch (error) {
        //validation errors
        throw new Error(error.message);
    }
};

export { resetPassword };
