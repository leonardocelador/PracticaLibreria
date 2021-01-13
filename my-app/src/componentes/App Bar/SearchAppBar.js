import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import estilista from './estilista';

export default function SearchAppBar({Solicitudes}) {
  
  const classes = estilista();
  
  const escucharBuscar = (e) => {  
    const texto = e.target.value.toUpperCase();

    Solicitudes.map((solicitud)=>{
      console.log(solicitud)
      if(solicitud.Nombre.toUpperCase() === texto)
        console.log("se encontró",solicitud.Nombre);
      else
        console.log("No se encontró");
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooksIcon/>
          <Typography variant="h6" className={classes.title}>
             Libreria Lowa
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar Libro…"
              id="search"
              autoComplete="off"
              onChange={escucharBuscar}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Buscar' }}
            />
            
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}