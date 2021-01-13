import React, { useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'

const App = () => {
    const [libres, ] = useState(Libros)
    const [controlVista, setcontrolVista] = useState(true);
    const [LibroSelected, setLibroSelected] = useState({})
    
    const SolicitudLibro = (nuevoLibro) => {

        if(nuevoLibro.Id){
            const id = nuevoLibro.Id
            const found = libres.findIndex(element => element.Id === id);
            libres[found].Nombre = nuevoLibro.Nombre
            libres[found].Dueño = nuevoLibro.Dueño
            libres[found].prestamo = nuevoLibro.prestamo
            libres[found].devolucion = nuevoLibro.devolucion
            setcontrolVista(!controlVista)   
            setLibroSelected({})
        }else{
            const cant = libres.length+1;
            nuevoLibro.Id=cant;
            libres.push(nuevoLibro);
            setcontrolVista(!controlVista)
        }
        
    }

   

    const ModLibro = (LibroUpdate) => {
        setLibroSelected(LibroUpdate)
    }
    const controlVistaLibro = (cerrar) =>{
        setcontrolVista(cerrar)
        setLibroSelected({})
    }
    if(controlVista)
    {
        return (
            <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro} />
        )
    }else{
        return(
            
            <Libro solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {LibroSelected}/>
        )
        
    }
    
}
export default App;

/* {controlVistaLibro?
    <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro}/>
:
    <Libro NuevoLibro={ModificarLibro} Volver={controlVistaLibro} Dato={LibroSelected}/>}

} */