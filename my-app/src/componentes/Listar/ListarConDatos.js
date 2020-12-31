import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Borrar from './Eliminar';
import Modificar from './Modificar';
import Nuevo from './Nuevo';
import  Modal  from './Modal';

const ListarConDatos = ({libros}) => {

        
        const [color,] = useState("#dca4a4") // color que tendra la fila morosa
        const [idEliminar, setidEliminar] = useState("") 
        const [estadoEliminar, setestadoEliminar] = useState(false)//ocultar - mostrar modal
        const [estadomodif, setestadomodif] = useState(false) //ocultar - mostrar modal
        const [estadoNuevo, setestadoNuevo] = useState(false) //ocultar - mostrar modal
        const [libroaModificar, setlibroaModificar] = useState() 
        const f = new Date();
        const fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        console.log(fechaActual)
        
        // Estilos del Table
        const useStyles = makeStyles({
            table: {
              minWidth: 650,
            },
          });
          
          const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }))(TableRow);

        const classes = useStyles();

        // funcionalidad ocultar o mostrar modal Modificar 
        const btnModificar = (libroSelect) =>{
          //  debugger;
            setestadomodif(!estadomodif)
            setlibroaModificar(libroSelect)
            // setTimeout( console.log(libroaModificar),3000);   
        }

        // funcionalidad Cancelar del modal Elminar
        const cancelarEliminar = () => {
           setestadoEliminar(false)
          }

        // funcionalidad al presionar Ok del modal eliminar, accion elimina el libro correspondiente
        const okEliminar = (idEliminado) => {
            setestadoEliminar(false)
            alert("Libro" + idEliminado + "Eliminado con exito")
            var indice = libros.indexOf(idEliminado); // obtenemos el indice del objeto a eliminar
            libros.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
            console.log( libros );
        }
        
        // muestra u oculta modal eliminar y envia el id correspondiente del libro seleccionado
        const LlamaModalEliminar = (id) => {
          setestadoEliminar(!estadoEliminar)
          setidEliminar(id)
        }  

      return (
      <div>
        <TableContainer component={Paper }>
        <Table className={classes.table} size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Mis Libros</StyledTableCell>
              <StyledTableCell align="left">Responsable</StyledTableCell>
              <StyledTableCell align="left">Detalle</StyledTableCell>
              <StyledTableCell align="left">Fecha de Prestamo</StyledTableCell>
              <StyledTableCell align="left">Fecha de Devolucion</StyledTableCell>
              <StyledTableCell align="left">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
            {libros.map((libro) => {
                if (libro.prestamo > "27/12/20" && libro.devolucion === "") {
                  return (
                    <StyledTableRow  style={{background: color}} key={libro.Id}>
                      <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                      <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                      <StyledTableCell align="left">{libro.Pedido}</StyledTableCell>
                      <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                      <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                      <StyledTableCell align="left">
                        <button className="btn-floating btn-small waves-effect waves-light red" 
                             onClick={()=>btnModificar(libro)}><i className="material-icons">brush</i>
                        </button> 
                        <button className="btn-floating btn-small waves-effect waves-light red" 
                            onClick={()=>LlamaModalEliminar(libro.Id)}><i className="material-icons">delete</i>
                        </button></StyledTableCell>
                    </StyledTableRow>);
                }
                return (
                    <StyledTableRow  style={{background:""}} key={libro.Id}>
                    <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                    <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                    <StyledTableCell align="left">{libro.Pedido}</StyledTableCell>
                    <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                    <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                    <StyledTableCell align="left">
                      <button className="btn-floating btn-small waves-effect waves-light red" 
                          onClick={()=>btnModificar(libro)}> <i className="material-icons">brush</i>
                      </button> 
                      
                      <button className="btn-floating btn-small waves-effect waves-light red" 
                          onClick={()=>LlamaModalEliminar(libro.Id)}><i className="material-icons">delete</i>
                      </button></StyledTableCell>
                    </StyledTableRow>
                );
               
              
             
                })}
          </TableBody>
        </Table>
      </TableContainer>
      
      {estadoEliminar? <Modal><Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar} estadoEliminarModal={setestadoEliminar}/></Modal> :  null}
      {estadomodif? <Modificar/> : null}
      <hr></hr>
      <button className="waves-effect waves-light btn" onClick={()=>setestadoNuevo(!estadoNuevo)}>Nuevo</button>
      {estadoNuevo? <Modal><Nuevo estadoNuevoModal={setestadoNuevo}/></Modal> : null}
      </div>
    )
       
}

export default ListarConDatos
