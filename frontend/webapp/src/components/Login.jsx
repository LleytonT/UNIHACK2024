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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h1>Login</h1>
                <TextField id="username" label="Enter your username" variant="outlined" />
                <TextField id="password" label="Enter your password" variant="outlined" type="password" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <FormControlLabel
                        control={<Checkbox name="rememberMe" />}
                        label="Remember me"
                    />
                    <Link onClick={handleRegister} style={{ cursor: 'pointer' }}>Forgot password?</Link>
                </div>
                
                <Button type="submit" variant="contained" color="primary" size="large" style={{ textTransform: 'none' }}>
                    Login
                </Button>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    Don't have an account? <Link onClick={handleRegister} style={{ cursor: 'pointer' }}>Register</Link>
                </Typography>
                
            </form>
        </div>
    );
}

export default Login;