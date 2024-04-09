import { addGroup } from "./groupAdd";
import { validateUserRegistration } from "./input_validation";

describe('Add group validation' , () => {
    test('Valid testcase' , async () => {

        const testUser = ['username5' , 'Password1!' , 'Password1!'];
        await validateUserRegistration(...testUser);

        await validateUserRegistration('sharedAccount1' , 'Password1!' , 'Password1!');
        await validateUserRegistration('sharedAccount2' , 'Password1!' , 'Password1!');


        const groupInput = ['username5' , 'checking account' , '200.0' , 'sharedAccount1,sharedAccount2'];
        await expect (addGroup(...groupInput)).resolves.not.toThrow();

    });
    
    test('Invalid testcase, empty group name' , async () => {
        const groupInput = ['username5' , '' , '200.0' , ''];
        await expect (addGroup(...groupInput)).rejects.toThrow("account name cannot be empty");
    });

    test('Invalid testcase, username entered not valid' , async () => {
        const groupInput = ['username5' , 'dont work' , '200.0' , 'fakename'];
        await expect (addGroup(...groupInput)).rejects.toThrow("User does not exist");
    });

    test('Invalid testcase, usernames cant have spaces' , async () => {
        const groupInput = ['username5' , 'dont work' , '200.0' , 'fakename ,'];
        await expect (addGroup(...groupInput)).rejects.toThrow("User list cannot contain spaces");
    });

    test('Invalid testcase, check input for bad commans' , async () => {
        const groupInput = ['username5' , 'dont work' , '200.0' , 'fakename,,test'];
        await expect (addGroup(...groupInput)).rejects.toThrow("Invalid input: Multiple consecutive commas or comma at the end");
    });


    test('Invalid testcase, empty balance value' , async () => {
        const groupInput = ['username5' , 'checking account' , '' , ''];
        await expect (addGroup(...groupInput)).rejects.toThrow("Value cannot be empty");
    });

    test('Invalid testcase, negative balance value' , async () => {
        const groupInput = ['username5' , 'checking account' , '-100' , ''];
        await expect (addGroup(...groupInput)).rejects.toThrow("Value cannot be negative");
    });

    test('Invalid testcase, negative balance value' , async () => {
        const groupInput = ['username5' , 'checking account' , '100U' , ''];
        await expect (addGroup(...groupInput)).rejects.toThrow("Value is not a number");
    });

});