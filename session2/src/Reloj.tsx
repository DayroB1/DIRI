import React,{ useState, useEffect } from "react"

interface Item {
    id: number;
    name: string;
    description: string;
  }

const Reloj: React.FC = () => {

    //Primer estado, inicia vacío y se actualiza el estado por medio de setHoraActual
    const [horaActual, setHoraActual] = useState("");

    //Segundo estado, inicia verificando si hay datos guardados, 'instantes' es la primera posición y se actualiza por medio de setInstantes modificando el array Item
    const [instantes, setInstantes] = useState<Item[]>(() => {
        const saved = localStorage.getItem("instants");
        return saved ? JSON.parse(saved) : [];
      });

    //Primer efecto, sólo se ejecuta al montar el componente y obtiene la hora por medio del intervalo cada segundo
    useEffect(() => {
      const intervalo = setInterval(()=>{
        const now = new Date();
      const horas = now.getHours();
      const minutos = now.getMinutes();
      const segundos = now.getSeconds();
      
      setHoraActual(
        `${formatoHora(horas)}:${formatoHora(minutos)}:${formatoHora(segundos)}`
      );
      console.log('Se usa effect');
      },1000)
    
      return () => clearInterval(intervalo);
    }, []);

    const formatoHora = (numero: number): string => {
        return numero < 10 ? `0${numero}` : `${numero}`;
      };
    
    const guardarInstante = () => {
        const nuevoInstante: Item = {
          id: instantes.length + 1,
          name: `Instante ${instantes.length + 1}`,
          description: `Hora: ${horaActual}`,
        };
        setInstantes([...instantes, nuevoInstante]);
    };

    const eliminarInstantes = () => {
        localStorage.removeItem("instants"); 
      };

    //Segundo efecto, depende del estado instantes, si este cambia, se agregan los nuevos valores al localStorage
    useEffect(() => {
        localStorage.setItem("instants", JSON.stringify(instantes));
      }, [instantes]);
    
  return (
    <>
    <div className=" bg-white p-6 rounded">
    <h1 className="text-6xl text-center font-bold text-blue-600">Reloj</h1>
    <div className="text-5xl font-mono text-gray-800 mb-6">
      {horaActual}
      <button onClick={guardarInstante} className="px-4 py-2 bg-blue-500 text-1x7 text-white">
          Guardar instante actual
        </button>
       <button onClick={eliminarInstantes} className="px-4 py-2 bg-red-500 text-white rounded">
              Eliminar instantes
            </button>
    <h2 >Instantes Guardados</h2>
        <ul >
          {instantes.map((item) => (
            <li key={item.id} >
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
    </div>
    </div>
    </>
  )
}

export default Reloj



