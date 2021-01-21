import React from 'react';
import ReactDOM from 'react-dom';
import theme from '../src/componentes/Theme/theme';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import { NuevoLibro } from './componentes/NuevoLibro/NuevoLibro';



ReactDOM.render(
  
    <ThemeProvider theme={theme}>
      {/* <NuevoLibro/> */}
      <App/> 
    </ThemeProvider>,
 
   document.getElementById('root')
);


