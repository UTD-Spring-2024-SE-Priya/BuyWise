import React, { useState } from 'react';
import './login.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Link
} from "react-router-dom";

import FinancialDashboard from "./components/main";

function LoginForm() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createUsername, setCreateUsername] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    const toggleForm = () => {
        setIsLoginForm(prevState => !prevState);
    };

    const handleChange = e => {
        const { id, value } = e.target;
        switch (id) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "createUsername":
                setCreateUsername(value);
                break;
            case "createPassword":
                setCreatePassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (isLoginForm) {
            try {
                await signIn(username, password);
                console.log('success');
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await signUpCheck();
                console.log('success');
                toggleForm();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const signUpCheck = async () => {
        try {
            await validateUsername(createUsername);
            validatePassword(createPassword, confirmPassword);
            await addUser(createUsername, createPassword);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const signIn = async (username, password) => {
        if (!username.trim() || !password.trim()) {
            throw new Error('Username or password cannot be empty');
        }

        try {
            const response = await fetch(`http://localhost:5050/user/${username}/${password}`);
            
            if (response.status === 404) {
                throw new Error('Username or Password mismatch');
            } else {
                navigate(`/FinancialDashboard/${username}`)
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    const validateUsername = async username => {
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

    const validatePassword = (password, confirmPassword) => {
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

    const addUser = async (username, password) => {
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

    return (
        <div className="wrapper">
            <div className="title-text">
                <div className={`title ${isLoginForm ? 'login' : 'signup'}`}>Account</div>
                <div className={`title ${isLoginForm ? 'login' : 'signup'}`}>Account</div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input type="radio" name="slide" id="login" checked={isLoginForm} onChange={toggleForm} />
                    <input type="radio" name="slide" id="signup" checked={!isLoginForm} onChange={toggleForm} />
                    <label htmlFor="login" className={`slide ${isLoginForm ? 'login' : 'signup'}`}>Login</label>
                    <label htmlFor="signup" className={`slide ${isLoginForm ? 'login' : 'signup'}`}>SignUp</label>
                    <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                    <form action="#" className={isLoginForm ? 'login' : 'signup'} onSubmit={handleSubmit}>
                        {isLoginForm ? (
                            <>
                                <div className="field">
                                    <input type="text" placeholder="Username" id="username" value={username} onChange={handleChange} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" id="password" value={password} onChange={handleChange} required />
                                </div>
                                <div className="signup-link">
                                    Don't have account? <Link to="#" onClick={toggleForm}>Create account</Link>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className="field">
                                    <input type="text" placeholder="Username" id="createUsername" value={createUsername} onChange={handleChange} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" id="createPassword" value={createPassword} onChange={handleChange} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Confirm Password" id="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                                </div>
                            </>
                        )}
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value={isLoginForm ? 'Login' : 'SignUp'} />
                        </div>
                        {!isLoginForm}
                    </form>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/FinancialDashboard/:username" element={<FinancialDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
