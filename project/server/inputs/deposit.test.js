import deposit from "./deposit";
import { validateUserRegistration } from "./input_validation";

describe('Deposit validation', () => {
    test('Valid TestCase', async () => {
        const addInitialUser = ['username5', 'Password1!', 'Password1!'];
        await expect(validateUserRegistration(...addInitialUser)).resolves.not.toThrow();

        const validInput = ['username5', '20', 'test'];
        await expect(deposit(...validInput)).resolves.not.toThrow();
    });

    test('Invalid TestCase, Value entered not a number', async () => {
        const validInput = ['username5', '99UJ', 'test'];
        await expect(deposit(...validInput)).rejects.toThrow("Value is not a number");
    });

    test('Invalid TestCase, Value entered is empty', async () => {
        const validInput = ['username5', '', 'test'];
        await expect(deposit(...validInput)).rejects.toThrow("Value cannot be empty");
    });
    

});
