import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, TextField, Button} from '@material-ui/core';
import '../Libro/libro.css';
    
export const Libro = ({NuevoLibro}) => {

    const [libro, setLibro] = useState({
        Id:'',
        Nombre:'',
        Dueño:'',
        Imagen:'',
        prestamo: '',
        devolucion:'',
        Eliminado:false,
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
      if(libro.Nombre==="")
        setControlLibro(true);
        else{
          setControlDueño(false);
          setcontrolBoton(false);
        }

    }
    
    const validacionDueño = () =>{
      if(libro.Dueño==="")
        setControlDueño(true);
      else{
        setControlDueño(false);
        setcontrolBoton(false);
      }
    }

    const validarFechaPrestamo = (e) =>{
      if(libro.prestamo==="")
        setcontrolFechaPrestamo(true);
        else{
          setControlDueño(false);
          setcontrolBoton(false);
        }
    }

    const validarFechaDevolucion = (e) =>{
      if(libro.devolucion==="")
      setcontrolFechaDevolucion(true);
      else{
        setControlDueño(false);
        setcontrolBoton(false);
      }
    }

    const validarDatos = ()=>{
      const {Nombre, Dueño, Imagen, devolucion, prestamo}=libro;
      
      if(Nombre){
        if(prestamo){
          if(devolucion){
            if(Date.parse(prestamo)>=Date.parse(devolucion))
              alert("Fechas Inválidas! Verificar!!");
            if(Dueño){
              if(Imagen){
                alert("DATOS CORRECTOS!!! OBJETO CARGADO CORRECTAMENTE!!!");
                NuevoLibro(libro);
              }
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
        Nombre:'',
        Dueño:'',
        Imagen:'',
        prestamo: '',
        devolucion:'',
      })
    }

    return (
        <div className="body">
                <FormControl id="formulario" className="formulario">
                    <br/>
                    <TextField
                      name="Nombre"
                      error={controlLibro}
                      id="nombre" 
                      type="text"
                      label="Libro" 
                      value={libro.Nombre}
                      variant="standard"
                      onChange={(e)=> controlCambios(e)}
                      onBlur={validacionLibro}
                      helperText={''}
                      required
                     />
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

                    
                    <TextField
                      name="Dueño" 
                      id="dueño" 
                      label="Propietario" 
                      variant="standard"
                      value={libro.Dueño}
                      onChange={(e)=> controlCambios(e)}
                      error={controlDueño}
                      onBlur={validacionDueño}
                      required
                    />

                    <br/>
                    <div className="contained">
                        <input
                            name="Imagen"
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
                            <span>{libro.Imagen}</span>
                        </label>
                    </div>
                    <br/>
                    </FormControl>
                  <div className="contenedor-botones">

                    <Button onClick={e=>resetear(e)} variant="outlined" color="primary">Limpiar Campos</Button>
                    
                    <br/>
                    <Button 
                      onClick={validarDatos} 
                      variant="outlined" 
                      color="primary" 
                      disabled={controlBoton}
                    >Agregar Libro</Button>

                  </div>


        </div>
    )
}
export default Libro;

