import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import theme from '../src/componentes/Theme/theme';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
//import ImgMediaCard from './componentes/Card/Card';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
    document.getElementById('root')
);


