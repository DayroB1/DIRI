import React, { useState } from "react"
import Citas from "../Modelo/Citas";
import Ayuda from "../View/Pages/Ayuda";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Header from "../View/Pages/Header";


interface Paciente {
    id: number;
    nombre: string;
    edad: number;
    fecha: string;
}

//Aquí se crea el componente que me genera un botón haciendo uso de la navegación programática para no hacer uso de un enlace como con NavLink sino usando el hook de useNavigate
const Boton = () => {
    const navigate = useNavigate();
    return (
        <>
        <button className="btn" onClick={()=>navigate('Ayuda')}>Otra alternativa de navegar a Ayuda</button>
        </>
    )
}

const Pacientes:React.FC = () => {
    const [citas, setCitas] = useState<Paciente[]>([

        //Aquí se inicializa el estado de los pacientes con citas preestablecidas a modo de ejemplo
        { id: 1, nombre: "Juan Pérez", edad: 25, fecha: "Enero 1" },
        { id: 2, nombre: "María López", edad: 30, fecha: "Enero 2" },
        { id: 3, nombre: "Carlos García", edad: 40, fecha: "Enero 3" }]);

    const [inputValue, setInputValue] = useState<string>("");

    //Con este estado, se maneja el filtado de la lista de items por contenido
    const [searchValue, setSearchValue] = useState<string>("");
    
    const agregarCita = () => {
        const nuevaCita: Paciente = {
            id: Date.now(),
            nombre: inputValue.trim(),
            edad: Math.floor(Math.random() * 100) + 1,
            fecha: "Enero 10"
        };
        setCitas((prevCitas)=>[...prevCitas, nuevaCita]);
        setInputValue(""); 
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          agregarCita();
        }
      };


    //En este caso la propiedad 'nombre' de 'cita' se convierte a minúsculas para no ser sensible a este factor y luego se compara con el valor del input 'searchValue' para poder ser filtrada la lista
    const filteredCitas = citas.filter((cita) =>
        cita.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            {/* El header es quien hace uso de NavLink para mostrar la página activa, más detalle en el componente */}
            <Header />
            {/* Aquí se incluye la otra alternativa de navegar a la página Ayuda con useNavigate */}
            <Boton />
            <h1>CITAS DE PACIENTES</h1>
            <input
                type="text"
                placeholder="Agregue el nombre de un nuevo paciente..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button onClick={agregarCita}>Agregar Cita</button>

            <h2>Buscar Citas</h2>
            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {filteredCitas.length === 0 ? (
                <p>No se ha encontrado ninguna cita.</p>
            ) : (
                //En este punto es donde se llama al componente que se le pasa como parámetro la lista de citas filtradas y se muestran todos los items 
                <Citas citas={filteredCitas}/>
            )}
        </div>
        // <div>
        //     <Header/>
        //     <Boton/>
        //     <h1>CITAS DE PACIENTES</h1>
        //     <input
        //      type="text"
        //         placeholder="Agregue el nombre de un nuevo paciente..."
        //         value={inputValue}
        //         onChange={(e) => setInputValue(e.target.value)}
        //         onKeyDown={handleKeyPress}/>
        //     <button onClick={agregarCita}>Agregar Cita</button>
        //     <ul></ul>
        //     <Citas citas={citas} />
        // </div>
    );
}

export default Pacientes
