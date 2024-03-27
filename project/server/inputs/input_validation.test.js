import {validateUserRegistration} from "./input_validation";


describe('Input Validation', () => {
    test('Valid TestCase', async () => {
      const validInput = ['username1', 'Password1!', 'Password1!'];
      await expect(validateUserRegistration(...validInput)).resolves.not.toThrow();

      // Now, proceed with user deletion
      try {
        const response = await fetch(`http://localhost:5050/delete/username1`, {
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

    test('Invalid TestCase, password mismatch' , async () => {
      const invalidInput = ['username1' , 'Password1!' , 'Password2!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Passwords do not match");
    }); 

    test('Invalid TestCase, password does not match valid naming convention' , async () => {
      const invalidInput = ['username1' , 'Password' , 'Password2!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Password must be 8-14 characters, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces");
    }); 

    test('Invalid TestCase, password exception' , async () => {
      const invalidInput = ['username1' , '' , 'Password2!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Password cannot be empty");
    }); 

    test('Invalid TestCase, username does not follow valid naming convention' , async () => {
      const invalidInput = ['use ' , 'Password1!' , 'Passwor1!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Username must be 5+ characters, contain at least one number, one letter, and no spaces");
    }); 

    test('Invalid TestCase, username exception' , async () => {
      const invalidInput = ['' , 'Password1!' , 'Passwor1!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Username cannot be empty");
    }); 


  }); 

  