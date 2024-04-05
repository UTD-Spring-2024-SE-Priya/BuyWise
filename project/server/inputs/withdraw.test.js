import withdraw from "./withdraw";
import { validateUserRegistration } from "./input_validation";
import { addGroup } from "./groupAdd";

describe('Withdraw validation' , () => {
    test('Valid TestCase', async () => {

        const addInitialUser = ['username4', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        const addInitialGroup = ['username4' , 'sample account' , '100' , ''];
        await addGroup(...addInitialGroup);

        const validInput = ['username4' , '20.0' , 'sample account'];
        await expect (withdraw(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['username4' , '99UJ' , 'sample account'];
        await expect (withdraw(...validInput)).rejects.toThrow("Value is not a number");
    });

    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['username4' , '' , 'sample account'];
        await expect (withdraw(...validInput)).rejects.toThrow("Value cannot be empty");
    });

    test('Invalid TestCase, Value entered is negative', async () => {
        const validInput = ['username4' , '-100' , 'sample account'];
        await expect (withdraw(...validInput)).rejects.toThrow("Value cannot be negative");
    });

    test('Invalid TestCase, amount greater than balance', async () => {
        const validInput = ['username4' , '120' , 'sample account'];
        await expect (withdraw(...validInput)).rejects.toThrow("Not enough balance in your account");
          
    });
});