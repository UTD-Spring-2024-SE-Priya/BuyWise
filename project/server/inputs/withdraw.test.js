import withdraw from "./withdraw";
import { validateUserRegistration } from "./input_validation";

describe('Withdraw validation' , () => {
    test('Valid TestCase', async () => {

        const addInitialUser = ['username5', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        const validInput = ['username5' , '20' , 'test4'];
        await expect (withdraw(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['username5' , '99UJ' , 'test4'];
        await expect (withdraw(...validInput)).rejects.toThrow("Value is not a number");
    });

    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['username5' , '' , 'test4'];
        await expect (withdraw(...validInput)).rejects.toThrow("Value cannot be empty");
    });

    test('Invalid TestCase, amount greater than balance', async () => {
        const validInput = ['username5' , '120' , 'test4'];
        await expect (withdraw(...validInput)).rejects.toThrow("Not enough balance in your account");

        try {
            const response = await fetch(`http://localhost:5050/delete/username5`, {
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