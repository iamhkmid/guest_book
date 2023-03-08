import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import  Button  from "@mui/material/Button"

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import moment from 'moment';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { TGuest } from '../../Types/guest';
import { GUESTS } from '../../Graphql/user.graphql';
import { useState } from 'react';
import PopupDeleteGuest from '../Popup/DeleteGuest';
import PopupUpdateGuest from '../Popup/UpdateGuest';
import { CircularProgress } from '@mui/material';


type TResGuest = {
  guests: TGuest[]
}

interface Column {
  id: 'id' | 'no' | 'nama' | 'nomorTelepon' | 'alamat' | 'keperluan' | "tanggal" | "aksi";
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  hidden?: boolean | false;
  
}

const columns: readonly  Column[] = [
  { id: 'id', label: 'id', minWidth:0, hidden: true},
  { id: 'no', label: 'No', minWidth:10 },
  { id: 'nama', label: 'Nama', minWidth: 50 },
  {
    id: 'nomorTelepon',
    label: 'Nomor Telepon',
    minWidth: 10,

  },
  {
    id: 'alamat',
    label: 'Alamat',
    minWidth: 170,

  },
  {
    id: 'keperluan',
    label: 'Keperluan',
    minWidth: 170,
    
  },
  { id: 'tanggal', label: 'Tanggal Kunjungan', minWidth: 100 },
  { id: 'aksi', label: 'Aksi', minWidth: 0, align:"left"},
];

interface Data {
  id: string;
  no: string;
  nama: string;
  alamat: string
  nomorTelepon: string;
  keperluan: string;
  tanggal: string;
  aksi: any;
}

function createData(
  id: string,
  no: string,
  nama: string,
  alamat: string,
  nomorTelepon: string,
  keperluan: string,
  tanggal: string,
  aksi: any
): Data {
  return { id, no, nama, nomorTelepon,  alamat, keperluan, tanggal, aksi };
}




export default function TableComponent() {
  const [popupDelete, setPopupDelete] = useState(false)
  const [popupUpdate, setPopupUpdate] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteData, setDeleteData] = useState<{ id: string; name: string; }>({ id: "", name: "" })
  const [updateData, setUpdateData] = useState<TGuest | null>(null)
  const [load, setLoad] = useState(true)
  const doc = new jsPDF()

  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const { data, error, loading, refetch } = useQuery<TResGuest>(GUESTS)

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, dataProps: { id: string; name: string; }) => {
    e.stopPropagation()
    setPopupDelete(true)
    setDeleteData(dataProps)
  }

  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: TGuest) =>{
    e.stopPropagation()
    setUpdateData(data)
    setPopupUpdate(true)
  }

  const rows: any = data?.guests?.map((val, idx) =>  {

    return createData(
      val?.id,
      String(idx + 1),
      val?.name,
      val?.address,
      val?.phoneNumber,
      val?.description,
      moment(val?.createdAt).locale("id").format("DD/MM/YYYY HH:mm:ss"),
    <Action>
      <Button onClick={(e) => onClickUpdate(e, val)}><EditIcon /></Button>
      <Button onClick={(e) => onClickDelete(e, { id: val?.id, name: val?.name })}><XIcon /></Button>
    </Action>
    )}, [data]);

    


    
    

    const col = columns?.map((column) => {
      return (
        column.label
      )
    })

    const ro: any = data?.guests.map ((val, idx) => {
      let x = Object.entries(val)
      return{
      id: val.id,
      no: idx+1,
      name: val.name
      }
    })


    



    const onCloseDeleteBook = () => {
      setPopupDelete(false)
    }

    const onCloseUpdateBook = () => {
      setPopupUpdate(false)
    }
  

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 

  

console.log(ro);


// autoTable(doc, {
//   head: [col],
//   body: [ro]
// })

//    const createPDF = () => {
//       doc.save('table.pdf')
//    }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <PopupDeleteGuest open={popupDelete} onClickClose={onCloseDeleteBook} data={deleteData} refetch={refetch} />
      <PopupUpdateGuest open={popupUpdate} onClickClose={onCloseUpdateBook} data={updateData!} refetch={refetch}/>
      {load === true && data?.guests?.length === 0 ?  <CircularProgress /> : 
      <TableContainer sx={{ maxHeight: "60vh",   }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => column.hidden !== true && ( 
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
 
         
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) =>  {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => column.hidden !== true &&   (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    
                  </TableRow>
                );
              })}
          </TableBody>

        </Table>
      </TableContainer>
}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      
      
    </Paper>
  );
}

const Action = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 5px;
  > button.MuiButton-root {
    min-width: auto;
    min-height: auto;
    height: fit-content;
    padding: 5px;
    border-radius: 100%;
    margin: 0;
    
    color: ${({ theme }) => theme?.colors?.text?.ultraSoft};
    :hover {
      background: ${({ theme }) => theme?.colors?.red?.["09"]};
    }
    > svg {
      height: 20px;
      path{
        stroke-width: 40px;
      }
      rect, path {
        fill: ${({ theme }) => theme?.colors?.text?.ultraSoft};
      }
    }
  }
  > button.MuiButton-root:nth-child(1) {
    background: ${({ theme }) => theme?.colors?.primary?.default};
  }
  > button.MuiButton-root:nth-child(2) {
    background: ${({ theme }) => theme?.colors?.red?.["07"]};
  }
`;


const XIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M368 368L144 144M368 144L144 368" /></svg>)
const PlusIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="54" d="M256 112v288M400 256H112" /></svg>)
const EditIcon = () => (<svg viewBox="0 0 512 512"><title>Pencil</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="44" d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zM413.07 74.84l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z" /></svg>)
