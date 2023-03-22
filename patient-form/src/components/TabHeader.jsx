import React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const TabHeader = ({headerTitle}) => {

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5">{headerTitle}</Typography>
    </ThemeProvider>
  )
};
export default TabHeader;
  