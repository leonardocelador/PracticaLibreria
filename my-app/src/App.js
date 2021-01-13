import React, { useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { Libro } from './componentes/Libro/Libro';
import {Libros} from '../src/data/Libros.json'

const App = () => {
    const [libres, ] = useState(Libros)
    const [controlVista, setcontrolVista] = useState(1);
    const [LibroSelected, setLibroSelected] = useState({})
    
    const AgregarNuevoLibro = (nuevoLibro) => {
        const cant = libres.length+1;
        nuevoLibro.Id=cant;
        libres.push(nuevoLibro);
        setcontrolVista(1)
    }

    const ModificarLibro = (LibroModif) => {
        const id = LibroModif.Id
        const found = libres.findIndex(element => element.Id === id);
        libres[found].Nombre = LibroModif.Nombre
        libres[found].Dueño = LibroModif.Dueño
        libres[found].prestamo = LibroModif.prestamo
        libres[found].devolucion = LibroModif.devolucion
        setcontrolVista(1)
    }


    const ModLibro = (LibroUpdate) => {
        setLibroSelected(LibroUpdate)
    }
    const controlVistaLibro = (cerrar) =>{
        setcontrolVista(cerrar)
    }
    if(controlVista===1)
    {
        return (
            <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro}/>
        )
    }else{
        if(controlVista===2)
        {
            return (
                <Libro NuevoLibro={AgregarNuevoLibro} Volver={controlVistaLibro}/>
            )
        }else{
            return (
                <Libro NuevoLibro={ModificarLibro} Volver={controlVistaLibro} solicitudAModificar={LibroSelected}/>
            )
        }
    }
    // return (
    //     <>
    //          {(() => {
  
    //             switch (controlVista) {
    //                 case 1:
    //                     return (
    //                         <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro}/>
    //                     )
    //                 case 2:
    //                     return (
    //                         <Libro NuevoLibro={AgregarNuevoLibro} Volver={controlVistaLibro}/>
    //                     )
    //                 case 3:
    //                     return (
    //                         <Libro NuevoLibro={ModificarLibro} Volver={controlVistaLibro} solicitudAModificar={LibroSelected}/>
    //                     )
    //                 default:
    //                     return (
    //                         <h1>hola</h1>
    //                     )
    //             }
    //         })()}
    //     </>
    // )
}
export default App;
