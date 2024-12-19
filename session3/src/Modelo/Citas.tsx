import React from "react"
import { Link } from "react-router-dom"

interface Citas {
    id: number
    nombre: string
    //apellido: string
    edad: number
    fecha: string
}

interface props{
    citas:Citas[];
}

export default function Citas({citas}:props ):JSX.Element{

    const listCitas = citas.map(
        cita=>
            
            <li key={cita.id}>Nombre: {cita.nombre}
            <p>Edad: {cita.edad}</p>
            <p>Fecha generada de la cita: {cita.fecha}</p>
            </li>

    )
    return(
        <>
        <ul>
            {listCitas}
        </ul>
        </>
    )
}