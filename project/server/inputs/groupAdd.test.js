import { addGroup } from "./groupAdd";
import { validateUserRegistration } from "./input_validation";

describe('Add group validation' , () => {
    test('Valid testcase' , async () => {

        const testUser = ['username5' , 'Password1!' , 'Password1!'];
        await validateUserRegistration(...testUser);

        const groupInput = ['username5' , 'checking account' , '200.0' , 'test4,username9'];
        await expect (addGroup(...groupInput)).resolves.not.toThrow();

    });
    
    test('Invalid testcase, empty group name' , async () => {
        const groupInput = ['username5' , '' , '200.0' , ''];
        await expect (addGroup(...groupInput)).rejects.toThrow("account name cannot be empty");
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