import  React , { useState }  from 'react';
import './Reset.css';
import { useNavigate } from 'react-router-dom';


function Reset() {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };
  
    const handleConfirmNewPasswordChange = (event) => {
      setConfirmNewPassword(event.target.value);
    };


    const handleReset = async e => {
        e.preventDefault();
        try {
            await checkUsername(username);
            validatePassword(newPassword , confirmNewPassword);
            resetPassword(username , newPassword);
            navigate('../');
        } catch (error) {
            console.log(error)
            alert("Failed to reset: " + error.message);
        }
    }

    const checkUsername = async username => {
        try {
            const response = await fetch(`http://localhost:5050/username/${username}`);
            if (!response.ok) {
                throw new Error(`Username does not exist`);
            }
        } catch (error) {
            throw error;
        }
    }

    const validatePassword = (password, confirmPassword) => {
        if (!password.trim()) {
            throw new Error('Password cannot be empty');
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(password)) {
            throw new Error('Password must be 8+, contain at least one number, one uppercase letter, one lowercase letter, one special character, and no spaces');
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
    };

    const resetPassword = async (username, newPassword) => {
        try {
            const endpoint = `http://localhost:5050/reset-password`;
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, newPassword}) 
            });
            
            const result = await response.json(); 
            
        
            if (!response.ok) {
                throw new Error(result.message || "Password reset unsuccessful");
            }
            
            return result.message;
        } catch (error) {
            throw new Error(error.message);
        }
    };


  return (
    <div class="wrapper">
        <div class="title-text">Reset Password</div>
        <div class="form-container">
            <form>
      <div className="field">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
          required
        />
      </div>

      <div class="btn">
        <div class="btn-layer"></div>
        <input type="submit" onClick={async (e) => await handleReset(e)} value="Reset Password"/>
        </div>
        <button className="back-button"onClick={() => navigate(-1)}>Back</button>
      </form>
        </div>
    </div>
  );
}

export default Reset; 