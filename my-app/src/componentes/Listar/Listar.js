import React, { useState } from 'react';
import ListarConDatos from './ListarConDatos';

const Listar = ({Libros, controlBtnNuevo}) => {
    
    if(Libros !== null){
      if(Libros.length !== 0){
        return(
          <div>
    
            <ListarConDatos libros={Libros} btnNuevo={controlBtnNuevo}/>
    
          </div>
        );
      }else{
        return(
          <div>
    
            <ListarConDatos libros={Libros} />
            <h2>No se encontraron Datos!!!</h2>
    
          </div>
        );
      }
    }else{
      return(
        <div>
          <h1>Hubo un error tremendo</h1>
        </div>
      );
    }
  
}
export default Listar

// Componente Listar determina si el arreglo esta vacio, lleno, hubo un error al obtener respuesta

// {estado? Reac.createPortal(<Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar}/>, modalEliminar) :  null}

// {estado? <Borrar id={idEliminar} cancelar={cancelarEliminar} okEliminado={okEliminar}/> :  null}

  