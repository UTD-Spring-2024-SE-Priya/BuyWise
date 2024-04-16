import db from "project/server/db/connection.js";

async function resetPassword(username, newPassword) {
    if (!username || !newPassword) {
        throw new Error("Username and new password are required");
    }

    const updateResult = await db.collection("users").updateOne(
        { username },
        { $set: { password: newPassword } }
    );

    if (updateResult.modifiedCount === 0) {
        throw new Error("User not found");
    }

    return "Password has been reset successfully";
}

export { resetPassword };