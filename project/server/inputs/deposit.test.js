import deposit from "./deposit";
import { validateUserRegistration } from "./input_validation";
import { addGroup } from "./groupAdd";

let ID;
let temp;

describe('Deposit validation', () => {
    test('Valid TestCase', async () => {
        const addInitialUser = ['depositAccount1', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        await validateUserRegistration('depositAccount2' , 'Password1!' , 'Password1!');
        await validateUserRegistration('depositAccount3' , 'Password1!' , 'Password1!');

        const addInitialGroup = ['depositAccount1' , 'test account' , '100' , 'depositAccount2,depositAccount3'];
        temp = await addGroup(...addInitialGroup);
        ID = temp.toString();

        const validInput = ['20.0', ID];
        await expect(deposit(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['99UJ', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value is not a number");
    });


    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value cannot be empty");
          
    });

    test('Invalid TestCase, Value entered is negative', async () => {
        const validInput = ['-100', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value cannot be negative");
          
    });
    
    

});
