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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#16161a' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#fffffe'}}> {/* Color for heading */}
            <h1 style={{ color: '#fffffe' }}>Create an account</h1> 
            <TextField 
                id="username" 
                label="Enter your username" 
                variant="outlined" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                sx={{ 
                    input: { color: '#94a1b2' }, // Text input color
                    label: { color: '#94a1b2' }, // Label color
                }}
            /> 
             <TextField 
                id="email" 
                label="Enter your email" 
                variant="outlined" 
                sx={{ 
                    input: { color: '#94a1b2' }, // Text input color
                    label: { color: '#94a1b2' }, // Label color
                }}
            />
            <TextField 
                id="password" 
                label="Enter your password" 
                type="password"
                variant="outlined" 
                sx={{ 
                    input: { color: '#94a1b2' }, // Text input color
                    label: { color: '#94a1b2' }, // Label color
                }}
            />
    
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large" 
                style={{ textTransform: 'none' }}
                sx={{ backgroundColor: '#7f5af0', color: '#fffffe' }}
            >
                sign up
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px', color: '#94a1b2' }}> 
                Already have an account? <Link onClick={handleLogin} style={{ cursor: 'pointer', color: '#94a1b2' }}>Login</Link> 
            </Typography>            
          </form>
        </div>
      );
    };

export default Register;