import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


import logo from '../../Lambang_Polda_DIY.png' 

import Toolbar from '@mui/material/Toolbar';

import styled from 'styled-components'


const Header = () => {

  return (
    <Box>
          <ImageWrapper >
            <img src={logo} alt="logo" />
            <p> Kepolisian Daerah<br/>Daerah Istimewa Yogyakarta</p>
          </ImageWrapper>
    </Box>
  );
}

export default Header

const Wrapper = styled(Toolbar)`
  background-color: white;
 
`
const ImageWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0px ;

  > img {
  width: 3%;
  height: 3%;
  }
  > p {
    color: black;
    font-family: "poppins";
    font-weight: bold;
  }
`