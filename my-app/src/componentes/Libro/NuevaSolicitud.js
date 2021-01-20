import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, TextField, Button, Grid, Container, Snackbar, IconButton} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import ButtonAppBar from '../App Bar/ButtonAppBar';
import Alert from '@material-ui/lab/Alert';
import Validar from './Validar/Validar';
import cargarErrores from './Validar/cargarErrores';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../Libro/libro.css';

    
export const NuevaSolicitud = ({solicitud , Volver, Dato, Libros}) => {
    
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const [libro, setLibro] =  useState(Dato)
    
    const [errores, setErrores] = useState({
      Nombre:false,
      Autor:false,
      Editorial:false,
      Año:false,
      Imagen:false,
      prestamo:false,
      devolucion:false,
      Dueño:false,
    });

    const [disabledCampos, setdisabledCampos] = useState(Object.keys(Dato).length>0?true:false);
    
    const [controlAlert, setControlAlert] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [severity, setSeverity] = useState('error');
    
    

        //CAMBIOS LIBRO Y PROPIETARIO
    const controlCambios = (name, value)=>{
      setLibro({ ...libro,[name]:value });
      if(value!==''){
      setErrores({...errores,[name]:false});
    }
    else{
      setErrores({...errores,[name]:true});
    }
  }
        // BOTON EXAMINAR //
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          }
        },
        input: {
          display: 'none'
        },
      }));
    const classes = useStyles();
    //
  
   

   const validarDatos = () =>{
   
    const { devolucion, prestamo }=libro;
    const array=Object.keys(libro)
    const resultado = cargarErrores(libro, Object.keys(errores));
    
    setErrores(resultado);

    Object.keys(resultado).map( error=>{

      if(resultado[error]===true){
        Validar(setControlAlert, setMensajeAlert);
      }
      else{
        if( Date.parse( prestamo ) <= Date.parse( devolucion ) ){
          if(libro.Imagen){
            setSeverity("success")
            solicitud(libro);
          }
          else{
            setControlAlert(true);
            setMensajeAlert("Debe Cargar Imagen!");
          }
        }
        else{
          setControlAlert(true);
            setMensajeAlert("Fechas Inválidas, favor de Verificar!");
        }
      }
    });
    
  }

    const resetear = () => {
      setLibro({});
    }

    return (
      <>
        <ButtonAppBar volver={Volver}/>
        <Container className="contenedor-Form">
                  <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1} className="margen">
                    <Grid item lg={5}>
                    <FormControl id="formulario" className="formulario-left">
                      <h2>Detalles de Solicitud</h2>
                     <br/>
                    <TextField
                      id="prestamo"
                      name="prestamo"
                      type="date"
                      label="Fecha de Préstamo"
                      value={libro.prestamo?libro.prestamo:''}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errores.prestamo}
                      required
                    />
                    <br/>
                    <TextField
                      id="devolucion"
                      name="devolucion"
                      label="Fecha de Devolución"
                      type="date"
                      value={libro.devolucion?libro.devolucion:''}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errores.devolucion}
                      required
                    />
                    <br/>                    
                    <TextField
                      name="Dueño" 
                      id="Dueño" 
                      label="Solicitante" 
                      variant="standard"
                      value={libro.Dueño?libro.Dueño:''}
                      onChange={e => controlCambios(e.target.name, e.target.value)}
                      error={errores.Dueño}
                      required
                    />
                    <br/>
                    </FormControl>
                    </Grid>
                    <Grid item lg={5} className="">
                    <FormControl size="medium" id="formulario" className="formulario-right">
                        <h2>Detalles de Libro</h2>
                        <InputLabel id="demo-mutiple-checkbox-label">Libros</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                        >

                          { Libros.map((name) => (
                            <MenuItem key={name.Id_Libro} value={name.Id_Libro}>
                              {name.Nom_Libro}
                              </MenuItem>
                          ))}
                          
                        </Select>
                        <TextField
                          name="Nombre"
                          id="Nombre" 
                          disabled={disabledCampos}
                          type="text"
                          label="Nombre de Libro" 
                          value={libro.Nombre?libro.Nombre:''}
                          variant="standard"
                          onChange={(e)=> controlCambios(e.target.name, e.target.value)}
                          error={errores.Nombre}
                          helperText={''}
                          required
                        />
                        <br/>
                        <TextField
                          id="Autor"
                          name="Autor"
                          type="text"
                          label="Autor"
                          variant="standard"
                          value={libro.Autor?libro.Autor:''}
                          className={classes.textField}
                          onChange={ e =>controlCambios(e.target.name, e.target.value)}
                          disabled={disabledCampos}
                          error={errores.Autor}
                          required
                        />
                        <br/>
                        <TextField
                          id="Editorial"
                          name="Editorial"
                          type="text"
                          label="Editorial"
                          variant="standard"
                          value={libro.Editorial?libro.Editorial:''}
                          className={classes.textField}
                          onChange={ (e) =>controlCambios(e.target.name, e.target.value)}
                          disabled={disabledCampos}
                          error={errores.Editorial}
                          required
                        />
                        <br/>
                        <TextField
                          id="Año"
                          name="Año"
                          type="text"
                          label="Año de Edición"
                          value={libro.Año?libro.Año:''}
                          variant="standard"
                          onChange={ (e) =>controlCambios(e.target.name, e.target.value)}
                          disabled={disabledCampos}
                          error={errores.Año}
                          required
                        />
                        <br/>
                        <br/>
                    <div className="contained">
                      <input 
                        name="Imagen"
                        accept="image/*" 
                        className={classes.input} 
                        id="icon-button-file" 
                        type="file" 
                        value={libro.Imagen?libro.Imagen:''}
                        onChange={ (e) =>controlCambios(e.target.name, e.target.value)}
                        />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                        <span>{libro.Imagen?libro.Imagen:`No se cargó Imagen`}</span>
                      </label>
                    </div>
                   </FormControl>
                    </Grid>
                  </Grid>
        </Container>
        
        <div className="contenedor-botones">
          <Button 
            className="boton1"
            onClick={e=>resetear(e)} 
            variant="outlined"
            disabled={disabledCampos}
            color="primary">Limpiar Campos</Button>
            <br/>
         <Button 
            onClick={validarDatos} 
            variant="outlined" 
            color="primary" 
            className="boton2">Agregar Solicitud</Button>
          <Snackbar 
            open={controlAlert} 
            autoHideDuration={2000} 
            onClose={controlAlert,()=>setControlAlert(false)}
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
          >
            <Alert onClose={controlAlert, ()=>setControlAlert(false)} severity={severity} variant="filled">
              {mensajeAlert}
            </Alert>
          </Snackbar>
        </div>
      </>  
    )
}

export default NuevaSolicitud;

