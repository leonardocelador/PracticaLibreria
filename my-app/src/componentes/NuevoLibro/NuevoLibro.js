import React, { useState } from 'react'
import { Button, Container, FormControl, IconButton, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import cargarErrores from '../Libro/Validar/cargarErrores';
import Validar from '../Libro/Validar/Validar';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import '../NuevoLibro/Style_NuevoLibro.css'

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

  

export const NuevoLibro = () => {
    
    //const petición

    const classes = useStyles();
    const [libro, setLibro] = useState({});
    const [errores, setErrores] = useState({
        Nom_Libro:false,
        Autor_Libro:false,
        Editorial_Libro:false,
        Año_Libro:false,
        Imagen_Libro:false,
      });

    const [controlAlert, setControlAlert] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [severity, setSeverity] = useState('error');

    const controlCambios = (name, value)=>{
        setLibro({ ...libro,[name]:value });
        if(value!==''){
        setErrores({...errores,[name]:false});
      }
      else{
        setErrores({...errores,[name]:true});
      }
    }

    const validarDatos = () =>{
   
        var resultMap='';
        const resultado = cargarErrores(libro, Object.keys(errores));
        setErrores(resultado);
        
        Object.keys(resultado).map( error=>{
            if(resultado[error]===true){
                Validar(setControlAlert, setMensajeAlert);
                resultMap=false;
            }
            else{
                resultMap=true;
            }
         
          return resultMap;
        });

        if(resultMap===true){
            console.log(libro);
            setSeverity("success");
            setControlAlert(true);
            setMensajeAlert("Datos Correctos!");
        }
    }

    return (
        <>
            <Container maxWidth="sm" className="container">

                <FormControl fullWidth className="formulario">
                    
                    <h3 className="titulos">Nuevo Libro</h3>
                    
                    <TextField
                      id="Nom_Libro"
                      name="Nom_Libro"
                      type="text"
                      label="Nombre del Libro"
                      fullWidth
                      value={libro.Nom_Libro?libro.Nom_Libro:''}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      error={errores.Nom_Libro}
                      required
                    />

                    <TextField
                      id="Autor"
                      name="Autor_Libro"
                      type="text"
                      label="Autor del Libro"
                      fullWidth
                      value={libro.Autor_Libro?libro.Autor_Libro:''}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      error={errores.Autor_Libro}
                      required
                    />
                    
                    <TextField
                      id="Editorial_Libro"
                      name="Editorial_Libro"
                      type="text"
                      label="Editorial"
                      fullWidth
                      value={libro.Editorial_Libro?libro.Editorial_Libro:''}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      error={errores.Editorial_Libro}
                      required
                    />

                    <TextField
                      id="Año"
                      name="Año_Libro"
                      type="text"
                      label="Año de Edición"
                      fullWidth
                      value={libro.Año_Libro?libro.Año_Libro:''}
                      onChange={ e =>controlCambios(e.target.name, e.target.value)}
                      error={errores.Año_Libro}
                      required
                    />

                    <input 
                        name="Imagen_Libro"
                        accept="image/*" 
                        className={classes.input} 
                        id="icon-button-file" 
                        type="file" 
                        value={libro.Imagen_Libro?libro.Imagen_Libro:''}
                        onChange={ (e) =>controlCambios(e.target.name, e.target.value)}
                        />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                        <span>{libro.Imagen_Libro?libro.Imagen_Libro:'No se cargó Imagen'}</span>
                    </label>

                    <Container>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            onClick={validarDatos}
                        >
                            Agregar
                        </Button>
                    </Container>

                    <Snackbar 
                        open={controlAlert} 
                        autoHideDuration={2000} 
                        onClose={()=>setControlAlert(false)}
                        anchorOrigin={{ vertical:'top', horizontal:'center' }}
                    >
                        <Alert onClose={()=>setControlAlert(false)} severity={severity} variant="filled">
                            {mensajeAlert}
                        </Alert>
                    </Snackbar>

                </FormControl>

            </Container>
        </>
    )
}
