import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box';
import InputText from '../Input/InputText'
import InputTextArea from '../Input/InputTextArea'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Buttons from '../Button';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form'
import { TForm, TGuest, TMutationAddGuest, TMutationUpdateGuest } from '../../Types/guest';
import { ADDGUEST, GUESTS, PORTAL_INIT_GUEST_UPDATE, UPDATEGUEST } from '../../Graphql/user.graphql';
import { useMutation, useQuery } from '@apollo/client';
import { Dialog } from '@mui/material';
import data from '../Table/data';


type TModal = {
  open: boolean;
  onClickClose: () => void;
  data: TGuest;
  refetch: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PopupUpdateGuest: React.FC<TModal> = (props) => {
  type TResGuest = {guest: TGuest}

  const { data: dataInit, refetch, loading: loadInit } = useQuery<TResGuest>(PORTAL_INIT_GUEST_UPDATE, {
    variables: { guestId: props.data?.id! },
    skip: !props.data?.id || !props.open,
    fetchPolicy: "network-only",

  })

  React.useEffect(() => {
    if (props.open) {
      refetch({ guestId: props.data.id })
    }
  }, [props.open])

  console.log(dataInit);
  

  const defaultValues = React.useMemo(() => ({
    name: dataInit?.guest?.name ,
    phoneNumber: dataInit?.guest?.phoneNumber,
    address: dataInit?.guest?.address,
    description: dataInit?.guest?.description,
  }), [dataInit]);




  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Tamu
          </Typography>
          {dataInit ? <div>
            <FormData {...props} defaultValues={defaultValues} />
            </div> : null}
        
        </div>
      </Modal>
    </div>
  );
};

type TFormdata = {
  defaultValues: {
    name?: string;
    phoneNumber?: string;
    address?: string;
    description?: string;
  };
  open: boolean;
  data: TGuest;
  onClickClose: () => void;
}

const FormData: React.FC<TFormdata> = ({ open, onClickClose, defaultValues, data }) => {

  React.useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])


  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TForm>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [updateGuest, { data: datares, error, loading}] = useMutation<TMutationUpdateGuest>(UPDATEGUEST, {
    errorPolicy: "all",
    fetchPolicy: 'network-only'
  })


  React.useEffect(() => {
    if (datares?.updateGuest) {
      onClickClose()
    }
  }, [datares])

  const onSubmit = async (values: TForm) => {
    try {
      await updateGuest({
        variables: {
          data: { ...values, guestId: data.id }
        }
      });
    } catch (error) { }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tambah Tamu
          </Typography>
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
            <Buttons label='Tambah' type='submit' disabled={!isValid}/>
            <Buttons label='Batal' onClick={onClickClose}/>
          </ButtonWrapper>
        </Box>
      </form>
  )
}

export default PopupUpdateGuest;

const validationSchema =
  yup.object({
    name: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    address: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });
  


const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const ButtonWrapper = styled.div`
margin-top: 10px;
display: flex;
flex-direction: row;
gap: 10px;
`

