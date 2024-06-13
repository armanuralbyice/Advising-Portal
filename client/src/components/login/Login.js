import React, { useState } from 'react';
import './login.css';
import logo from './East-west-university-LogoSVG.svg.png';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../router/AuthProvider';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {setIsAuthenticated} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:4000/api/v8/login', {email, password}).
            then(response => {
                setIsAuthenticated(true);
                const {user, token} = response.data;
                console.log('User data:', user);
                console.log('Token:', token);
                localStorage.setItem('token', token);
                if(response && response.status === 200){
                    navigate('/dashboard')
                }
            })
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            setError('Invalid email or password');
        }
    };


    return (
        <div style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="container-login">
                <div className="wrapper-login">
                    <div className="logo">
                        <img src={logo} alt="East West University Logo" />
                    </div>
                    <div className="title">
                        <h6>SIGN IN TO YOUR ACCOUNT</h6>
                    </div>
                        {error && <div className="error" style={{'textAlign':'center','fontSize':'18px', 'color':'red'}}>{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="row">
                            <i><FontAwesomeIcon icon={faEnvelope} /></i>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="row">
                            <i><FontAwesomeIcon icon={faLock} /></i>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="pass"><a href="#">Forgot password?</a></div>
                        <div className="row button-login">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
