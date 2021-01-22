import React, { useEffect, useState } from 'react'
import Listar from './componentes/Listar/Listar';
// import {Libros} from '../src/data/Libros.json'
import { NuevaSolicitud } from './componentes/Libro/NuevaSolicitud';
import { UserContext } from './componentes/UserContext/UserContext';

const urlSol = "https://agile-ocean-56695.herokuapp.com/SolicitudesTest/";
const urlLib = "https://agile-ocean-56695.herokuapp.com/LibrosTest/";
async function postData(url, Id={}) {
    
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(Id) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  async function postDataDelLibro(url, Id={}) {
    
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(Id) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

async function getData(url) {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers:{'Content-Type': 'application/json'}
    });
    return response; // parses JSON response into native JavaScript objects
  }
async function getDataLibros(urlibros) {
    const response = await fetch(urlibros, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers:{'Content-Type': 'application/json'}
    });
    return response; // parses JSON response into native JavaScript objects
  }

const App =  () => {
    const [libreSol, setlibreSol] = useState([])
    const [libros, setlibros] = useState([])
    const [loading, setloading] = useState(true)
    const [loadingLibros, setloadingLibros] = useState(true)
    const [libroAgregado, setlibroAgregado] = useState(false)
    useEffect(() => {
        console.log("ejecuto useefect")
        cargarDatos()
        cargarLibros()
       
    }, [])



   const cargarDatos =()=>{
       console.log("ejecuto cargar datos")
        getData(urlSol)
        .then( resp => resp.json())
                .then( data => {
                   console.log(data)
                   setlibreSol(data)
                   setloading(false)
                })
        .catch(error => console.log(error))
            }
    const cargarLibros =()=>{
        console.log("ejecuto cargar datos")
        // const urlibros = "https://agile-ocean-56695.herokuapp.com/LibrosTest/"
        getDataLibros(urlLib)
        .then( resp => resp.json())
                .then( data => {
                    console.log(data)
                    setlibros(data)
                    setloadingLibros(false)
                         })
                 .catch(error => console.log(error))
    }
    //cargarDatos();
    console.log(libreSol)
    const [controlVista, setcontrolVista] = useState(true);
    const [LibroSelected, setLibroSelected] = useState({})
    const [ListarLibros, setListarLibros] = useState(false)
    

    const SolicitudLibro = (nuevoLibro) => {

        if(nuevoLibro.Id){
            const id = nuevoLibro.Id
            const found = libreSol.findIndex(element => element.Id === id);
            libreSol[found].Nombre = nuevoLibro.Nombre
            libreSol[found].Dueño = nuevoLibro.Dueño
            libreSol[found].prestamo = nuevoLibro.prestamo
            libreSol[found].devolucion = nuevoLibro.devolucion
            setcontrolVista(!controlVista)   
            setLibroSelected({})
        }else{
            const cant = libreSol.length+1;
            nuevoLibro.Id=cant;
            libreSol.push(nuevoLibro);
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
    const eliminarLibro = (idEliminado) => {
        // const url = "https://agile-ocean-56695.herokuapp.com/LibrosTest/";
           console.log(idEliminado)
           postData(urlSol, {"idSol":idEliminado})
           .then( resp => resp.json())
                .then( resp => {
                   console.log(resp)
                  
                            
                })
        .catch(error => console.log(error))
        const result = libreSol.filter(libre => libre.Id_Solicitud !== idEliminado);
        setlibreSol(result)
        setcontrolVista(true)
        //    setloading(false)
          
        
    }

    const eliminarLibroSelected = (idEliminado) => {
        // const url = "https://agile-ocean-56695.herokuapp.com/SolicitudesTest/";
           console.log(idEliminado)
           postDataDelLibro(urlLib, {"id":idEliminado})
           .then( resp => resp.json())
                .then( resp => {
                   console.log(resp)
                  
                            
                })
        .catch(error => console.log(error))
        // const result = libreSol.filter(libre => libre.Id_Solicitud !== idEliminado);
        // setlibreSol(result)
        // setcontrolVista(true)
        //    setloading(false)
          
        
    }
    
        if(controlVista)
        {   
            return (
                <UserContext.Provider value={{
                    libreSol, 
                    libros,
                    setlibros,
                    setcontrolVista,
                    ModLibro,
                    eliminarLibro,
                    ListarLibros,
                    setListarLibros,
                    loading,
                    eliminarLibroSelected
                }}>
                <Listar/>
                </UserContext.Provider>
            )
        }else{
            return(
                
                // <Libro solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {LibroSelected}/>
                <NuevaSolicitud solicitud={SolicitudLibro} Volver={controlVistaLibro} Dato = {LibroSelected}/>
            )
            
        }
    
   
    
}
export default App;