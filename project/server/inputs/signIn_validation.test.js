import { signIn } from "./signIn_validation"
import { validateUserRegistration } from "./input_validation"

describe('SignIn validation' , () => {
    test('Valid TestCase', async () => {
        const addInitialUser = ['username1' , 'Password1!' , 'Password1!'];
        await validateUserRegistration(...addInitialUser);
        console.log("inside");
        const validInputSignIn = ['username1' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).resolves.not.toThrow();
    });

    test('Invalid TestCase, mismatch', async () => {
        const validInputSignIn = ['username1' , 'NotPassword1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username or Password mismatch");
    });

    test('Invalid TestCase, username not found', async () => {
        const validInputSignIn = ['username2' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username or Password mismatch");
    });

    test('Invalid TestCase, usenrame exception', async () => {
        const validInputSignIn = ['' , 'Password1!'];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Username cannot be empty");
    });

    test('Invalid TestCase, password exception', async () => {
        const validInputSignIn = ['username1' , ''];
        await expect (signIn(...validInputSignIn)).rejects.toThrow("Password cannot be empty");
    });

});