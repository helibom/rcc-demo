import React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const FormHeader = ({personNbr}) => {

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">Inmatningsformulär</Typography>
      <Typography variant="h5">Patient {personNbr}</Typography>
    </ThemeProvider>
  )
};
export default FormHeader;
  