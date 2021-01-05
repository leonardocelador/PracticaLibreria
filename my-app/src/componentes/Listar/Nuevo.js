import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';


const Nuevo = ({estadoNuevoModal, agregarNuevo}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    // Cierra modal eliminar
    const handleClose = () => {
    setOpen(false);
    estadoNuevoModal(false)
    }

  const OK = () => {
    // okEliminado(id)
    agregarNuevo(2)
    }
    
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <h4>Desea Ingresar un Nuevo Libro</h4>
            <section >
                <div style={{marginLeft:"12rem"}}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  className={classes.margin}
                  onClick={()=>handleClose()}
                >
                  Cancelar
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  className={classes.margin}
                  onClick={()=>OK()}
                >
                  Agregar
                </Button>
            </div>
            </section>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Nuevo


// Estilos correspondiente al modal
const useStyles = makeStyles((theme) => ({
   margin: {
      margin: theme.spacing(1),
   },
   extendedIcon: {
     marginRight: theme.spacing(1),
   },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

