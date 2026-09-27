import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Link} from 'react-router-dom'
export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password })
            const token = res.data.token;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                navigate('/');
                window.location.reload();
            } else {
                alert(res.data.msg);
            }
        }
        catch (err) {
            console.error(err);
            alert("Login failed");
        }
    }
    return (
        <div className="auth-card">
            <h2 className="auth-title">Welcome back</h2>
            <form onSubmit={handleSubmit}>
                <div className="auth-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="auth-input" onChange={handleUsername} required />
                </div>
                <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="auth-input" onChange={handlePassword} required />
                </div>
                <p><Link to="/forgot-password" style={{ color: " rgb(40, 156, 66)", fontSize: "14px", fontWeight: "500", textDecoration: "none" }}>Forgot password?</Link></p>
                <button type="submit" className="auth-btn">Login</button>
            </form>
        </div>
    )
}