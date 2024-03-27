import signIn from "./signin_validation.js"
import { validateUserRegistration } from "./input_validation.js";


describe('SignIn validation' , () => {
    test('Valid TestCase', async () => {
        
        const initialUser = ['username2' , 'Password1!' , 'Password1!'];
        await validateUserRegistration(...initialUser);

        const validInputSignIn = ['username2' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).resolves.not.toThrow();
    });

    test('Invalid TestCase, mismatch', async () => {
        const validInputSignIn = ['username2' , 'NotPassword1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username or Password mismatch");
    });

    test('Invalid TestCase, username not found', async () => {
        const validInputSignIn = ['username3' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username or Password mismatch");
    });

    test('Invalid TestCase, username exception', async () => {
        const validInputSignIn = ['' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username cannot be empty");
    });

    test('Invalid TestCase, password exception', async () => {
        const validInputSignIn = ['username2' , ''];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Password cannot be empty");

        try {
            const response = await fetch(`http://localhost:5050/delete/username2`, {
              method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Username does not exist`);
            }
          } catch (error) {
              // Network error or failed to fetch
              console.error("Network error:", error);
              throw new Error("Failed to fetch username information");
          }
    });

    

}); 