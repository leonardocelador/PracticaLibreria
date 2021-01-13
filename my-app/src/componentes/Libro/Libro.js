import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, TextField, Button, Grid, Container, Snackbar} from '@material-ui/core';
import ButtonAppBar from '../App Bar/ButtonAppBar';
import '../Libro/libro.css';
import Alert from '@material-ui/lab/Alert';

    
export const Libro = ({solicitud , Volver, Dato}) => {
  console.log(Object.values(Dato));

    const [libro, setLibro] =  useState(Dato)
    
    const [errores, setErrores] = useState({});

    const [disabledCampos, setdisabledCampos] = useState(Object.keys(Dato).length>0?true:false);
    
    const [controlAlert, setControlAlert] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [severity, setSeverity] = useState('error');
    
    

        //CAMBIOS LIBRO Y PROPIETARIO
    const controlCambios = (name, value)=>{
      if(!value){
        setErrores({...errores,[name]:true})
      }
      setLibro({ ...libro,[name]:value })
    }

        // BOTON EXAMINAR //
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display: 'none',
        },
      }));
    const classes = useStyles();
    //

   function validarDatos () {
      const {Nombre, Dueño, Imagen, devolucion, prestamo, Autor, Editorial, Año}=libro;
      if(Nombre){
        if(prestamo){
          if(devolucion){
            if(Date.parse(prestamo)>Date.parse(devolucion)){
              setControlAlert(true);
              setMensajeAlert("Fechas Inválidas! Verificar!!");}
              else{
                  if(Dueño){
                    if(Año){
                      if(Autor){
                        if(Editorial){
                          if(Imagen){
                            setSeverity("success");
                            setControlAlert(true);
                            setMensajeAlert("Datos Correctos");
                            
                            setTimeout(()=>{solicitud(libro); },1000)
                          }
                        else{
                          setControlAlert(true);
                          setMensajeAlert("Debe cargar Imagen del Libro");
                        }
                      }
                      else{
                        setControlAlert(true);
                        setMensajeAlert("Debe cargar Editorial del Libro");}
                    }
                    else{
                      setControlAlert(true);
                      setMensajeAlert("Debe cargar Autor del Libro");}
                  }
                  else{
                    setControlAlert(true);
                    setMensajeAlert("Debe cargar Año de Edición del Libro");}
                  }
                else{
                  setControlAlert(true);
                  setMensajeAlert("Debe cargar Solicitante");}
               }
          }
          else{
            setControlAlert(true);
            setMensajeAlert("Debe cargar Fecha de Devolución");}
        }
        else{
          setControlAlert(true);
          setMensajeAlert("Debe Cargar Fecha de Préstamo");}
      }
      else{
        setControlAlert(true);
        setMensajeAlert("Debe Cargar Nombre de Libro");
      }
    }
    const resetear = () => {
      setLibro({
        /* Nombre:'',
        Dueño:'',
        Imagen:'',
        prestamo: '',
        devolucion:'',
        Autor:'',
        Editorial:'',
        Año:'' */
      })
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
                      id="fechaPrestamo"
                      name="prestamo"
                      type="date"
                      label="Fecha de Préstamo"
                      value={libro.prestamo?libro.prestamo:''}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errores.prestamo?errores.prestamo:false}
                      
                      required
                    />
                    <br/>
                    <TextField
                      id="fechaDevolucion"
                      name="devolucion"
                      label="Fecha de Devolución"
                      type="date"
                      value={libro.devolucion?libro.devolucion:''}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errores.devolucion?errores.devolucion:false}
                      required
                    />
                    <br/>                    
                    <TextField
                      name="Dueño" 
                      id="dueño" 
                      label="Solicitante" 
                      variant="standard"
                      value={libro.Dueño?libro.Dueño:''}
                      onChange={e => controlCambios(e.target.name, e.target.value)}
                      error={errores.Dueño?errores.Dueño:false}
                      required
                    />
                    <br/>
                    
                    </FormControl>
                    </Grid>
                    <Grid item lg={5} className="">
                    <FormControl size="medium" id="formulario" className="formulario-right">
                        <h2>Detalles de Libro</h2>
                        <TextField
                          name="Nombre"
                          disabled={disabledCampos}
                          id="nombre" 
                          type="text"
                          label="Nombre de Libro" 
                          value={libro.Nombre?libro.Nombre:''}
                          variant="standard"
                          onChange={(e)=> controlCambios(e.target.name, e.target.value)}
                          error={errores.Nombre?errores.Nombre:false}
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
                          error={errores.Autor?errores.Autor:false}
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
                          error={errores.Editorial?errores.Editorial:false}
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
                          error={errores.Año?errores.Año:false}
                          required
                        />
                        <br/>
                        <br/>
                        <div className="contained">
                        <input
                            name="Imagen"
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e)=>controlCambios(e.target.name, e.target.value)}
                            disabled={disabledCampos}
                        />
                        <label htmlFor="contained-button-file">
                            <Button disabled={disabledCampos} variant="outlined" color="primary" component="span">
                                Imagen Libro
                            </Button>
                            <span>{libro.Imagen}</span>
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

export default Libro;

