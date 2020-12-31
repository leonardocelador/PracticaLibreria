import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, FormControl, TextField, Button} from '@material-ui/core';
    
<<<<<<< HEAD
export const Libro = ({NuevoLibro}) => {
=======
const Libro = () => {
>>>>>>> 201bd40db839a4aa5a031526ccb2fb2c7605d588

    const [libro, setLibro] = useState({
        Id:'',
        nombre:'',
        dueño:'',
        imagen:'',
        fechaPrestamo: '',
        fechaDevolucion:'',
        eliminado:false,
        Pedido:''
    })


    const [controlLibro, setControlLibro] = useState(false);
    const [controlDueño, setControlDueño] = useState(false);
    const [controlFechaPrestamo, setcontrolFechaPrestamo] = useState(false);
    const [controlFechaDevolucion, setcontrolFechaDevolucion] = useState(false);
    const [controlBoton, setcontrolBoton] = useState(true)



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
      if(libro.nombre==="")
        setControlLibro(true);
        else{
          setControlDueño(false);
          setcontrolBoton(false);
        }

    }
    
    const validacionDueño = () =>{
      if(libro.dueño==="")
        setControlDueño(true);
      else{
        setControlDueño(false);
        setcontrolBoton(false);
      }
    }

    const validarFechaPrestamo = (e) =>{
      if(libro.fechaPrestamo==="")
        setcontrolFechaPrestamo(true);
        else{
          setControlDueño(false);
          setcontrolBoton(false);
        }
    }

    const validarFechaDevolucion = (e) =>{
      if(libro.fechaDevolucion==="")
      setcontrolFechaDevolucion(true);
      else{
        setControlDueño(false);
        setcontrolBoton(false);
      }
    }

    const validarDatos = ()=>{
      const {nombre, dueño, imagen, fechaDevolucion, fechaPrestamo}=libro;
      
      if(nombre){
        if(fechaPrestamo){
          if(fechaDevolucion){
            if(Date.parse(fechaPrestamo)>=Date.parse(fechaDevolucion))
              alert("Fechas Inválidas! Verificar!!");
            if(dueño){
              if(imagen){
                NuevoLibro(libro);
                alert("DATOS CORRECTOS!!! OBJETO CARGADO CORRECTAMENTE!!!");}
                else
                  alert("Debe cargar Imagen");
            }
            else
             alert("Debe cargar Propietario");
          }
          else
            alert("Debe cargar Fecha de Devolución");
        }
        else
          alert("Debe cargar Fecha de Préstamo");
      }
      else
        alert("Debe cargar Nombre de Libro");
    
      console.log(libro);
    }
    const resetear = () => {
      setLibro({
        nombre:'',
        dueño:'',
        imagen:'',
        fechaPrestamo: '',
        fechaDevolucion:'',
      })
    }

    return (
        <>
            <Container>
                <FormControl id="formulario">
                    <br/>
                    <TextField
                      name="nombre"
                      error={controlLibro}
                      id="nombre" 
                      type="text"
                      label="Libro" 
                      value={libro.nombre}
                      variant="standard"
                      onChange={(e)=> controlCambios(e)}
                      onBlur={validacionLibro}
                      helperText={''}
                      required
                     />
                    <br/>

                    <TextField
                      id="fechaPrestamo"
                      name="fechaPrestamo"
                      type="date"
                      label="Fecha de Préstamo"
                      value={libro.fechaPrestamo}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={controlFechaPrestamo}
                      onBlur={(e)=>validarFechaPrestamo(e)}
                      required
                    />
                    <TextField
                      id="fechaDevolucion"
                      name="fechaDevolucion"
                      label="Fecha de Devolución"
                      type="date"
                      value={libro.fechaDevolucion}
                      className={classes.textField}
                      onChange={ e =>controlCambios(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={controlFechaDevolucion}
                      onBlur={(e)=>validarFechaDevolucion(e)}
                      required
                    />

                    
                    <TextField
                      name="dueño" 
                      id="dueño" 
                      label="Propietario" 
                      variant="standard"
                      value={libro.dueño}
                      onChange={(e)=> controlCambios(e)}
                      error={controlDueño}
                      onBlur={validacionDueño}
                      required
                    />

                    <br/>
                    <div className="contained">
                        <input
                            name="imagen"
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={e=>controlCambios(e)}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="outlined" color="primary" component="span">
                                Examinar
                            </Button>
                            <span>{libro.imagen}</span>
                        </label>
                    </div>
                    <br/>
                    <Button onClick={e=>resetear(e)} variant="outlined" color="primary">Limpiar Campos</Button>
                    
                    <br/>
                    <Button 
                      onClick={validarDatos} 
                      variant="outlined" 
                      color="primary" 
                      disabled={controlBoton}
                    >Agregar Libro</Button>


                </FormControl>
            </Container>
        </>
    )
}
export default Libro;

