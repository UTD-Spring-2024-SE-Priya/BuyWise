import { resetPassword } from "./resetPassword";
import { validateUserRegistration } from './input_validation';


await validateUserRegistration("testUser1" , "oldPassword123!" , "oldPassword123!");


describe("Reset Password Function", () => {
    test("Successfully resets password for existing user", async () => {
        const result = await resetPassword("testUser1", "newTestPassword123!" , "newTestPassword123!");
        expect(result).toEqual("Password has reset successfully");
    });

    test("Throws error for non existent user", async () => {
        await expect(resetPassword("nonExistentUser1", "newTestPassword123!" , "newTestPassword123!"))
            .rejects
            .toThrow("Username not found");
    });

    test("Throws error for mismatch passwords", async () => {
        await expect(resetPassword("testUser1", "newTestPassword123!" , "newTestPassword123"))
            .rejects
            .toThrow("Passwords do not match");
    });

    test("Throws error for missing username or password", async () => {
        await expect(resetPassword("", "" , ""))
            .rejects
            .toThrow("Username and password are required");
    });

    

});

