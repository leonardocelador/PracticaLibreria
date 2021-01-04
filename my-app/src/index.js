import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from '../src/componentes/Theme/theme';
import { ThemeProvider } from '@material-ui/core';
import './index.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

