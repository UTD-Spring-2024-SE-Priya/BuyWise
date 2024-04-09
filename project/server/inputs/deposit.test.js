import deposit from "./deposit";
import { validateUserRegistration } from "./input_validation";
import { addGroup } from "./groupAdd";

let ID;
let temp;

describe('Deposit validation', () => {
    test('Valid TestCase', async () => {
        const addInitialUser = ['username3', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        const addInitialGroup = ['username3' , 'test account' , '100' , ''];
        temp = await addGroup(...addInitialGroup);
        ID = temp.toString();

        const validInput = ['username3', '20.0', ID];
        await expect(deposit(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['username3', '99UJ', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value is not a number");
    });


    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['username3', '', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value cannot be empty");
          
    });

    test('Invalid TestCase, Value entered is negative', async () => {
        const validInput = ['username3', '-100', ID];
        await expect(deposit(...validInput)).rejects.toThrow("Value cannot be negative");
          
    });
    
    

});
