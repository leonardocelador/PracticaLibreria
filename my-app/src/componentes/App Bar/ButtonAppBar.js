import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export default function ButtonAppBar({volver}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooksIcon/>
          <Typography variant="h6" className={classes.title}>
              Help Book
          </Typography>
          <Button onClick={()=>{volver(true)}} className={classes.colorTextoBtn} size="small" variant="contained"color="secondary">Ver Listado</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    colorTextoBtn:{
        color:"#8e24aa"
    }
  }),
);