import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './signup.css';
import API_URL from "../constants";

function Signup() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setErrorMessage(res.data.message);
                    if (res.data.success) {
                        navigate('/login');
                    }
                }
            })
            .catch((err) => {
                setErrorMessage('SERVER ERR');
            });
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h3>Welcome to Signup Page</h3>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        id="mobile"
                        className="form-control"
                        type="text"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleApi}>Signup</button>
                <Link className="btn btn-secondary" to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
