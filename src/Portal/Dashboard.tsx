import React from 'react'
import Buttons from '../Component/Button'
import TableComponent from '../Component/Table'
import styled from 'styled-components'
import AddUsersModal from '../Component/Popup/AddGuest'
import { useState } from 'react'
import BoxComponent from '../Component/BoxWrapper'
import { useQuery } from '@apollo/client'

import { TGuest, TSummary } from '../Types/guest'
import { GUESTS, SUMMARY } from '../Graphql/user.graphql'
import { CircularProgress } from '@mui/material'

const Dashboard = () => {

  
  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState(false)
  

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  

  const {data, error, loading, refetch} = useQuery<TSummary>(SUMMARY)

  console.log(data?.summary?.numberOfVisits);
  

  return (
    <PageWrapper>
      
    <Wrapper>
      <BoxComponent label={"Kunjungan Bulan Ini"} value={data?.summary?.numberOfVisits?.month}/>
      <BoxComponent label={"Kunjungan Minggu Ini"} value={data?.summary?.numberOfVisits?.week} />
      <BoxComponent label={"Kunjungan Hari Ini"} value={data?.summary?.numberOfVisits?.day}/>
    </Wrapper>
      <TableComponent/>
      <ButtonWrapper>
        <Buttons label='Tambah Tamu' onClick={openModal} />
      </ButtonWrapper>
      <AddUsersModal open={open} onClickClose={closeModal} />
    </PageWrapper>
  )
}

export default Dashboard;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  width: 100%;
`

const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: end;
width: 100%,
`

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

`
