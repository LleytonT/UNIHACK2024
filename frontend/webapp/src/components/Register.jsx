import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        navigate("/summariser");
    };
    const handleLogin = () => {
        localStorage.setItem('username', username);
        console.log("Handling login");
        console.log("Username" + username);
        navigate("/login");
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h1>Create an account</h1>
                <TextField id="username" label="Enter your username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField id="email" label="Enter your email" variant="outlined" />
                <TextField id="password" label="Enter your password" variant="outlined" type="password" />

                <Button type="submit" variant="contained" color="primary" size="large" style={{ textTransform: 'none' }}>
                    sign up
                </Button>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    Already have an account? <Link onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</Link>
                </Typography>
                
            </form>
        </div>
    );
}

export default Register;