import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Link, FormControlLabel, Checkbox} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
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
                    color="secondary"
                    sx={{ 
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#010101',
                                borderWidth: '2px', 
                            }, 
                            '& .MuiInputBase-input': { 
                                color: '#fffffe', 
                            }, 
                            // Label color change here
                            '& label': { 
                                color: '#fffffe', 
                            }, 
                            '&.Mui-focused label': { // Focused label color
                                color: '#fffffe' 
                            }
                        },
                    }}
                />
                <TextField id="password" label="Enter your password" variant="outlined" type="password" sx={{ 
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#010101',
                            },
                        },
                    }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <FormControlLabel
                        control={<Checkbox name="rememberMe" />}
                        label="Remember me"
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