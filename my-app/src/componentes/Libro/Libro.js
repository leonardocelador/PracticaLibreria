import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, TextField, Button, Grid, Container, Snackbar} from '@material-ui/core';
import ButtonAppBar from '../App Bar/ButtonAppBar';
import '../Libro/libro.css';
import Alert from '@material-ui/lab/Alert';

    
export const Libro = ({NuevoLibro , Volver, solicitudAModificar}) => {

    const [libro, setLibro] = useState({
        Id:'',
        Nombre:'',
        Dueño:'',
        Imagen:'',
        prestamo: '',
        devolucion:'',
        Eliminado:false,
        Autor:'',
        Editorial:'',
        Año:''
    })


    const [controlLibro, setControlLibro] = useState(false);
    const [controlDueño, setControlDueño] = useState(false);
    const [controlFechaPrestamo, setcontrolFechaPrestamo] = useState(false);
    const [controlFechaDevolucion, setcontrolFechaDevolucion] = useState(false);
    const [controlAutor, setcontrolAutor] = useState(false);
    const [controlEditorial, setcontrolEditorial] = useState(false);
    const [controlAño, setcontrolAño] = useState(false);
    
    const [disabledLibro, setDisabledLibro] = useState(false);
    const [disabledAutor, setDisabledAutor] = useState(false);
    const [disabledEditorial, setDisabledEditorial] = useState(false);
    const [disabledAño, setDisabledAño] = useState(false);
    const [disabledImagen, setDisabledImagen] = useState(false);
    const [disabledLimpiarCampos, setDisabledLimpiarCampos] = useState(false);
    
    const [controlAlert, setControlAlert] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [severity, setSeverity] = useState('error');
    
    const [controlBoton, setcontrolBoton] = useState(true);
    useEffect(() => {
      if(solicitudAModificar){
        setLibro(solicitudAModificar);
        setDisabledLibro(true);
        setDisabledAutor(true);
        setDisabledEditorial(true);
        setDisabledAño(true);
        setDisabledImagen(true);
        setDisabledLimpiarCampos(true);
      }
    }, [])

        //CAMBIOS LIBRO Y PROPIETARIO
    const controlCambios = (e)=>{
      setLibro({...libro,[e.target.name]:e.target.value}) 
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

    const validacionLibro = () => {
      console.log(libro);
      if(libro.Nombre.trim()==="")//.trim sirve para eliminar los espacios en blanco
        setControlLibro(true);
        else{
          setControlLibro(false);
          setcontrolBoton(false);
        }

    }
    
    const validacionDueño = () =>{
      if(libro.Dueño.trim()==="")
        setControlDueño(true);
      else{
        setControlDueño(false);
        setcontrolBoton(false);
      }
    }

    const validarFechaPrestamo = () =>{
      if(libro.prestamo.trim()==="")
        setcontrolFechaPrestamo(true);
        else{
          setcontrolFechaPrestamo(false);
          setcontrolBoton(false);
        }
    }

    const validarFechaDevolucion = () =>{
      if(libro.devolucion.trim()==="")
      setcontrolFechaDevolucion(true);
      else{
        setcontrolFechaDevolucion(false);
        setcontrolBoton(false);
      }
    }
    const validarAutor = () =>{
      if(libro.Autor.trim()==="")
      setcontrolAutor(true);
      else{
        setcontrolAutor(false);
        setcontrolBoton(false);
      }
    }
    const validarEditorial = () =>{
      if(libro.Editorial.trim()==="")
      setcontrolEditorial(true);
      else{
        setcontrolEditorial(false);
        setcontrolBoton(false);
      }
    }
    const validarAño = () =>{
      if(libro.Año.trim()==="")
      setcontrolAño(true);
      else{
        setcontrolAño(false);
        setcontrolBoton(false);
      }
    }
  
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
                            
                            setTimeout(()=>{NuevoLibro(libro); },1000)
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
        Nombre:'',
        Dueño:'',
        Imagen:'',
        prestamo: '',
        devolucion:'',
        Autor:'',
        Editorial:'',
        Año:''
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
                      value={libro.prestamo}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={controlFechaPrestamo}
                      onBlur={(e)=>validarFechaPrestamo(e)}
                      required
                    />
                    <br/>
                    <TextField
                      id="fechaDevolucion"
                      name="devolucion"
                      label="Fecha de Devolución"
                      type="date"
                      value={libro.devolucion}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={controlFechaDevolucion}
                      onBlur={(e)=>validarFechaDevolucion(e)}
                      required
                    />
                    <br/>                    
                    <TextField
                      name="Dueño" 
                      id="dueño" 
                      label="Solicitante" 
                      variant="standard"
                      value={libro.Dueño}
                      onChange={(e)=> controlCambios(e)}
                      error={controlDueño}
                      onBlur={validacionDueño}
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
                          error={controlLibro}
                          disabled={disabledLibro}
                          id="nombre" 
                          type="text"
                          label="Nombre de Libro" 
                          value={libro.Nombre}
                          variant="standard"
                          onChange={(e)=> controlCambios(e)}
                          onBlur={validacionLibro}
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
                          value={libro.Autor}
                          className={classes.textField}
                          onChange={ e =>controlCambios(e)}
                          error={controlAutor}
                          disabled={disabledAutor}
                          onBlur={validarAutor}
                          required
                        />
                        <br/>
                        <TextField
                          id="Editorial"
                          name="Editorial"
                          type="text"
                          label="Editorial"
                          variant="standard"
                          value={libro.Editorial}
                          className={classes.textField}
                          onChange={ (e) =>controlCambios(e)}
                          error={controlEditorial}
                          disabled={disabledEditorial}
                          onBlur={validarEditorial}
                          required
                        />
                        <br/>
                        <TextField
                          id="Año"
                          name="Año"
                          type="text"
                          label="Año de Edición"
                          value={libro.Año}
                          variant="standard"
                          onChange={ (e) =>controlCambios(e)}
                          error={controlAño}
                          disabled={disabledAño}
                          onBlur={validarAño}
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
                            onChange={(e)=>controlCambios(e)}
                            disabled={disabledImagen}
                        />
                        <label htmlFor="contained-button-file">
                            <Button disabled={disabledImagen} variant="outlined" color="primary" component="span">
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
            disabled={disabledLimpiarCampos}
            color="primary">Limpiar Campos</Button>
            <br/>
         <Button 
            onClick={validarDatos} 
            variant="outlined" 
            color="primary" 
            disabled={controlBoton}
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

