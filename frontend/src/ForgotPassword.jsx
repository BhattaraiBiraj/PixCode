import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ForgotPassword() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState('')
    const [pin, setPin] = useState('')
    const [password, setPassword] = useState('')
    const [pinError, setPinError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [step, setStep] = useState(1);
    const navigate = useNavigate()

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'`~/]).{6,}$/
    const pinRegex = /^\d{4}$/

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePin = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setPin(value)
        if (value && !pinRegex.test(value)) {
            setPinError('PIN must be exactly 4 digits')
        } else {
            setPinError('')
        }
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

    const handleVerifyPinSubmit = async (e) => {
        e.preventDefault();
        if (!pinRegex.test(pin)) {
            setPinError('PIN must be exactly 4 digits')
            return
        }
        try {
            const res = await axios.post(`${API_URL}/verify-pin`, { username, pin })
            if (res.data.verified) {
                setStep(2);
            }
            else {
                alert(res.data.msg);
            }
        }
        catch (err) {
            console.error(err);
            alert("Something went wrong")
        }
    }

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters and include a number and a special character')
            return
        }
        try {
            const res = await axios.post(`${API_URL}/reset-password`, { username, pin, newPassword: password })
            alert(res.data.msg)

            if (res.data.msg == "Password Changed Successfully") {
                navigate("/login")
            }
        }
        catch (err) {
            console.error(err)
            alert("Something went wrong")
        }
    }

    return (
        <div className="auth-card">
            <h2 className="auth-title">Verify your pin</h2>
            <form onSubmit={step === 1 ? handleVerifyPinSubmit : handleChangePasswordSubmit}>
                <div className="auth-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="auth-input" onChange={handleUsername} required />
                </div>
                <div className="auth-field">
                    <label htmlFor="pin">Pin</label>
                    <input
                        type="text"
                        id="pin"
                        name="pin"
                        className={`auth-input ${pinError ? 'auth-input-error' : ''}`}
                        value={pin}
                        onChange={handlePin}
                        maxLength={4}
                        inputMode="numeric"
                        required
                    />
                    {pinError ? (
                        <p className="auth-error">{pinError}</p>
                    ) : (
                        <p className="auth-hint">Must be exactly 4 digits</p>
                    )}
                </div>
                {step == 2 ?
                    <div className="auth-field">
                        <label htmlFor="password">New Password</label>
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
                    : ""
                }

                {step == 1 ?
                    <button type="submit" className="auth-btn">Verify</button>
                    :
                    <button type="submit" className="auth-btn">Change password</button>
                }
            </form>
        </div>
    )
}