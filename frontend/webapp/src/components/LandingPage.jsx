import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from '@mui/material';
import './title.css'

function LandingPage() {
    const navigate = useNavigate();
    return (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor="#16161a"
        >
        <Typography variant="h2" component="h1" gutterBottom color="#fffffe">
        Hello, this is recapIT <span className="cursor">|</span> 
        </Typography>
        <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate("/register")}
            sx={{ 
                backgroundColor: '#7f5af0',
                color: '#fffffe',
                ':hover': {
                    backgroundColor: '#2cb67d'
                }
            }}
        >
            Let's go
        </Button>
        </Box>
    );
}


export default LandingPage;