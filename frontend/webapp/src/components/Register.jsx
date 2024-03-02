import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login");
    };
    // Create a register form with username, email, and password fields using the TextField component from Material-UI.
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h1>Create an account</h1>
                <TextField id="username" label="Enter your username" variant="outlined" />
                <TextField id="email" label="Enter your email" variant="outlined" />
                <TextField id="password" label="Enter your password" variant="outlined" type="password" />

                <Button type="submit" variant="contained" color="primary" size="large" style={{ textTransform: 'none' }}>
                    sign up
                </Button>
            </form>
        </div>
    );
}

export default Register;