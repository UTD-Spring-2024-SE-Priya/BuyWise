

const signIn = async (username, password) => {

    if (!username || username.trim() === ' '){
        throw new Error("Username cannot be empty");
    }
    if (!password || password.trim() === ' '){
        throw new Error("Password cannot be empty");
    }

    try {
        const response = await fetch(`http://localhost:5050/user/${username}/${password}`);
        if (response.status === 404){
            throw new Error("Username or Password mismatch");
        }
    } catch (error) {
        throw new Error("Username or Password mismatch");

    }
};



export default signIn;