import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Borrar from './Eliminar';
import Modificar from './Modificar';
import Nuevo from './Nuevo';
import  Modal  from './Modal';
import { Button } from '@material-ui/core';
// import './ListarConDatos.css';
import TablaListado from '../Experimentando/TablaListado';
import { UserContext } from '../UserContext/UserContext';
import TablaListadoLibros from '../Experimentando/TablaListadoLibros';
import { NuevoLibro } from '../NuevoLibro/NuevoLibro';

const ListaLibros = () => {

        const {ModLibro, setcontrolVista, eliminarLibro, setListarLibros, libros, eliminarLibroSelected} = useContext(UserContext)

        const [idEliminar, setidEliminar] = useState("") 
        const [LibrosCache, setLibrosCache] = useState(libros)
        const [estadoTablaLibr, setestadoTablaLibr] = useState(true)
        const [visibilidad, setvisibilidad] = useState(true)
        const [estadoEliminar, setestadoEliminar] = useState(false)//ocultar - mostrar modal
        const [estadomodif, setestadomodif] = useState(false) //ocultar - mostrar modal
        const [estadoNuevo, setestadoNuevo] = useState(false) //ocultar - mostrar modal
        const [libroaModificar, setlibroaModificar] = useState();
        

        // Estilos del Table
        const useStyles = makeStyles((theme)=>({
            margin: {
                margin: theme.spacing(1),
                marginLeft: '4rem',
              },
                table: {
                  minWidth: 650,
                },
              marginLibros:{
                marginLeft: '61rem',
              }
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
          const LibroAuxDel = LibrosCache
          const found = LibrosCache.findIndex(element => element.Id_Libro === idEliminado);
          LibroAuxDel.splice(found,1);
          setLibrosCache(LibroAuxDel)
          eliminarLibroSelected(idEliminado)
          
          // eliminarLibro(idEliminado)
        
           
        }

        const ReacargarListarLibros = (Libro) =>{
          console.log(Libro)
          Libro.Id_Libro = LibrosCache[LibrosCache.length - 1].Id_Libro + 1
          console.log(Libro)
          const LibroAux = LibrosCache
          LibroAux.push(Libro)
          console.log(LibroAux)
          setLibrosCache(LibroAux)
          setestadoTablaLibr(!estadoTablaLibr)
          setestadoNuevo(!estadoNuevo)
          setvisibilidad(!visibilidad)
        }
        
        const nuevoLibro = () =>{
          setestadoTablaLibr(false)
          setestadoNuevo(true)
          setvisibilidad(false)
        }

        const CancelarNuevoLibro = () =>{
          setestadoTablaLibr(!estadoTablaLibr)
          setestadoNuevo(!estadoNuevo)
          setvisibilidad(!visibilidad)
        }

        // muestra u oculta modal eliminar y envia el id correspondiente del libro seleccionado
        const LlamaModalEliminar = (id) => {
         
          setestadoEliminar(!estadoEliminar)
          setidEliminar(id)
        }  
     
        return (
          <div>
          {estadoTablaLibr?<h1>Libros</h1> :null}
          {estadoTablaLibr? <TablaListadoLibros btnModificarC={btnModificar} LlamaModalEliminarC={LlamaModalEliminar} Libros={LibrosCache}/> :null}
          {estadoEliminar? <Modal><Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar} estadoEliminarModal={setestadoEliminar}/></Modal> :  null}
          {estadomodif? <Modificar cancelar={cerrarModificar} UpdLibro={setcontrolVista} LibroSeleccionado={libroaModificar} AsignarLib={ModLibro}  /> : null}
          <br></br>
    
          {visibilidad? 
          <Button 
            onClick={()=>setListarLibros(false)} 
            variant="outlined" 
            color="primary"
            className={classes.margin} 
          >Volver</Button>  
          :null}
    
          {visibilidad? 
           <Button 
           variant="outlined" 
           color="primary"
            onClick={()=>nuevoLibro()}
            className={classes.marginLibros} 
          >Nuevo Libro</Button>
          :null}
        
          {estadoNuevo? <Modal><NuevoLibro Reacargar={ReacargarListarLibros}/></Modal> : null}
    
          {estadoNuevo? 
          <Button 
            onClick={()=>CancelarNuevoLibro(false)} 
            variant="outlined" 
            color="primary"
            className={classes.margin} 
          >Volver</Button>  
          :null}
    
          </div>
        )

      
      
                                         
}

export default ListaLibros
