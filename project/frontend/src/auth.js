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
      console.log("success");
      navigate('../html/main.html');
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
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!username || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }
      // Validation functions for username and password can be called here
      // validateUsername(username);
      // validatePassword(password, confirmPassword);
      // Add user function can be called here
      // await addUser(username, password);
      console.log("success");
      navigate('../html/login.html');
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
