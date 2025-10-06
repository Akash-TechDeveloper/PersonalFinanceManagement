/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signin.css";
import { UserContext } from './UserContext';

const Signin = () => {
    const [res, setRes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { setUsername } = useContext(UserContext);

    const post_data = () => {
        setErrorMessage('');

        const usernameValue = username.current.value.trim();
        const passwordValue = password.current.value.trim();
        if (!usernameValue) {
            setErrorMessage('Username cannot be empty.');
            return;
        }
        if (!passwordValue) {
            setErrorMessage('Password cannot be empty.');
            return;
        }
        PostEx(usernameValue, passwordValue);
    };

    const PostEx = async (usernameValue, passwordValue) => {
        try {
            const response = await axios.post(`http://localhost:9000/signin?username=${usernameValue}&password=${passwordValue}`);

            const { data } = response;
            setRes(data);
            if (response.status === 200) {
                setUsername(usernameValue);
                navigate('/home/dashboard');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            setRes("Invalid Username & Password");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="login-container">
            <div className="login-interior">
                <div className="signin-content">
                    <h1>Sign In</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p className="result">{JSON.stringify(res)}</p>
                    <input type="text" ref={username} placeholder="Username" className="input-field" autoFocus />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            ref={password}
                            placeholder="Password"
                            className="input-field"
                        />
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "🙈" : "👁️"}
                        </span>
                    </div>
                    <button className="signin-button" onClick={post_data}>Sign In</button>
                </div>
                <div className="signup-content">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your details and start your journey with us.</p>
                    <Link to="/signup">
                        <button className="signup-button">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;
