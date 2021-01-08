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
import PopOver from '../PopOver/PopOver'

const TablaListado = ({librosC, colorc, btnModificarC, LlamaModalEliminarC }) => {
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

      const handleClick = (Id) => {
        // alert("click"+Id);
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
                    {librosC.map((libro) => {
                        if (Date.parse(libro.devolucion) < Date.now()) {
                        return (
                            <StyledTableRow onClick={()=>handleClick(libro.Id)} style={{background: colorc}} key={libro.Id}>
                            <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                            <StyledTableCell align="left">
                              {console.log(libro)}
                              <PopOver Detalles={libro}/>
                              
                            </StyledTableCell> 
                            <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                            <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                            <StyledTableCell align="left">

                            <Grid container justify='space-around'>  {/* Utilice Componente Grid para poder alinear verticalmente y centrar elementos */}
                                <Grid item>
                                <Typography>Modificar</Typography>
                                <IconButton aria-label="modify" className={classes.margin} onClick={()=>btnModificarC(libro)}>
                                    <CreateIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                                <Grid item>
                                <Typography>Eliminar</Typography>
                                <IconButton  aria-label="delete" className={classes.margin} onClick={()=>LlamaModalEliminarC(libro.Id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                            </Grid>
                                
                                </StyledTableCell>
                            </StyledTableRow>);
                        }
                        return (
                            <StyledTableRow onClick={()=>handleClick(libro.Id)} style={{background:""}} key={libro.Id}>
                            <StyledTableCell align="left">{libro.Nombre}</StyledTableCell>
                            <StyledTableCell align="left">{libro.Dueño}</StyledTableCell>
                            <StyledTableCell align="left">
                            <PopOver Detalles={libro}/>
                            </StyledTableCell>
                            <StyledTableCell align="left">{libro.prestamo}</StyledTableCell>
                            <StyledTableCell align="left">{libro.devolucion}</StyledTableCell>
                            <StyledTableCell align="left">
                            <Grid container justify='space-around'>  
                                <Grid item>
                                <Typography>Modificar</Typography>
                                <IconButton aria-label="modify" className={classes.margin} onClick={()=>btnModificarC(libro)}>
                                    <CreateIcon fontSize="small" />
                                </IconButton>
                                </Grid>
                                <Grid item>
                                <Typography>Eliminar</Typography>
                                <IconButton  aria-label="delete" className={classes.margin} onClick={()=>LlamaModalEliminarC(libro.Id)}>
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
        </div>
    )
}
export default TablaListado