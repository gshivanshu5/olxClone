import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './login.css';
import API_URL from "../constants";


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('userName', res.data.username);
                        localStorage.setItem('user', res.data.result);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                setErrorMessage('SERVER ERR');
            });
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h3>Welcome to Login Page</h3>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mr-3" onClick={handleApi}>Login</button>
                <Link className="btn btn-secondary" to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default Login;
