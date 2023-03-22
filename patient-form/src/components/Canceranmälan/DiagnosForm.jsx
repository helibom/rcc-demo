import React from 'react'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DiagnosTable from './DiagnosTable';
import TextField from '@mui/material/TextField';
import TabHeader from '../TabHeader';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { useState } from "react";
import DiagnosDataValidator from "../../util/validator/DiagnosDataValidator";

const DiagnosForm = ({diagnoser, setDiagnoser}) => {

  const today = dayjs().add(30, 'second')

  const [diagnos, setDiagnos] = useState({
    diagnosgrund: "",
    datum: today.toISOString()
  })

  const [ saveFailure, setSaveFailure ] = useState(false)

  const handleNewDatum = (date) => {

    const newDatum = date.toISOString()

    setDiagnos({
      ...diagnos,
      datum: newDatum
    })
  }

  const handleNewDiagnosGrund = (e) => {

    setDiagnos({
      ...diagnos,
      diagnosgrund: e.target.value
    })
  }

  const handleSaveDiagnos = () => {
    
    const ret = DiagnosDataValidator(diagnos)
    
    if (ret.valid === false) 
      setSaveFailure(true)
    else {
      setSaveFailure(false)
      setDiagnoser([
        diagnos,
        ...diagnoser
      ])
    }
  }

  return (
    <React.Fragment>
      <Stack spacing={1}>
        <TabHeader headerTitle="Diagnos"/>
        {saveFailure ? 
          <TextField 
            error
            required
            id="form-diagnosgrund"
            label="Diagnosgrund"
            helperText="PAD, cytologi, röntgen eller klinisk undersökning"
            variant="outlined"
            onChange={(e) => handleNewDiagnosGrund(e)}
          />
          :
          <TextField 
            id="form-diagnosgrund"
            required
            label="Diagnosgrund"
            helperText="PAD, cytologi, röntgen eller klinisk undersökning"
            variant="outlined"
            onChange={(e) => handleNewDiagnosGrund(e)}
          />
        }
        <DateTimeField 
          views={['year', 'month', 'day', 'hours', 'minutes']} 
          required
          defaultValue={today}
          onChange={(e) => handleNewDatum(e)}
        />
        <Button onClick={handleSaveDiagnos}>
          Registrera Diagnos
        </Button>
        <DiagnosTable diagnoser={diagnoser}/>
      </Stack>
    </React.Fragment>
  );
};

export default DiagnosForm;