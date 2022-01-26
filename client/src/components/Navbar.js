import React, {useContext} from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppContext } from "../Context/AppProvider";


export default function Navbar(){
  const {user: {username}, logout} = useContext(AppContext)
  return (
    <div>
      <AppBar position="static" color="inherit" sx={{display: "inline"}}>
        <CssBaseline/>
        <Box >
          <List sx={{display: "flex", backgroundColor: "#545863", color: "#ffff"}}>
            <ListItem button ><ListItemIcon><HomeIcon style={{ fill: '#ffff' }}/></ListItemIcon><Link color="inherit" underline="none" component={RouterLink} to="/home">Home</Link></ListItem>
            <ListItem button ><ListItemIcon><CreateIcon style={{ fill: '#ffff' }}/></ListItemIcon><Link color="inherit" underline="none" component={RouterLink} to="/threads">Threads</Link></ListItem>
            <ListItem button ><ListItemIcon><PersonIcon style={{ fill: '#ffff' }}/></ListItemIcon><Link color="inherit" underline="none" component={RouterLink} to="/profile">Profile</Link></ListItem>
            <ListItem button onClick={logout}><ListItemIcon><LogoutIcon style={{ fill: '#ffff' }}/></ListItemIcon>Logout</ListItem>
          </List>
        </Box>
      </AppBar>
  </div>
  )
}