import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Borrar from './Eliminar';
import  Modal  from './Modal';
import { Button } from '@material-ui/core';
import { UserContext } from '../UserContext/UserContext';
import TablaListadoLibros from '../Experimentando/TablaListadoLibros';
import { NuevoLibro } from '../NuevoLibro/NuevoLibro';


const ListaLibros = () => {

        const {setListarLibros, libros, eliminarLibroSelected} = useContext(UserContext)

        const [idEliminar, setidEliminar] = useState("") 
        const [LibrosCache, setLibrosCache] = useState(libros)
        const [estadoTablaLibr, setestadoTablaLibr] = useState(true)
        const [visibilidad, setvisibilidad] = useState(true)
        const [estadoEliminar, setestadoEliminar] = useState(false)//ocultar - mostrar modal
        // const [estadomodif, setestadomodif] = useState(false) //ocultar - mostrar modal
        const [estadoNuevo, setestadoNuevo] = useState(false) //ocultar - mostrar modal
        const [libroSelected, setLibroSelected] = useState({});
        const [deloMod, setdeloMod] = useState(true)
        

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
              },
              estiloTitulo:{
                textAlign: 'center',
                fontStyle: 'oblique',
                fontWeight: 'normal',
    
              }
          }));

         const classes = useStyles();

        // funcionalidad ocultar o mostrar modal Modificar 
        const btnModificar = (libroSelect) =>{
            // setestadomodif(!estadomodif)
            setdeloMod(false)
            setLibroSelected(libroSelect)
            setestadoTablaLibr(false)
            setestadoNuevo(true)
            setvisibilidad(false)
            // setTimeout( console.log(libroaModificar),3000);   
        }

        
        // funcionalidad Cancelar del modal Elminar
        const cancelarEliminar = () => {
           setestadoEliminar(false)
          }
        // const cerrarModificar = () => {
        //   setestadomodif(false)
        // }
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
          if(deloMod){
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
          }else{
            const found = LibrosCache.findIndex(element => element.Id_Libro === Libro.Id_Libro);
            const LibroAuxMod = LibrosCache
            LibroAuxMod[found].Nom_Libro = Libro.Nom_Libro
            LibroAuxMod[found].Autor_Libro = Libro.Autor_Libro
            LibroAuxMod[found].Editorial_Libro = Libro.Editorial_Libro
            LibroAuxMod[found].Año_Libro = Libro.Año_Libro
            LibroAuxMod[found].Imagen_Libro = Libro.Imagen_Libro
            setLibrosCache(LibroAuxMod)
            setestadoTablaLibr(!estadoTablaLibr)
            setestadoNuevo(!estadoNuevo)
            setvisibilidad(!visibilidad)
          }
          
        }
        
        const nuevoLibro = () =>{
          setestadoTablaLibr(false)
          setestadoNuevo(true)
          setvisibilidad(false)
        }

        const CancelarNuevoLibro = () =>{
          setdeloMod(true)
          setestadoTablaLibr(!estadoTablaLibr)
          setestadoNuevo(!estadoNuevo)
          setvisibilidad(!visibilidad)
          setLibroSelected({})
        }

        // muestra u oculta modal eliminar y envia el id correspondiente del libro seleccionado
        const LlamaModalEliminar = (id) => {
         
          setestadoEliminar(!estadoEliminar)
          setidEliminar(id)
        }  
     
        return (
          <div>

          {estadoTablaLibr?<h1 className={classes.estiloTitulo}>Libros</h1> :null}
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
          {estadoTablaLibr? <TablaListadoLibros btnModificarC={btnModificar} LlamaModalEliminarC={LlamaModalEliminar} Libros={LibrosCache}/> :null}
          
          {estadoEliminar? <Modal><Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar} estadoEliminarModal={setestadoEliminar}/></Modal> :  null}
          
          <br></br>
          
          {estadoNuevo? <Modal><NuevoLibro Recargar={ReacargarListarLibros} Dato={libroSelected}/></Modal> : null}

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
