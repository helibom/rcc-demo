import React from "react"
import DiagnosForm from "./Canceranmälan/DiagnosForm";
import { useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PatientFormSaveButton from "./PatientFormSaveButton";
import BehandlingForm from "./Behandling/BehandlingForm";
import TillståndForm from "./Allmäntillstånd/TillståndForm";


const PatientFormLogic = ({patientData}) => {

    const [ diagnoser, setDiagnoser] = useState(patientData.diagnoser)
    const [ behandlingar, setBehandlingar] = useState(patientData.behandlingar)
    const [ allmänTillstånd, setAllmänTillstånd ] = useState(patientData.tillstand)

    const [ tabChoice, setTabChoice ] = useState(0)

    const onTabsChange = (event, newChoice) => {
        setTabChoice(newChoice)
    };

    return ( 
        <React.Fragment>
            <Box display="flex" alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}></Box>
                <Tabs value={tabChoice} onChange={onTabsChange} centered>
                    <Tab label="Canceranmälan" />
                    <Tab label="Behandlingar" />
                    <Tab label="Allmäntillstånd" />
                </Tabs> 
                {tabChoice === 0 &&
                    <DiagnosForm diagnoser={diagnoser} setDiagnoser={setDiagnoser}/>
                }
                {tabChoice === 1 &&
                    <BehandlingForm behandlingar={behandlingar} setBehandlingar={setBehandlingar}/>
                }  
                {tabChoice === 2 &&
                    <TillståndForm allmänTillstånd={allmänTillstånd} setAllmänTillstånd={setAllmänTillstånd}/>
                }  
            <Box/>
            <PatientFormSaveButton patientData={patientData}/>
        </React.Fragment>          
    )
  }
  export default PatientFormLogic;
  