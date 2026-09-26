import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'`~/]).{6,}$/;

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        if (value && !passwordRegex.test(value)) {
            setPasswordError('Password must be at least 6 characters and include a number and a special character')
        } else {
            setPasswordError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters and include a number and a special character')
            return
        }
       try {
        const res = await axios.post(`${API_URL}/register`, { username, password });

        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);
            navigate('/');
            window.location.reload();
        } else {
            alert(res.data.msg);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
    }
    return (
        <div className="auth-card">
            <h2 className="auth-title">Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div className="auth-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="auth-input" onChange={handleUsername} required />
                </div>
                <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`auth-input ${passwordError ? 'auth-input-error' : ''}`}
                        onChange={handlePassword}
                        required
                    />
                    {passwordError ? (
                        <p className="auth-error">{passwordError}</p>
                    ) : (
                        <p className="auth-hint">At least 6 characters, with a number and a special character</p>
                    )}
                </div>
                <button type="submit" className="auth-btn">Sign up</button>
            </form>
        </div>
    )
}