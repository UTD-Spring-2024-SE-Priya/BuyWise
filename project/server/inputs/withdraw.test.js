import withdraw from "./withdraw";
import { validateUserRegistration } from "./input_validation";
import { addGroup } from "./groupAdd";

let ID;
let temp;

describe('Withdraw validation' , () => {
    test('Valid TestCase', async () => {

        const addInitialUser = ['withdrawAccount3', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        await validateUserRegistration('withdrawAccount1' , 'Password1!' , 'Password1!');
        await validateUserRegistration('withdrawAccount2' , 'Password1!' , 'Password1!');

        const addInitialGroup = ['withdrawAccount3' , 'sample account' , '100' , 'withdrawAccount1,withdrawAccount2'];
        temp = await addGroup(...addInitialGroup);
        ID = temp.toString();
        

        const validInput = ['20.0' , ID];
        await expect (withdraw(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['99UJ' , ID];
        await expect (withdraw(...validInput)).rejects.toThrow("Value is not a number");
    });

    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['' , ID];
        await expect (withdraw(...validInput)).rejects.toThrow("Value cannot be empty");
    });

    test('Invalid TestCase, Value entered is negative', async () => {
        const validInput = ['-100' , ID];
        await expect (withdraw(...validInput)).rejects.toThrow("Value cannot be negative");
    });

    test('Invalid TestCase, amount greater than balance', async () => {
        const validInput = ['120' , ID];
        await expect (withdraw(...validInput)).rejects.toThrow("Not enough balance in your account");
          
    });
});