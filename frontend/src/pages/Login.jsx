import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import '../../public/adminlte/vendor/bootstrap/css/bootstrap.min.css';
import '../../public/adminlte/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../public/adminlte/vendor/animate/animate.css';
import '../../public/adminlte/vendor/css-hamburgers/hamburgers.min.css';
import '../../public/adminlte/vendor/select2/select2.min.css';
import '../../public/adminlte/css/util.css';
import '../../public/adminlte/css/main.css';

import appLogo from '../assets/applogo.png';

export default function Login() {
    const navigateTo = useNavigate(); 

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/admin/login', { user_id: userId, password });

            console.log(response.data);
            
            navigateTo('/admin/home');
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.error);
            } else if (error.request) {
                console.log(error.request);
                setErrorMessage('Server not responding');
            } else {
                console.log('Error', error.message);
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <main>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={appLogo} alt="IMG" />
                        </div>

                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title">
                                ADMINISTRATOR
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid id is required: ex@abc.xyz">
                                <input
                                    className="input100"
                                    type="text"
                                    name="user_id"
                                    placeholder="ID"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">Login</button>
                            </div>

                            {errorMessage && <div className="text-danger">{errorMessage}</div>}

                            

                            <div className="text-center p-t-136"></div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
