import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Username or password cannot be empty");
      }
      const response = await fetch(`http://localhost:5050/user/${username}/${password}`);
      if (response.status === 404) {
        throw new Error("Username or Password mismatch");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (!username || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }
      // Validation functions for username and password can be called here
      await validateUsername(username);
      validatePassword(password, confirmPassword);
      await addUser(username, password);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

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

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <button onClick={switchForm}>{isLogin ? "Switch to Sign Up" : "Switch to Login"}</button>
    </div>
  );
};

export default Auth;
