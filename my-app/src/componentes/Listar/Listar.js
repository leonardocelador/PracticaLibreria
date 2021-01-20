import React, { useContext } from 'react';
import SearchAppBar from '../App Bar/SearchAppBar';
import ListarConDatos from './ListarConDatos';
import { UserContext } from '../UserContext/UserContext';
import ListaLibros from './ListaLibros';
// {Libros, controlBtnNuevo, libr, elimina}
const Listar = () => {
  const {libres, ListarLibros, loading} = useContext(UserContext)
   if(loading){
     return(
       <div>
          <h1>Cargando Datos</h1>
       </div>
     )
     
   }else{
    if(libres !== null){
      if(libres.length !== 0){
        if(ListarLibros === false)
        {
            return(
              <div>
                <SearchAppBar  Solicitudes={libres}/>
                <br></br>
                {/* <ListarConDatos libros={Libros} btnNuevo={controlBtnNuevo} Libr={libr} del={elimina}/> */}
                <ListarConDatos />
        
              </div>
            );
        }else{
             return(
               <div>
                <SearchAppBar  Solicitudes={libres}/>
                <br></br>
                <ListaLibros />
              </div>
             );
             
        }
        
      }else{

        if(ListarLibros === false)
        {
            return(
              <div>
                <SearchAppBar  Solicitudes={libres}/>
                <br></br>
                {/* <ListarConDatos libros={Libros} btnNuevo={controlBtnNuevo} Libr={libr} del={elimina}/> */}
                <ListarConDatos />
                <h2>No se encontraron Datos!!!</h2>
              </div>
            );
        }else{
             return(
               <div>
                <SearchAppBar  Solicitudes={libres}/>
                <br></br>
                <ListaLibros />
              </div>
             );
             
        }
        
      }
    }else{
      return(
        <div>
          <h1>Error al cargar Datos!!!</h1>
        </div>
      );
    }
   }
   
  
}
export default Listar

// Componente Listar determina si el arreglo esta vacio, lleno, hubo un error al obtener respuesta

// {estado? Reac.createPortal(<Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar}/>, modalEliminar) :  null}

// {estado? <Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar}/> :  null}

  