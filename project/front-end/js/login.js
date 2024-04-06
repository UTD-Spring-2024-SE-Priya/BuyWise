
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginSubmit = document.getElementById("loginSubmit");
const createAccountButton = document.getElementById("createAccButton");

signupBtn.onclick = (()=>{
 loginForm.style.marginLeft = "-50%";
 loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
 loginForm.style.marginLeft = "0%";
 loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
 signupBtn.click();
 return false;
});
loginSubmit.onclick = (() => {
    loginCheck();
});
createAccountButton.onclick = (() => {
    signUpCheck();
});

async function signUpCheck() {
    const createUser = document.getElementById("createUsernameField").value;
    const createPassword = document.getElementById("createPasswordField").value;
    const createConfirmPass = document.getElementById("createConfirmPassField").value;
 

    try {
        await validateUsername(createUser);
        validatePassword(createPassword, createConfirmPass);
        await addUser(createUser , createPassword);
        console.log("success");
        window.location.href = '../html/login.html';
        window.location.reload();
  
      } catch (error) {
        throw error;
      }
}

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
  const validatePassword = (password, confirmPassword) => {

    if (!password || password.trim() === '') {
      throw new Error("Password cannot be empty");
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,14}$/;
    if (!passwordPattern.test(password)) {
      throw new Error("Password must be 8-14 characters, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
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

async function loginCheck() {
    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;
    console.log(username);
    console.log(password);
    try {
        await signIn(username , password);
        console.log("success");
        window.location.href = '../html/main.html';
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    }

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
            console.log(error + "in");
            throw new Error(error);
        }
    };

