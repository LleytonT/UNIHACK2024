import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


import Chat from './Chat'; 


function Summariser(props) {
    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Sidebar /> 
      <Box sx={{ flexGrow: 1, backgroundColor: '#16161a', height: 'calc(100vh - 64px)' }}>
        <Header sx={{backgroundColor: '#16161a'}}/> 
        <Chat />
      </Box>
    </Box>
  );
}

function Sidebar() {
    const navigate = useNavigate();

    const drawerWidth = '60px';
    return (
        <Drawer
        sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#72757e',
            },
        }}
        variant="permanent"
        anchor="left"
        >
        <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <img
                        src="/images/appLogo.png"
                        alt="app Logo"
                        width="30px"
                        height="30px"
                    />
                </ListItemIcon>
                <ListItemText primary={"app logo"} />
                </ListItemButton>
        </ListItem>
        <Divider />
        <List>
            {['', ''].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                {index % 2 === 0 ? <img
                        src="/images/slack.png"
                        alt="Slack Logo"
                        width="25px"
                        height="5%"
                    />: <AddIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {[''].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => navigate('/login')}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Drawer>
    );
}

function Header() {
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, color:'#fffffe', height:"10vh"}}>
        recapIT.
      </Typography>
    </Toolbar>
  );
}


export default Summariser;
