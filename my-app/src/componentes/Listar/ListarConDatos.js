import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Borrar from './Eliminar';
import Modificar from './Modificar';
import Nuevo from './Nuevo';
import  Modal  from './Modal';
import { Button } from '@material-ui/core';
// import './ListarConDatos.css';
import TablaListado from '../Experimentando/TablaListado';


const ListarConDatos = ({libros, btnNuevo, Libr}) => {

        
        const [color,] = useState("#dca4a4") // color que tendra la fila morosa
        const [idEliminar, setidEliminar] = useState("") 
        const [estadoEliminar, setestadoEliminar] = useState(false)//ocultar - mostrar modal
        const [estadomodif, setestadomodif] = useState(false) //ocultar - mostrar modal
        const [estadoNuevo, setestadoNuevo] = useState(false) //ocultar - mostrar modal
        const [libroaModificar, setlibroaModificar] = useState();
        
        

        // Estilos del Table
        const useStyles = makeStyles((theme)=>({
          margin: {
            margin: theme.spacing(1),
          },
            table: {
              minWidth: 650,
            },
          }));

         const classes = useStyles();

        // funcionalidad ocultar o mostrar modal Modificar 
        const btnModificar = (libroSelect) =>{
            setestadomodif(!estadomodif)
            setlibroaModificar(libroSelect)
            // setTimeout( console.log(libroaModificar),3000);   
        }

        
        // funcionalidad Cancelar del modal Elminar
        const cancelarEliminar = () => {
           setestadoEliminar(false)
          }
        const cerrarModificar = () => {
          setestadomodif(false)
        }
        // funcionalidad al presionar Ok del modal eliminar, accion elimina el libro correspondiente
        const okEliminar = (idEliminado) => {
          
            setestadoEliminar(false)
            const indice = libros.findIndex(element => element.Id == idEliminado);
            libros.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
           
        }
        
        // muestra u oculta modal eliminar y envia el id correspondiente del libro seleccionado
        const LlamaModalEliminar = (id) => {
          setestadoEliminar(!estadoEliminar)
          setidEliminar(id)
        }  

      return (
      <div>
      <TablaListado librosC={libros} colorC={color} btnModificarC={btnModificar} LlamaModalEliminarC={LlamaModalEliminar} />
      {estadoEliminar? <Modal><Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar} estadoEliminarModal={setestadoEliminar}/></Modal> :  null}
      {estadomodif? <Modificar cancelar={cerrarModificar} UpdLibro={btnNuevo} LibroSeleccionado={libroaModificar} AsignarLib={Libr} /> : null}
      <br></br>
      <Button 
        onClick={()=>setestadoNuevo(!estadoNuevo)} 
        variant="outlined" 
        color="primary"
        className={classes.margin} 
      >Nueva Solicitud</Button>
      {estadoNuevo? <Modal><Nuevo estadoNuevoModal={setestadoNuevo} agregarNuevo={btnNuevo}/></Modal> : null}
      </div>
    )
       
}

export default ListarConDatos
