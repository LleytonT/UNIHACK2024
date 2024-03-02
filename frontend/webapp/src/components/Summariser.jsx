import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { blue } from '@mui/material/colors';
//import ChatInterface from './ChatInterface'; // Your chat component

// Import Icons (You'll likely need Material UI Icons or a 3rd-party icon library)
/* import SlackIcon from '@mui/icons-material/Slack';
import DiscordIcon from '@mui/icons-material/Discord';  */

const routes = [
  /* { path: '/summariser/slack', label: 'Slack', icon: <SlackIcon /> },
  { path: '/summariser/discord', label: 'Discord', icon: <DiscordIcon /> } */
];

function Summariser() {
  return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar /> 
        <Box sx={{ flexGrow: 1 }}> 
          <Header />
        </Box>
      </Box>
  );
}

function Sidebar() {
  return (
    <Box sx={{ width: 250, color: blue }}>
      <List>
        {routes.map((route) => (
          <Link to={route.path} key={route.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}

function Header() {
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Summariser
      </Typography>
    </Toolbar>
  );
}

export default Summariser;
