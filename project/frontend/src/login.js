import React, { useState } from 'react';

const Login = () => {
  const [loginFormVisible, setLoginFormVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [createPasswordError, setCreatePasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const switchForm = () => {
    setLoginFormVisible(!loginFormVisible);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email or password cannot be empty");
      }
      // Add your login logic here
      console.log("Logging in...");
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleSignup = async () => {
    try {
      if (!username || !createPassword || !confirmPassword) {
        throw new Error("All fields are required");
      }
      // Add your signup logic here
      console.log("Signing up...");
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>{loginFormVisible ? 'Login' : 'Sign Up'}</div>
      </div>
      <br />
      {loginFormVisible ? (
        <>
          <div className={'inputContainer'}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className={'inputContainer'}>
            <input
              value={username}
              placeholder="Enter your username here"
              onChange={(ev) => setUsername(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
          <br />
        </>
      )}
      <div className={'inputContainer'}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      {!loginFormVisible && (
        <>
          <div className={'inputContainer'}>
            <input
              value={createPassword}
              type="password"
              placeholder="Create password"
              onChange={(ev) => setCreatePassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{createPasswordError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{confirmPasswordError}</label>
          </div>
          <br />
        </>
      )}
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={loginFormVisible ? handleLogin : handleSignup} value={loginFormVisible ? 'Log in' : 'Sign Up'} />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={switchForm} value={loginFormVisible ? 'Switch to Sign Up' : 'Switch to Login'} />
      </div>
    </div>
  );
};

export default Login;
