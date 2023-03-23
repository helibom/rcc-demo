import React from 'react'
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BehandlingTableRow } from './BehandlingTableRow';

const BehandlingTable = (props) => {

    const { behandlingar, setDialogOpen, 
            setBehandlingInDialog, setRegisteringKirurgi } = props

    const sortBehandlingar = (a, b) => {
      if (dayjs(a.datum).isBefore(b.datum))
        return -1
      else if (dayjs(a.datum).isAfter(b.datum))
        return 1
      else 
        return 0
    }        

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} 
            size="small" aria-label="collapsible table"> 
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row"><b>Behandlingstyp</b></TableCell>
                <TableCell><b>Datum</b></TableCell>
                <TableCell><b>Operationskoder</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {behandlingar.sort(sortBehandlingar).map((behandling) => (
                <BehandlingTableRow 
                  behandling={behandling} 
                  setDialogOpen={setDialogOpen}
                  setBehandlingInDialog={setBehandlingInDialog}
                  setRegisteringKirurgi={setRegisteringKirurgi}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}



export default BehandlingTable;