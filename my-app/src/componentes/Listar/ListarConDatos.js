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
import { Button, Container, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

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
            // alert("Libro" + idEliminado + "Eliminado con exito")
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
      <Container> {/* AGREGUE CONTAINER PARA CENTRAR LA TABLA */}
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
                if (Date.parse(libro.devolucion) < Date.now()) {
                  return (
                    <StyledTableRow  style={{background: color}} key={libro.Id}>
                      <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                      <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                      <StyledTableCell align="left">
                        
                      </StyledTableCell> 
                      <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                      <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                      <StyledTableCell align="left">

                      <Grid container justify='space-around'>  {/* Utilice Componente Grid para poder alinear verticalmente y centrar elementos */}
                        <Grid item>
                          <Typography>Modificar</Typography>
                          <IconButton aria-label="modify" className={classes.margin} onClick={()=>btnModificar(libro)}>
                            <CreateIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Typography>Eliminar</Typography>
                          <IconButton  aria-label="delete" className={classes.margin} onClick={()=>LlamaModalEliminar(libro.Id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>

                        </Grid>
                      </Grid>
                        
                        </StyledTableCell>
                    </StyledTableRow>);
                }
                return (
                    <StyledTableRow  style={{background:""}} key={libro.Id}>
                    <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                    <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                    <StyledTableCell align="left">
                      
                    </StyledTableCell>
                    <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                    <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Grid container justify='space-around'>  
                        <Grid item>
                          <Typography>Modificar</Typography>
                          <IconButton aria-label="modify" className={classes.margin} onClick={()=>btnModificar(libro)}>
                            <CreateIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                        <Typography>Eliminar</Typography>
                        <IconButton  aria-label="delete" className={classes.margin} onClick={()=>LlamaModalEliminar(libro.Id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                    </StyledTableRow>
                );
               
              
             
                })}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      
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
