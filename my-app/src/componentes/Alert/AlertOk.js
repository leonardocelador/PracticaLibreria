import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: '-58rem',
      paddingLeft: '38rem',
      background: 'none',
    },
  }));


const AlertOk = () => {
    const classes = useStyles();
    return (
        <div className="animate__animated animate__backInRight">
            <div className={classes.root}>
                <Alert >
                    <AlertTitle>Correcto</AlertTitle>
                    Su libro fue agregado con <strong>Exito!</strong>
                </Alert>
            </div>
        </div>
    )
}
export default AlertOk
