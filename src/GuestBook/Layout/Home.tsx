import React from 'react'
import Footer from '../../Component/Footer'
import Header from '../../Component/Header'
import styled, { keyframes } from 'styled-components'
import InputText from '../../Component/Input/InputText'
import InputTextArea from '../../Component/Input/InputTextArea'
import Button from '@mui/material/Button';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TForm, TMutationAddGuest } from '../../Types/guest'
import Buttons from '../../Component/Button'
import { useMutation } from '@apollo/client'
import { ADDGUEST } from '../../Graphql/user.graphql'
import { Grid } from '@mui/material'


const Home= () => {

  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TForm>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [addGuest, { data, error, loading}] = useMutation<TMutationAddGuest>(ADDGUEST, {
    errorPolicy: "all",
    fetchPolicy: 'network-only'
  })
  

  const onSubmit = async (values: TForm) => {
    try {
      await addGuest({
        variables: {
          data: values
        }
      });
    } catch (error) { }
  }

  return (
    <Wrapper>
       <Grid style={{ minHeight: '100vh', width: "100%", display: 'flex', flexDirection: "column", backgroundColor: "#d8cfcf" }}>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <Title>Selamat Datang <br/> di Polsek Gondomanan</Title>
        <SubTitle>Silahkan Isi Buku Tamu Terlebih Dahulu</SubTitle>
        <InputWrapper>
        <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}, fieldState: {error} }) => (
              <InputText label='Nama Lengkap' id='name' type='text' value={value} onChange={onChange} error={!!error}/>
            )}
           />
           <Controller
            name="phoneNumber"
            control={control}
            render={({field: {onChange, value}, fieldState: {error} }) => (
              <InputText label='Nomor Telepon' id='phoneNumber' type='number' value={value} onChange={onChange} error={!!error}/>
            )}
           />
           <Controller
            name="address"
            control={control}
            render={({field: {onChange, value}, fieldState: {error} }) => (
              <InputTextArea id='address' label='Alamat' value={value} onChange={onChange} error={!!error}/>
            )}
           />
           <Controller
            name="description"
            control={control}
            render={({field: {onChange, value}, fieldState: {error} }) => (
              <InputTextArea id='description' label='Keperluan' value={value} onChange={onChange} error={!!error}/>
            )}
           />
          
        </InputWrapper> 
        <ButtonWrapper>
            <Buttons variant="contained" label='Submit' color='inherit' disabled={!isValid} type='submit'/>
          </ButtonWrapper>
        </FieldWrapper>
        </form>
        </Grid>
    </Wrapper>
  )
}

export default Home

const validationSchema =
  yup.object({
    name: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    address: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const defaultValues = {
    name: "",
    phoneNumber: "",
    address: "",
    description: "",
  };


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  
  box-sizing: border-box;
 

`

const Animation = keyframes`
  from {left: 0px;}
  to {left: 300px;}
`

const FieldWrapper = styled.div`
  width: 40%;
  background-color: red;
  margin-left: 30%;
  padding-bottom: 60px;
  background-color: white; 
  border-radius: 15px;
  border: 1px solid black;
  box-shadow: 4px 4px 4px 4px grey;
  max-height: 100vh;
  /* animation-name: ${Animation};
  animation: 5s infinite; */
  box-sizing: border-box;
`

const Title = styled.p`
  font-size:30px;
  text-align: center;
  margin: 0px;
  padding-top: 30px;
  font-weight: bold;
`
const SubTitle = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 0px;

`
const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  > Button {
    width: 500px;
  }
`


