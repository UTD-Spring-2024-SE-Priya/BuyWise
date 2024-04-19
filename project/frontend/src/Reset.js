import React from 'react';
import './Reset.css';
import { useNavigate } from 'react-router-dom';


function Reset() {
    const navigate = useNavigate(); 

  return (
    <div class="wrapper">
        <div class="title-text">Reset Password</div>
        <div class="form-container">
            <form action="#" method="post">
                <div class="field">
                    <input type="text" placeholder="Enter your username" required/>
                </div>
                <div class="field">
                    <input type="password" placeholder="New Password" required/>
                </div>
                <div class="field">
                    <input type="password" placeholder="Confirm New Password" required/>
                </div>
                <div class="btn">
                    <div class="btn-layer"></div>
                    <input type="submit" onClick={() => navigate('../')}value="Reset Password"/>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Reset; 