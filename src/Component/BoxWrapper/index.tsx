import React from 'react'
import styled from 'styled-components';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import UsersIcon from '../../Asset/people-circle-outline.svg'

type Tbox = {
  label: string ;
  value?: number;
}

const BoxComponent: React.FC<Tbox> = (props) => {
  return (
    <div>
      <Box>
        <Card>
          <Logo src={UsersIcon} alt="" />
          <Label>{props.label}</Label>
          <Count>{props.value}</Count>
        </Card>
      </Box>
    </div>
  )
}

export default BoxComponent;

const Box = styled.div`
  border: solid black 1px;
  border-radius: 20px;
  width: 400px;
  height: 200px;
  background-color: white;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
`

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin: 0;
`

const Count = styled.p`
  font-size: 50px;
  margin: 0;
  padding: 0;
  
`
const Label = styled.p`
  font-size: 20px;
  margin: 0;
  padding: 0;
  
`

