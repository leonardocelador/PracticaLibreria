import React, { useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'


const App = () => {
    const [libres,] = useState(Libros)
    const [controlVista, setcontrolVista] = useState(true);
    
    const AgregarNuevoLibro = (nuevoLibro) => {
        console.log(nuevoLibro)
        setcontrolVista(true)
        const cant = libres.length+1;
        nuevoLibro.Id=cant;
        libres.push(nuevoLibro);
        console.log(libres)
    }
   
    return (
        <>
            {controlVista?<Listar Libros={libres} controlBtnNuevo={setcontrolVista}/>:<Libro NuevoLibro={AgregarNuevoLibro}/>}
        </>
    )
}
export default App;
