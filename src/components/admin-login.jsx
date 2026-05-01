import React, { useState } from 'react';
import '../styles/admin-login.scss';

const Login = ({ setIsAdmin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://d3sh63r9ecih9a.cloudfront.net/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                // Token ko browser me save kar liya
                localStorage.setItem('adminToken', data.token);
                setIsAdmin(true);
                alert('Admin Logged In Successfully! 🚀');
                window.location.hash = '#/'; // Home par bhej dega
            } else {
                setError(data.message || 'Galat details! Phir se koshish karein.');
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError('Backend server se connection fail ho gaya!');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                {error && <p className="error" style={{color: '#ef4444', marginBottom: '10px'}}>{error}</p>}
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;