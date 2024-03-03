import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Link, FormControlLabel, Checkbox} from "@mui/material";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        navigate("/summariser");
    };
    const handleRegister = () => {
        navigate("/register");
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#16161a'}}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h1 style={{ color: '#fffffe' }}>Login</h1>
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
                    id="password" 
                    label="Enter your password" 
                    variant="outlined" 
                    value={username} 
                    sx={{ 
                        input: { color: '#94a1b2' }, // Text input color
                        label: { color: '#94a1b2' }, // Label color
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <FormControlLabel
                    control={<Checkbox name="rememberMe" />}
                    label="Remember me"
                    sx={{
                        '& .MuiFormControlLabel-label': { 
                            color: '#94a1b2' 
                        }
                    }}
                />
                    <Link onClick={handleRegister} style={{ cursor: 'pointer', }}>Forgot password?</Link>
                </div>
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    style={{ textTransform: 'none', backgroundColor: '#7f5af0' }}> 
                    Login
                </Button>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#fffffe' }}>
                    Don't have an account? <Link onClick={handleRegister} style={{ cursor: 'pointer' }}>Register</Link>
                </Typography>
                
            </form>
        </div>
    );
}

export default Login;