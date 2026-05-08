import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useWrite } from '../../hooks/Write';
import './admin-Login.scss';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    
    // Auth context se direct login trigger karo
    const { login } = useAuth();
    const { postData, isWriting } = useWrite();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const data = await postData('/auth/login', credentials);

            if (data.success) {
                login(data.token);
                alert('Admin Logged In Successfully! 🚀');
                navigate('/'); // Login hote hi home page pe bhej do
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
                
                <button type="submit" disabled={isWriting}>
                  {isWriting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;