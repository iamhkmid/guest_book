import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

type TInput =
{
  label: string;
  id: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: boolean;
}

const InputText:React.FC<TInput> = (props) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <Input fullWidth label={props.label} id={props.id} type={props.type} onChange={props.onChange} value={props.value} error={props.error} />
    </Box>
  );
}


export default InputText;



const Input = styled(TextField)`

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.MuiInputBase-root fieldset{
    border-radius: 20px;
    border-color: black;
  }

  
 
`