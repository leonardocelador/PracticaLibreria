import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const Nuevo = ({estadoNuevoModal}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    // Cierra modal eliminar
    const handleClose = () => {
    setOpen(false);
    estadoNuevoModal(false)
    }

  const eliminarLibro = () => {
    // okEliminado(id)
    }

    const cancelarEliminacion =()=>{
    // cancelar()
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
                <button className="waves-effect waves-light btn-small" onClick={()=>cancelarEliminacion()}><i class="material-icons left">clear</i>Cancelar</button>
                <button className="waves-effect waves-light btn-small" onClick={()=>eliminarLibro()}><i class="material-icons left">check</i>OK</button>
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