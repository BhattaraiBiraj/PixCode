import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Signup() {

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
        <div>
            <form onSubmit={handleSubmit}>
                USsername: <input type="text" name="username" onChange={handleUsername}></input>
                pass :<input type="password" name="password" onChange={handlePassword}></input>
                <button type="submit">register</button>
            </form>
        </div>
    )
}