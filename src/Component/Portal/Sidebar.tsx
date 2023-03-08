import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';



import styled from "styled-components"
import logo from '../../Lambang_Polda_DIY.png' 
import Dashboard from '../../Portal/Dashboard';
import Users from '../../Portal/Users';

const drawerWidth = 240;

const PortalComponent = () => {
  const [menu, setMenu] = useState("Dashboard")
  const [selectedIndex, setSelectedIndnex] = useState(0)

  const data = (text: string, index: number) => {
    setMenu(text)
    setSelectedIndnex(index)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Logo src={logo} alt="logo" />
        <P> Kepolisian Daerah<br/>Daerah Istimewa Yogyakarta</P>
        <Divider />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard'].map((text, index) => (
              <ListItem key={text} button disablePadding onClick={() => data(text, index)} style={
                selectedIndex === index ? { backgroundColor: "grey" } : {}
              }>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <DashboardIcon /> : <PeopleIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
              <ListItem key={'Logout'} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                     <LogoutIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column", minHeight: "100vh", gap: "20px", backgroundColor: "#EDEDF0"}}>
      <Title>
      <p>{menu}</p>
      </Title>
      <Divider sx={{color: "black"}}/>
        {
          menu === 'Dashboard' ?
          <Dashboard />
          :
          menu === 'Daftar Tamu' ?
          <Users />
          : null
        }
     
      </Box>
    </Box>
  );
}

export default PortalComponent

const Title = styled.div`
  z-index: 100;
  > p {
    margin: 0;
    font-family: "Poppins";
    font-size: 20px;
  }
`
const Logo = styled.img`
  padding: 20px 80px 0px 80px;
`
const P = styled.p`
  margin: 0;
  text-align: center;
  margin-bottom: 20px;
`