// Function to validate the username
const validateUsername = async (username) => {
    // Check if username is null or empty
    if (!username || username.trim() === '') {
      throw new Error("Username cannot be empty");
    }
    // Check if username contains spaces
    if (username.includes(' ')) {
      throw new Error("Username cannot contain spaces");
    }

    try {
        const response = await fetch(`http://localhost:5050/username/${username}`);
        if (response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error/failed to fetch
            console.error("Network error:", error);
            throw new Error("Failed to fetch username information");
        } else if (error instanceof Error) {
            // Username exists in the database
            console.error("Error checking username:", error.message);
            throw new Error("Username exists in the database");
        }
    }
    

    
  };
  

  // Function to validate the password and confirm password
  const validatePassword = (password, confirmPassword) => {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    // Check if password meets criteria (8-14 characters, one number, one uppercase, one lowercase, one special character, no spaces)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,14}$/;
    if (!passwordPattern.test(password)) {
      throw new Error("Password must be 8-14 characters, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces");
    }
  };
  
  // Function to validate username, email, password, and confirm password
  export const validateUserRegistration = async (username, password, confirmPassword) => {
    try {
      await validateUsername(username);
      validatePassword(password, confirmPassword);
      
      addUser(username , password);


    } catch (error) {
      throw error;
    }
  };

  async function addUser(username , password){
    const userData = {
        username : username,
        password : password,
        groups : [{
          name : "test",
          balance : 100.0
      }]
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