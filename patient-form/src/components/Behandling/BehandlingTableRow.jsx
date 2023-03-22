import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import OpkoderDialog from './OpkoderDialog';
import { useState, useEffect } from 'react'

export const BehandlingTableRow = (props) => {

  const { behandling, setDialogOpen,  
    setBehandlingInDialog, setRegisteringKirurgi} = props
  
  const [ iconOpen, setIconOpen] = useState(false);

  const handleOnOpkoderCellClick = () => {
    setBehandlingInDialog(behandling)
    setRegisteringKirurgi(false)
    setDialogOpen(true)
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="left">{behandling.behandlingstyp}</TableCell>
        <TableCell align="left">{behandling.datum}</TableCell>
        <TableCell key={behandling.datum} align="center" scope="row">
          { 
            (behandling.opkoder && behandling.opkoder.length > 0) ? 
              <IconButton
                aria-label="expand row"
                size="small"
                sx={{ color: 'info.main' }}
                onClick={() => handleOnOpkoderCellClick()}> 
                <UnfoldMoreIcon/>
              </IconButton>
            :
              <IconButton
                disabled
                aria-label="expand row"
                size="small"
                onClick={() => handleOnOpkoderCellClick()}>
                <UnfoldMoreIcon/>
              </IconButton>
          }
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
