import fetch from 'node-fetch';
import { validatePassword } from './input_validation.js'; 

const resetPassword = async (username, newPassword, confirmPassword) => {
    try {
        
        validatePassword(newPassword, confirmPassword); 
        
        //make patch req if validation successful
        const endpoint = `http://localhost:5050/reset-password`;
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, newPassword, confirmPassword}) 
        });
        
        const result = await response.json(); 
        
    
        if (!response.ok) {
            throw new Error(result.message || "Password reset unsuccessful");
        }
        
        return result.message;
    } catch (error) {
        //validation errors
        console.error('Error during password reset:', error);
        throw new Error(error.message); // Rethrow with clearer error message if needed
    }
};

export { resetPassword };
