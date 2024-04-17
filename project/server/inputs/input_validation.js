// Function to validate the username
const validateUsername = async (username) => {
    // Check if username is null or empty
    if (!username || username.trim() === '') {
      throw new Error("Username cannot be empty");
    }
    
    const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{5,}$/;


    if(!usernamePattern.test(username)){
      throw new Error("Username must be 5+ characters, contain at least one number, one letter, and no spaces");

    }

    try {
        const response = await fetch(`http://localhost:5050/username/${username}`);
        if (response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error/failed to fetch
            throw new Error("Failed to fetch username information");
        } else if (error instanceof Error) {
            // Username exists in the database
            throw new Error("Username exists in the database");
        }
    }
    

    
  };
  

  // Function to validate the password and confirm password
  export const validatePassword = (password, confirmPassword) => {

    if (!password || password.trim() === '') {
      throw new Error("Password cannot be empty");
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      throw new Error("Password must be 8+ characters, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
  };
  
  // Function to validate username, email, password, and confirm password
  export const validateUserRegistration = async (username, password, confirmPassword) => {
    try {
      await validateUsername(username);
      validatePassword(password, confirmPassword);
      
      await addUser(username , password);


    } catch (error) {
      throw error;
    }
  };

  async function addUser(username , password){
    const userData = {
        username : username,
        password : password,
        groups : [
    ]
    };

    try {
        const response = await fetch("http://localhost:5050/users" , {
            method : "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Failed to add user");
          }
      
          const data = await response.json();
          return data.user;
        } catch (error) {
          console.error("Error adding user:", error.message);
          throw error;
    }
  }

  
    export default {validateUserRegistration}