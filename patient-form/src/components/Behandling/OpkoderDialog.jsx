import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import BehandlingDataValidator from '../../util/validator/BehandlingDataValidator';


const OpkoderDialog = (props) => {

    const { open, behandling, setBehandling,
        onDialogClose, registeringKirurgi } = props; 

    const [ dialogOpkoder, setDialogOpkoder ] = useState(behandling.opkoder)
    const [ dialogOpkod, setDialogOpkod ] = useState("")
    
    const [ invalidOpkod, setInvalidOpkod ] = useState(false)

    useEffect(() => {
        setDialogOpkoder(behandling.opkoder)
    }, [behandling])

    const handleOnAddClick = () => {

        if (BehandlingDataValidator(dialogOpkod, 'opkod').valid) {

            setBehandling({
                ...behandling,
                opkoder: [...behandling.opkoder, dialogOpkod]
            })
            setDialogOpkod("")
        } else {
            setInvalidOpkod(true)
        }
    }        

    const handleClose = () => {

        setDialogOpkod("")
        onDialogClose()
    }

    const handleOnOpkodChange = (e) => {
        setDialogOpkod(e.target.value)
        setInvalidOpkod(false)
    }

    return (
        <Dialog 
            onClose={handleClose}
            open={open}>
            { 
                behandling.datum ?
                <DialogTitle>Operationskoder {behandling.datum.substring(0,10)}</DialogTitle>
                :
                <DialogTitle>Saknar operationskoder för behandling</DialogTitle>
            }
            {   
                /* Render TextField and AddButton if the
                user is registering a 'Kirurgi'
                and not browsing 'Opkoder' */ 
                registeringKirurgi ?
                <Box sx={{ alignItems: 'center', width: 'fit-content'}}>
                    { invalidOpkod ? 
                        <TextField 
                        error
                        id="outlined-basic" 
                        label="Kod"
                        helperText="Ex. AB4455"
                        variant="filled"
                        value={dialogOpkod}
                        onChange={(e) => handleOnOpkodChange(e)} />
                    :
                        <TextField 
                        id="outlined-basic" 
                        label="Kod"
                        helperText="Ex. AB4455"
                        variant="filled"
                        value={dialogOpkod}
                        onChange={(e) => handleOnOpkodChange(e)} />
                    }
                    <Button variant="contained" size='large' onClick={handleOnAddClick}>
                        Lägg till kod
                    </Button>
                    <List dense={true} sx={{ pt: 0 }}>
                        { dialogOpkoder && dialogOpkoder.map((opkod) => (
                            <ListItem>
                                <ListItemText
                                primary={opkod}/>
                            </ListItem>
                        ))}
                    </List> 
                </Box>
            : 
                /* Render List Items only
                   if user just browsing */
                <Box sx={{ alignItems: 'center', width: 'fit-content'}}>
                    <List dense={true} sx={{ pt: 0 }}>
                        { dialogOpkoder && dialogOpkoder.map((opkod) => (
                            <ListItem>
                                <ListItemText
                                primary={opkod}/>
                            </ListItem>
                        ))}
                    </List> 
                </Box>       
            }
        </Dialog>
        );
}

export default OpkoderDialog;
