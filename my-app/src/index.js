import React from 'react';
import ReactDOM from 'react-dom';
import theme from '../src/componentes/Theme/theme';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import NuevaSolicitud from './componentes/Libro/NuevaSolicitud';



ReactDOM.render(
  
    <ThemeProvider theme={theme}>
      <App/> 
    </ThemeProvider>,
 
   document.getElementById('root')
);


