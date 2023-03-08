import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

type TInputArea =
{
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: boolean;
}

const InputTextArea:React.FC<TInputArea> = (props) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <Input
      fullWidth
      id={props.id}
        label={props.label}
          multiline
          rows={5}
          onChange={props.onChange} value={props.value} error={props.error}/> 
    </Box>
  );
}


export default InputTextArea;

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