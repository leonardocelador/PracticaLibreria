import React, { useEffect, useState } from 'react'
import Listar from './componentes/Listar/Listar';
import { NuevaSolicitud } from './componentes/Libro/NuevaSolicitud';
import { useFetch } from './componentes/Fetch/UseFetch';

const url = "https://agile-ocean-56695.herokuapp.com/LibrosTest/";
async function postData(url, Id={}) {
    debugger;
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(Id) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
const App = () => {

    const { data, loading, error } = useFetch(url);
    console.log(data)
    const libres = data
    // console.log(libres)
    // const [libres, setlibres] = useState({});
    // setlibres(data)

    const [controlVista, setcontrolVista] = useState(true);
    const [LibroSelected, setLibroSelected] = useState({})
    
    // const [libres, setlibres] = useState({})
    

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
    const RecargarEliminarLibros = () =>{
        setcontrolVista(true)
    }
    const ModLibro = (LibroUpdate) => {
        setLibroSelected(LibroUpdate)
    }
    const controlVistaLibro = (cerrar) =>{
        setcontrolVista(cerrar)
        setLibroSelected({})
    }
    const eliminarLibro = (idEliminado) => {
        const url = "https://agile-ocean-56695.herokuapp.com/LibrosTest/";
           console.log(idEliminado)
           postData(url, {'id':idEliminado})
           .then(response=>  console.log(response))
           .catch(error => console.log(error))
           setcontrolVista(true)
    }
    if(controlVista)
    {
        return (
            <Listar Libros={libres} controlBtnNuevo={setcontrolVista} libr={ModLibro} elimina={eliminarLibro} />
        )
    }else{
        return(            
            <NuevaSolicitud solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {LibroSelected} Libros={data}/>
        )
        
    }
    
}
export default App;