import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TillståndTable = ({allmänTillstånd}) => {

    const rows = allmänTillstånd

    const sortEcogs = (a, b) => {
      return  b.ecog - a.ecog
    }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} 
            size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ECOG</TableCell>
                <TableCell align="right">Datum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>              
              {rows.sort(sortEcogs).map((row) => (
                <TableRow
                  key={row.datum}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.ecog}
                  </TableCell>
                  <TableCell align="right">
                    {row.datum}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}

export default TillståndTable