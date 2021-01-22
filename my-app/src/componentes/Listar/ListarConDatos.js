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

const ListarConDatos = () => {

        const {ModLibro, setcontrolVista, eliminarLibro, setListarLibros } = useContext(UserContext)

        const [idEliminar, setidEliminar] = useState("") 
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
          eliminarLibro(idEliminado)
        
           
        }
        
        // muestra u oculta modal eliminar y envia el id correspondiente del libro seleccionado
        const LlamaModalEliminar = (id) => {
         
          setestadoEliminar(!estadoEliminar)
          setidEliminar(id)
        }  

      return (
      <>
        <h1>Solicitudes</h1>
        
        <div>
          <Button 
            onClick={()=>setestadoNuevo(!estadoNuevo)} 
            variant="outlined" 
            color="primary"
            className={classes.margin} 
          >Nueva Solicitud</Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={()=>setListarLibros(true)}
            className={classes.marginLibros} 
          >Libros</Button>
          {estadoNuevo? <Modal><Nuevo estadoNuevoModal={setestadoNuevo} agregarNuevo={setcontrolVista}/></Modal> : null}
      </div>
          <TablaListado btnModificarC={btnModificar} LlamaModalEliminarC={LlamaModalEliminar} />
          {estadoEliminar? <Modal><Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar} estadoEliminarModal={setestadoEliminar}/></Modal> :  null}
          {estadomodif? <Modificar cancelar={cerrarModificar} UpdLibro={setcontrolVista} LibroSeleccionado={libroaModificar} AsignarLib={ModLibro}  /> : null}
      <br></br>
      </>
    )
       
}

export default ListarConDatos
