import React, { useState } from "react"
import Citas from "./Citas";
import Ayuda from "../Pages/Ayuda";
import { Link, NavLink } from "react-router-dom";

// interface Citas {
//     id: number
//     nombre: string
//     //apellido: string
//     edad: number
//     fecha: Date
// }

interface Paciente {
    id: number;
    nombre: string;
    edad: number;
    fecha: string;
}

const Pacientes:React.FC = () => {
    const [citas, setCitas] = useState<Paciente[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    
    const agregarCita = () => {
        const nuevaCita: Paciente = {
            id: Date.now(),
            nombre: inputValue.trim(),
            edad: Math.floor(Math.random() * 100) + 1,
            fecha: "Enero 1"
        };
        setCitas((citas)=>[...citas, nuevaCita]);
        setInputValue(""); 
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          agregarCita();
        }
      };

    return (
        <div>
            <nav>
            <NavLink to="/">Citas</NavLink> | <NavLink to="/Ayuda">Ayuda</NavLink>
            </nav>
            <h1>CITAS DE PACIENTES</h1>
            <input
             type="text"
                placeholder="Agregue el nombre de un nuevo paciente..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
        />
            <button onClick={agregarCita}>Agregar Cita</button>
            <ul></ul>
            <Citas citas={citas} />
        </div>
    );
}

export default Pacientes
