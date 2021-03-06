import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import PopOver from '../PopOver/PopOver'


const array = [];
const seleccionar = (event, Id) => {
  const valor = document.getElementById(Id);

  if(array.length !== 0){
    const found = array.findIndex(element => element === Id);
    if(found !== -1){
      valor.removeAttribute('style');
      array.splice(found,1);
    }else{
      array.push(Id);
      valor.setAttribute('style', 'background-color:#e2d1ea;')
    }
  }else{
    array.push(Id);
    valor.setAttribute('style', 'background-color:#e2d1ea;')
  }
 
}

const TablaListadoLibros = ({btnModificarC, LlamaModalEliminarC, Libros }) => {
  
    const useStyles = makeStyles((theme)=>({  
        margin: {
          border: "#eccfcf  5px solid"
        },
        marginbtn:{
          margin: theme.spacing(2),
        },
          table: {
            minWidth: 650,
          },
          estilosMorosos: {
            marginLeft:"-2rem", marginTop:"-1rem", position:"absolute"
          },
          colorBorder:{
            borderColor: "chocolate", borderWidth: "medium",
          }
        }));
        
        const StyledTableCell = withStyles((theme) => ({
          head: {
             backgroundColor: "#bdacbb",
            color: theme.palette.common.black,
          },
          body: {
            fontSize: 14,
          },
        }))(TableCell);
        
     

      const classes = useStyles();

      
    return (
        <div>
            <Container> {/* AGREGUE CONTAINER PARA CENTRAR LA TABLA */}
            <TableContainer component={Paper }>
                <Table className={classes.table} size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="left"></StyledTableCell>  
                    <StyledTableCell align="left">Mis Libros</StyledTableCell>
                    <StyledTableCell align="left">Nombre</StyledTableCell>
                    <StyledTableCell align="left">Detalles</StyledTableCell>
                    <StyledTableCell align="left">Autor</StyledTableCell>
                    <StyledTableCell align="left">Editorial</StyledTableCell>
                    <StyledTableCell align="left">Año Libro</StyledTableCell>
                    <StyledTableCell align="left">Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Libros.map((libro) => {
                        if (Date.parse(libro.devolucion) < Date.now()) {
                        return (
                            <TableRow className={classes.margin} id={libro.Id_Libro} onClick={(event) => seleccionar(event, libro.Id_Libro)}  key={libro.Id_Libro}>
                              <StyledTableCell align="left">
                                <i>
                                <NotificationImportantIcon aria-label="modify" className={classes.estilosMorosos}>
                                    <CreateIcon  fontSize="large" />
                                </NotificationImportantIcon>
                                </i>
                              </StyledTableCell>
                            <StyledTableCell align="left">{libro.Id_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Nom_Libro}</StyledTableCell>
                            <StyledTableCell align="left">
                            
                              <PopOver Detalles={libro}/>
                              
                            </StyledTableCell> 
                            <StyledTableCell align="left">{libro.Autor_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Editorial_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Año_Libro}</StyledTableCell>
                            <StyledTableCell align="left">

                            <Grid container justify='space-around'>  {/* Utilice Componente Grid para poder alinear verticalmente y centrar elementos */}
                                <Grid item>
                                <Typography>Modificar</Typography>
                                <IconButton aria-label="modify" className={classes.marginbtn} onClick={()=>btnModificarC(libro)}>
                                    <CreateIcon  fontSize="small" />
                                </IconButton>
                                </Grid>
                                <Grid item>
                                <Typography>Eliminar</Typography>
                                <IconButton  aria-label="delete" className={classes.marginbtn} onClick={()=>LlamaModalEliminarC(libro.Id_Libro)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                            </Grid>
                                
                                </StyledTableCell>
                            </TableRow>);
                        }
                        return (
                            <TableRow  id={libro.Id_Libro} onClick={(event) => seleccionar(event, libro.Id_Libro)}  key={libro.Id_Libro}>
                            <StyledTableCell  align="left"><i></i></StyledTableCell>
                            <StyledTableCell align="left">{libro.Id_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Nom_Libro}</StyledTableCell>
                            <StyledTableCell align="left">
                            
                              <PopOver Detalles={libro}/>
                              
                            </StyledTableCell> 
                            <StyledTableCell align="left">{libro.Autor_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Editorial_Libro}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Año_Libro}</StyledTableCell>
                            <StyledTableCell  align="left">
                            <Grid container justify='space-around'>  
                                <Grid item>
                                <Typography>Modificar</Typography>
                                <IconButton aria-label="modify" className={classes.marginbtn} onClick={()=>btnModificarC(libro)}>
                                    <CreateIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                                <Grid item>
                                <Typography>Eliminar</Typography>
                                <IconButton  aria-label="delete" className={classes.marginbtn} onClick={()=>LlamaModalEliminarC(libro.Id_Libro)}>
                                <DeleteIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                            </Grid>
                            </StyledTableCell>
                            </TableRow>
                        );
                    
                        })}
                </TableBody>
                </Table>
            </TableContainer>
            </Container>
        </div>
    )
}
export default TablaListadoLibros