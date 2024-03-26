import {validateUserRegistration} from "./input_validation";

describe('Input Validation', () => {
    test('Valid TestCase', async () => {
      const validInput = ['username', 'Password1!', 'Password1!'];
      await expect(validateUserRegistration(...validInput)).resolves.not.toThrow();

     }); 

    test('Invalid TestCase, password mismatch' , async () => {
      const invalidInput = ['username1' , 'Password1!' , 'Password2!'];
      await expect(validateUserRegistration(...invalidInput)).rejects.toThrow("Passwords do not match");
    }); 

  });