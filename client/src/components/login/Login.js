import React from 'react';
import './login.css'
import logo from './East-west-university-LogoSVG.svg.png'
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Login = () => {
    return (
        <div style={{'overflow': 'hidden','height':'100vh'}}>
            <div className="container-login">
                <div className="wrapper-login">
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="title">
                        <h6>SIGN IN TO YOUR ACCOUNT</h6>
                    </div>
                    <form action="#">
                        <div className="row">
                            <i><FontAwesomeIcon icon={faEnvelope} /></i>
                            <input type="text" placeholder="Email" required/>
                        </div>
                        <div className="row">
                            <i><FontAwesomeIcon icon={faLock} /></i>
                            <input type="password" placeholder="Password" required/>
                        </div>
                        <div className="pass"><a href="#">Forgot password?</a></div>
                        <div className="row button-login">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;