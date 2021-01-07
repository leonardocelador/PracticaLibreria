import React, { useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'

const App = () => {
    const [libres,] = useState(Libros)
    const [controlVista, setcontrolVista] = useState(1);
    const [LibroSelected, setLibroSelected] = useState({})
    
    const AgregarNuevoLibro = (nuevoLibro) => {
        console.log(nuevoLibro)
        setcontrolVista(1)
        const cant = libres.length+1;
        nuevoLibro.Id=cant;
        libres.push(nuevoLibro);
        console.log(libres)
    }
    const ModLibro = (LibroUpdate) => {
        console.log("hola soy ModificarLibro")
        setLibroSelected(LibroUpdate)
    }
    const controlVistaLibro = (cerrar) =>{
        setcontrolVista(cerrar)
    }
    return (
        <>
             {(() => {
  
                switch (controlVista) {
                    case 1:
                        return (
                            <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro}/>
                        )
                    case 2:
                        return (
                            <Libro NuevoLibro={AgregarNuevoLibro} Volver={controlVistaLibro}/>
                        )
                    case 3:
                        return (
                            <Libro NuevoLibro={AgregarNuevoLibro} Volver={controlVistaLibro} solicitudAModificar={LibroSelected}/>
                        )
                    default:
                        return (
                            <h1>hola</h1>
                        )
                }
            })()}
        </>
    )
}
export default App;
