import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import imagendeprueba from "../../data/HarryPotter.jpg"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      height: 200,
      width:150
    },
  }),
);

export default function AppCard({detalles}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Detalles de Libro
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">Nombre del Libro:{detalles.Nom_Libro}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Autor:{detalles.Autor_Libro}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Editorial:{detalles.Editorial_Libro}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Año:{detalles.Año_Libro}</Typography>
        </CardContent>
      </div>
      <CardMedia
        component="img"
        className={classes.cover}
        image={detalles.Imagen_Libro}
        title="Título de Libro"
      />
    </Card>
  );
}
