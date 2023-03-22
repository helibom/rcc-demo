import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react"
import { ButtonBase } from '@mui/material';
import { useSate } from 'react'

import PatientDataValidator from "../util/validator/PatientDataValidator";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const PatientFormSaveButton = ({patientData}) => {

    const [ saveFailure, setSaveFailure ] = useState(false)
    const [ saveSuccess, setSaveSuccess ] = useState(false)

    const onClickSaveButton = () => {
        
        if (PatientDataValidator(patientData).valid) {

            window.inca = patientData

            setSaveSuccess(true)
        } else {
            setSaveFailure(true)
        }

        console.log(window.inca)
    }

    const handleSuccessClose = () => {
        setSaveSuccess(!saveSuccess)
    }

    const handleFailureClose = () => {
        setSaveFailure(!saveFailure)
    }
    
    return (
        <React.Fragment>
        <Button 
            onClick={onClickSaveButton}
            size='large'
            variant="contained"
            color='info' sx={{bottom:0, right:0, position:"fixed", marginRight:10, marginBottom:10}}>
            Spara Ändringar
        </Button>
        <Snackbar 
            open={saveSuccess}
            autoHideDuration={6000}
            onClose={handleSuccessClose}>
            <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
            Ändringar har sparats till INCA
            </Alert>
        </Snackbar>
        <Snackbar
            open={saveFailure}
            autoHideDuration={6000}
            onClose={handleFailureClose}>
            <Alert onClose={handleSuccessClose} severity="error" sx={{ width: '100%' }}>
            Ändringar kunde inte sparas<br></br>
            Uppgifter felaktiga
            </Alert>
        </Snackbar>
    </React.Fragment>
    )
}

export default PatientFormSaveButton