import React, { useEffect, useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'

const App = () => {
    const [libres, setLibres] = useState(Libros)
    const [controlVista, setcontrolVista] = useState(true)
    // const [nuevoLibro, setnuevoLibro] = useState({})
    
    const AgregarNuevoLibro = (nuevoLibro) => {
        console.log(nuevoLibro)
        setcontrolVista(true)
        const cant = libres.length+1;
        nuevoLibro.Id=cant;
        libres.push(nuevoLibro);
        console.log(libres)
    }
    // useEffect(() => {
    //     setcontrolVista(true)
    //     const cant = libres.length+1;
    //     nuevoLibro.Id=cant;
    //     libres.push({nuevoLibro});
        

    // }, [nuevoLibro])

    return (
        <>
            <h1>Mis Libros</h1>
            {controlVista?<Listar Libros={libres} controlBtnNuevo={setcontrolVista}/>:<Libro NuevoLibro={AgregarNuevoLibro}/>}
        </>
    )
}
export default App;
