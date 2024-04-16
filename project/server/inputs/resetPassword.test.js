import { resetPassword } from "./resetPassword";
import db from "../db/connection.js";
import { validateUserRegistration } from './input_validation';



beforeAll(async () => {
    await db.collection("users").insertOne({
        username: "testUser",
        password: "oldPassword123"
    });
});

afterAll(async () => {
    await db.collection("users").deleteMany({});
    await db.client.close();
});

describe("Reset Password Function", () => {
    test("Successfully resets password for existing user", async () => {
        const result = await resetPassword("testUser", "newTestPassword123");
        expect(result).toEqual("Password has reset successfully");
    });

    test("Throws error for non existent user", async () => {
        await expect(resetPassword("nonExistentUser", "newTestPassword123"))
            .rejects
            .toThrow("User not found");
    });

    test("Throws error for missing username or password", async () => {
        await expect(resetPassword("", ""))
            .rejects
            .toThrow("Username and new password are required");
    });

    test('Successfully resets password with valid new and confirm passwords', async () => {
        const username = 'testUser';
        const newPassword = 'NewPassword1!';
        const confirmPassword = 'NewPassword1!';
    
        const result = await resetPassword(username, newPassword, confirmPassword);
        expect(result).toEqual('Password has been reset successfully');
      });

});

