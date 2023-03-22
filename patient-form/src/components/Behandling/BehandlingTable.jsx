import React from 'react'
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

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} 
            size="small" aria-label="collapsible table"> 
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">Behandlingstyp</TableCell>
                <TableCell >Datum</TableCell>
                <TableCell >Operationskoder</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {behandlingar.map((behandling) => (
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