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
    opkoder: Array()
  })

  /* OpkoderDialog */
  const [ dialogOpen, setDialogOpen ] = useState(false)

  /* The 'Behandling' object to show in OpkoderDialog */
  const [ behandlingInDialog, setBehandlingInDialog ] = useState(behandling)

  const [ registeringKirurgi, setRegisteringKirurgi ] = useState(true)

  /* Is 'behandlingstyp' property of 'Behandling' valid */
  const [ behandlingstypInvalid, setBehandlingstypInvalid ] = useState(false)

  const [ opkodInvalid, setOpkodInvalid ] = useState(false)

  const onDialogClose = () => {
    
    setDialogOpen(!dialogOpen)

    const registeredBehandling = {
      ...behandling
    }

    if (registeringKirurgi) {
      setBehandlingar([
        registeredBehandling,
        ...behandlingar
      ])
      setBehandling({
        behandlingstyp: "",
        datum: tomorrow.toISOString(),
        opkoder: Array()
      })
    }
    setRegisteringKirurgi(false)
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
        setRegisteringKirurgi(true)
        setDialogOpen(true)
      } 
      else {
        setBehandlingar([
          behandling,
          ...behandlingar
        ])
      }
  }
  
  const handleNewDatum = (date) => {

    setBehandling({
      ...behandling,
      datum: date.toISOString()
    })
    setBehandlingInDialog(behandling)
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

  const handleRegisterOpkod = (opkod) => {

    if (BehandlingDataValidator(opkod, 'opkod').valid) {

      const updatedBehandling = {
        ...behandling,
        opkoder: [opkod, ...behandling.opkoder]
      }
      setBehandling(updatedBehandling)
      setBehandlingInDialog(updatedBehandling)
      setOpkodInvalid(false)
    } else {
      setOpkodInvalid(true)
    }
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
            dialogOpen={dialogOpen}
            registeringKirurgi={registeringKirurgi}
            datum={behandlingInDialog.datum}
            opkoder={behandlingInDialog.opkoder}
            opkodInvalid={opkodInvalid}
            handleRegisterOpkod={handleRegisterOpkod}
            onDialogClose={onDialogClose}
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