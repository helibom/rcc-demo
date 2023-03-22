import React from 'react'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TabHeader from '../TabHeader';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { useState } from "react";
import BehandlingDataValidator from "../../util/validator/BehandlingDataValidator";
import BehandlingTable from './BehandlingTable';
import OpkoderDialog from './OpkoderDialog'

const BehandlingForm = ({behandlingar, setBehandlingar}) => {

  const tomorrow = dayjs().add(1, 'day')

  /* The 'Behandling' object currently being registered */
  const [behandling, setBehandling] = useState({
    behandlingstyp: "",
    datum: tomorrow.toISOString(),
    opkoder: []
  })

  /* Is 'behandlingstyp' property of 'Behandling' valid */
  const [ behandlingstypInvalid, setBehandlingstypInvalid ] = useState(false)

  /* OpkoderDialog */
  const [ dialogOpen, setDialogOpen ] = useState(false)

  /* The 'Behandling' object to show in OpkoderDialog */
  const [ behandlingInDialog, setBehandlingInDialog ] = useState(behandling)

  const [ registeringKirurgi, setRegisteringKirurgi ] = useState(true)

  const onDialogClose = () => {
    
    setDialogOpen(!dialogOpen)

    if (registeringKirurgi) {

      setBehandlingar([
        behandling,
        ...behandlingar
      ])
    }
    setTimeout(() => (setRegisteringKirurgi(true)), 500) // dirty hack for ugly re-rendering of dialog 
    // setBehandling({
    //   behandlingstyp: "",
    //   datum: tomorrow.toISOString(),
    //   opkoder: []
    // })
    setBehandlingInDialog(behandling)
  }

  const handleRegistreraBehandling = () => {

      if (dayjs(behandling.datum).isBefore(dayjs())) {
        return
      }

      if (!BehandlingDataValidator(behandling.behandlingstyp, 'behandlingstyp').valid) {
        setBehandlingstypInvalid(true)
        return 
      } 

      if (BehandlingDataValidator(behandling.behandlingstyp, 'kirurgi').valid) {
        setDialogOpen(true)
      } else {
        setBehandlingar([
          behandling,
          ...behandlingar
        ])
      }
  }
  
  const handleNewDatum = (date) => {

    const updatedBehandling = {
      ...behandling,
      datum: dayjs(date).toISOString()
    }
    setBehandlingInDialog(updatedBehandling)
    setBehandling(updatedBehandling)
  }

  const handleNewBehandlingstyp = (e) => {

    const updatedBehandling = {
      ...behandling,
      behandlingstyp: e.target.value
    }
    setBehandlingInDialog(updatedBehandling)
    setBehandling(updatedBehandling)
    setBehandlingstypInvalid(false)
  }


  return (
    <React.Fragment>
      <Stack spacing={1} sx={{marginTop:2}}>
        <TabHeader headerTitle="Behandlingar"/>
        {behandlingstypInvalid ? 
          <TextField 
            error
            required
            id="form-behandlingstyp"
            label="Behandlingstyp"
            value={behandling.behandlingstyp}
            helperText="Kirurgi, strålbehandling eller cytostatikabehandling"
            variant="outlined"
            onChange={(e) => handleNewBehandlingstyp(e)}
          />
          :
          <TextField 
            id="form-diagnosgrund"
            required
            label="Behandlingstyp"
            helperText="Kirurgi, strålbehandling eller cytostatikabehandling"
            variant="outlined"
            value={behandling.behandlingstyp}
            onChange={(e) => handleNewBehandlingstyp(e)}
          />
        }
        <DateTimeField 
          views={['year', 'month', 'day', 'hours', 'minutes']} 
          disablePast
          required
          defaultValue={tomorrow}
          onChange={(e) => handleNewDatum(e)}
        />
        <Button onClick={handleRegistreraBehandling}>
          Registrera Behandling
        </Button>
        <OpkoderDialog
            open={dialogOpen}
            behandling={behandlingInDialog}
            setBehandling={setBehandling}
            onDialogClose={onDialogClose}
            registeringKirurgi={registeringKirurgi}
            /> 
        <BehandlingTable 
          behandlingar={behandlingar} 
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setBehandlingInDialog={setBehandlingInDialog}
          setRegisteringKirurgi={setRegisteringKirurgi}
        />
      </Stack>
    </React.Fragment>
  );
};

export default BehandlingForm;