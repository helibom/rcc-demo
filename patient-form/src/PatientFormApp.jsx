import './PatientFormApp.css'
import './styles/LoadingLogo.css'

import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LoadingLogo from './components/LoadingLogo';
import FormHeader from './components/FormHeader';
import PatientFormLogic from './components/PatientFormLogic'; 
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';

import { useState, useEffect } from 'react'


const PatientFormApp = ({input}) => {

    const [ patientData, setPatientData ] = useState(null)

    // API GET would go here in real example.
    useEffect(() => {
          fetch(input)
            .then(response => response.json())
            .then(data => setPatientData(data))
            .catch(error => console.log(`Could not get patient data
            ${error.message}`)) 
    }, [])


    if (!patientData) {
        return (
            <>
                <LoadingLogo />
            </>
        )
    } else {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <React.Fragment>
                    <CssBaseline>
                    <Container fixed>
                        <FormHeader personNbr={patientData.personNbr}/>
                        <PatientFormLogic patientData={patientData}/>
                    </Container>
                    </CssBaseline>
                </React.Fragment>
            </LocalizationProvider>
        );
    }
};
  
  export default PatientFormApp;
  