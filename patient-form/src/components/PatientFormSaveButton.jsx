import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const PatientFormSaveButton = (props) => {

    const { validateChanges, saveSuccess, 
        setSaveSuccess, saveFailure, setSaveFailure } = props 
        

    const handleOnSuccesBarClose = () => {
        setSaveSuccess(!saveSuccess)
    }

    const handleOnFailureBarClose = () => {
        setSaveFailure(!saveFailure)
    }
    
    return (
        <React.Fragment>
        <Button 
            onClick={validateChanges}
            size='large'
            variant="contained"
            color='info' sx={{bottom:0, right:0, position:"fixed", marginRight:10, marginBottom:10}}>
            Spara Ändringar
        </Button>
        <Snackbar 
            open={saveSuccess}
            autoHideDuration={6000}
            onClose={handleOnSuccesBarClose}>
            <Alert onClose={handleOnSuccesBarClose} severity="success" sx={{ width: '100%' }}>
            Ändringar har sparats till INCA
            </Alert>
        </Snackbar>
        <Snackbar
            open={saveFailure}
            autoHideDuration={6000}
            onClose={handleOnFailureBarClose}>
            <Alert onClose={handleOnSuccesBarClose} severity="error" sx={{ width: '100%' }}>
            Ändringar kunde inte sparas<br></br>
            Uppgifter felaktiga
            </Alert>
        </Snackbar>
    </React.Fragment>
    )
}

export default PatientFormSaveButton