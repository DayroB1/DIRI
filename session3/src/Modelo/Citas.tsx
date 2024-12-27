import React from "react"
import { Link } from "react-router-dom"

interface Citas {
    id: number
    nombre: string
    edad: number
    fecha: string
}

interface props{
    citas:Citas[]
}

//Se define la función que recibe como parámetro la lista de citas con su id, nombre, edad y fecha para recorrer con (.map), darle un orden y devolver la lista final que se va a mostrar en pantalla
export default function Citas({citas}:props ):JSX.Element{

    const listCitas = citas.map(
        cita=>
            <li key={cita.id}>
            <strong>Nombre:</strong> {cita.nombre}
            <p><strong>Edad:</strong> {cita.edad}</p>
            <p><strong>Fecha generada de la cita:</strong> {cita.fecha}</p>
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