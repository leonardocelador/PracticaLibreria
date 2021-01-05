import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';


 const Eliminar =({id, cancelar, okEliminado, estadoEliminarModal})=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // Cierra modal eliminar
  const handleClose = () => {
    setOpen(false);
    estadoEliminarModal(false)
  };

  // Elimina libro usando funcion del padre 
  const eliminarLibro = () => {
    okEliminado(id)
    
}

const cancelarEliminacion =()=>{
    cancelar()
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
          <h4>Esta Seguro  que desea eliminar el libro {id}</h4>
            <section >
                <div style={{marginLeft:"12rem"}}>
                <Button variant="outlined" color="primary"  onClick={()=>cancelarEliminacion()}>Cancelar</Button>
                <Button variant="outlined" color="primary" style={{marginLeft:"1rem"}}  onClick={()=>eliminarLibro()}>Ok</Button>
            </div>
            </section>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default Eliminar

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
