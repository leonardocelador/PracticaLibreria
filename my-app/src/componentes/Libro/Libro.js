import React, { useState } from 'react'

export const Libro = () => {

    const [libro, setLibro] = useState({
        nombre:'',
        dueño:'',
        fprestamo:'',
        fdevolucion:'',
        imagen:''
    })



    return (
        <>
            <h1>Bienvenido a libro</h1>
            <label>Libro</label>
            <input type="text" name="nombre-libro"></input>

        </>
    )
}
