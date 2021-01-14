import React, { useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'
import { useFetch } from './componentes/Fetch/UseFetch';

const url = "https://agile-ocean-56695.herokuapp.com/LibrosTest/";

const App = () => {

    const { data, loading, error } = useFetch(url);
    console.log(data)
    const libres = data
    console.log(libres)
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
            
            // <Libro solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {LibroSelected}/>
            <Libro solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {data}/>
        )
        
    }
    
}
export default App;