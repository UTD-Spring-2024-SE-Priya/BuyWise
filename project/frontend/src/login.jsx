import React, { useState } from 'react';
import './login.css'; // Import your CSS file

const App = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleToggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isSignup ? 'signup' : 'login'}`}>
          Account
        </div>
        <div className={`title ${isSignup ? 'login' : 'signup'}`}>
          Account
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={!isSignup} onChange={() => setIsSignup(false)} />
          <input type="radio" name="slide" id="signup" checked={isSignup} onChange={() => setIsSignup(true)} />
          <label htmlFor="login" className="slide login">Login</label>
          <label htmlFor="signup" className="slide signup">SignUp</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form action="#" className={!isSignup ? 'login' : 'signup'}>
            <div className="field">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              <a href="#">Reset password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={!isSignup ? 'Login' : 'SignUp'} />
            </div>
            <div className="signup-link">
              Don't Have Account? <a href="#" onClick={handleToggleForm}>Create A New</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
