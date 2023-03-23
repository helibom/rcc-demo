import React from "react"
import DiagnosForm from "./Canceranmälan/DiagnosForm";
import { useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PatientFormSaveButton from "./PatientFormSaveButton";
import BehandlingForm from "./Behandling/BehandlingForm";
import TillståndForm from "./Allmäntillstånd/TillståndForm";
import PatientDataValidator from "../util/validator/PatientDataValidator.js"


const PatientFormLogic = ({patientData}) => {

    const [ diagnoser, setDiagnoser] = useState(patientData.diagnoser)
    const [ behandlingar, setBehandlingar] = useState(patientData.behandlingar)
    const [ allmänTillstånd, setAllmänTillstånd ] = useState(patientData.tillstand)

    const [ tabChoice, setTabChoice ] = useState(0)
    const onTabsChange = (event, newChoice) => {
        setTabChoice(newChoice)
    };

    const [ saveSuccess, setSaveSuccess ] = useState(false)
    const [ saveFailure, setSaveFailure ] = useState(false)

    /* Validates new data registered
       during the 'session' */
    const validateChanges = () => {

        const data = {
            personNbr: patientData.personNbr,
            behandlingar: behandlingar,
            tillstand: allmänTillstånd,
            diagnoser: diagnoser
        }

        if (PatientDataValidator(data).valid) {

            /* Submit validated data to INCA here */
            window.inca = data

            setSaveSuccess(true)
        } else {
            setSaveFailure(true)
        }
    }

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
            <PatientFormSaveButton 
                validateChanges={validateChanges}
                saveSuccess={saveSuccess} 
                setSaveSuccess={setSaveSuccess}
                saveFailure={saveFailure}
                setSaveFailure={setSaveFailure}
                />
        </React.Fragment>          
    )
  }
  export default PatientFormLogic;
  