import React from 'react'
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DiagnosTable = ({diagnoser}) => {

    const rows = diagnoser

    const sortDiagnoser = (a, b) => {
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
            size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><b>Diagnosgrund</b></TableCell>
                <TableCell align="right"><b>Datum</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>              
              {rows.sort(sortDiagnoser).map((row) => (
                <TableRow
                  key={row.datum}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.diagnosgrund}
                  </TableCell>
                  <TableCell align="right">{row.datum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}

export default DiagnosTable