import React from 'react';
import './login.jsx';
import './login.css';

class LoginForm extends React.Component {
  state = {
    isLoginForm: true,
    username: '',
    password: '',
    createUsername: '',
    createPassword: '',
    confirmPassword: ''
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isLoginForm: !prevState.isLoginForm
    }));
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.isLoginForm) {
      try {
        await this.signIn(this.state.username, this.state.password);
        console.log('success');
        // Redirect to main page
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await this.signUpCheck();
        console.log('success');
        // Redirect to login page
      } catch (error) {
        console.log(error);
      }
    }
  };

  async signUpCheck() {
    const { createUsername, createPassword, confirmPassword } = this.state;

    try {
      await this.validateUsername(createUsername);
      this.validatePassword(createPassword, confirmPassword);
      await this.addUser(createUsername, createPassword);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signIn(username, password) {
    if (!username.trim() || !password.trim()) {
      throw new Error('Username or password cannot be empty');
    }

    try {
      const response = await fetch(`http://localhost:5050/user/${username}/${password}`);
      if (response.status === 404) {
        throw new Error('Username or Password mismatch');
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  validateUsername = async username => {
    if (!username.trim()) {
      throw new Error('Username cannot be empty');
    }

    const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{5,}$/;

    if (!usernamePattern.test(username)) {
      throw new Error('Username must be 5+ characters, contain at least one number, one letter, and no spaces');
    }

    try {
      const response = await fetch(`http://localhost:5050/username/${username}`);
      if (response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Failed to fetch username information');
      } else if (error instanceof Error) {
        throw new Error('Username exists in the database');
      }
    }
  };

  validatePassword = (password, confirmPassword) => {
    if (!password.trim()) {
      throw new Error('Password cannot be empty');
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,14}$/;
    if (!passwordPattern.test(password)) {
      throw new Error('Password must be 8-14 characters, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  };

  async addUser(username, password) {
    const userData = {
      username: username,
      password: password,
      groups: []
    };

    try {
      const response = await fetch('http://localhost:5050/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error adding user:', error.message);
      throw error;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${this.state.isLoginForm ? 'login' : 'signup'}`}>Account</div>
          <div className={`title ${this.state.isLoginForm ? 'login' : 'signup'}`}>Account</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={this.state.isLoginForm} onChange={this.toggleForm} />
            <input type="radio" name="slide" id="signup" checked={!this.state.isLoginForm} onChange={this.toggleForm} />
            <label htmlFor="login" className={`slide ${this.state.isLoginForm ? 'login' : 'signup'}`}>Login</label>
            <label htmlFor="signup" className={`slide ${this.state.isLoginForm ? 'login' : 'signup'}`}>SignUp</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form action="#" className={this.state.isLoginForm ? 'login' : 'signup'} onSubmit={this.handleSubmit}>
              {this.state.isLoginForm ? (
                <>
                  <div className="field">
                    <input type="text" placeholder="Username" id="username" value={this.state.username} onChange={this.handleChange} required />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" id="password" value={this.state.password} onChange={this.handleChange} required />
                  </div>
                </>
              ) : (
                <>
                  <div className="field">
                    <input type="text" placeholder="Username" id="createUsername" value={this.state.createUsername} onChange={this.handleChange} required />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" id="createPassword" value={this.state.createPassword} onChange={this.handleChange} required />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Confirm Password" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required />
                  </div>
                </>
              )}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value={this.state.isLoginForm ? 'Login' : 'SignUp'} />
              </div>
              {!this.state.isLoginForm && (
                <div className="signup-link">
                  Don't Have Account? <a href="#" onClick={this.toggleForm}>Create A New</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
