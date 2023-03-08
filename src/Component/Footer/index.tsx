import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <Label>@Copyright 2023 Polsek Gondomanan</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: white;
  text-align: center;
  border-top: 1px solid black;
`
const Label = styled.p`
  font-size: small;
`
export default Footer;