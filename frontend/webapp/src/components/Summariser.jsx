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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ChatInterface from './ChatInterface'; 
function Summariser() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Sidebar /> 
      <Box sx={{ flexGrow: 1, backgroundColor: '#16161a', height: 'calc(100vh - 64px)' }}> {/* Adjust height as needed */}
        <Header sx={{backgroundColor: '#16161a'}}/> 
        <ChatInterface /> 
      </Box>
    </Box>
  );
}

function Sidebar() {
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
      <Toolbar />
      <Divider />
      <List>
        {['', ''].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <img
                    src="/images/slack.png"
                    alt="Slack Logo"
                    width="25px"
                    height="5%"
                  />
                ) : (
                  <img
                    src="/images/discord.png"
                    alt="Discord Logo"
                    width="25px"
                    height="5%"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['', '', ''].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
      <Typography variant="h6" sx={{ flexGrow: 1, color:'#fffffe'}}>
        Summariser
      </Typography>
    </Toolbar>
  );
}

export default Summariser;
