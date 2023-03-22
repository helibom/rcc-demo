import React from 'react'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabHeader from '../TabHeader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TillståndTable from './TillståndTable';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { useState } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import TillståndDataValidator from '../../util/validator/TillståndDataValidator';

const TillståndForm = ({allmänTillstånd, setAllmänTillstånd}) => {

  const today = dayjs()

  const [ tillstånd, setTillstånd ] = useState({
    ecog: 0,
    datum: today.toISOString()
  })

  const [ saveFailure, setSaveFailure ] = useState(false)

  const handleNewDatum = (date) => {

    const newDatum = dayjs(date).toISOString()

    setTillstånd({
      ...tillstånd,
      datum: newDatum
    })
  }

  const handleNewEcog = (e) => {

    setTillstånd({
      ...tillstånd,
      ecog: e.target.value
    })

    setSaveFailure(false)
  }

  const handleSaveTillstånd = () => {
  
    if (!TillståndDataValidator(tillstånd).valid) 
      setSaveFailure(true)
    else {
      setSaveFailure(false)
      setAllmänTillstånd([
        tillstånd,
        ...allmänTillstånd
      ])
    }
  }

  return (
    <React.Fragment>
      <Stack spacing={1}>
        <TabHeader headerTitle="Allmäntillstånd"/>
        { saveFailure ?
            <FormControl fullWidth error>
            <InputLabel id="ecog-select-label">ECOG</InputLabel>
            <Select
              labelId="ecog-select-label"
              id="ecog-select"
              value={tillstånd.ecog}
              label="ECOG"
              onChange={(e) => handleNewEcog(e)}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <FormHelperText>Error</FormHelperText>
            </FormControl>
          :
            <FormControl fullWidth>
            <InputLabel id="ecog-select-label">ECOG</InputLabel>
            <Select
              labelId="ecog-select-label"
              id="ecog-select"
              value={tillstånd.ecog}
              label="ECOG"
              onChange={(e) => handleNewEcog(e)}>
             <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            </FormControl>
        }
        <DateTimeField 
          views={['year', 'month', 'day', 'hours', 'minutes']} 
          required
          defaultValue={today}
          onChange={(e) => handleNewDatum(e)}/>
        <Button onClick={handleSaveTillstånd}>
          Registrera ECOG
        </Button>
        <TillståndTable allmänTillstånd={allmänTillstånd}/>
      </Stack>
    </React.Fragment>
  );
};

export default TillståndForm;