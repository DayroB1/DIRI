import { ChangeEvent, useState } from "react"
import EnrolmentForm from "./components/EnrolmentForm"

function App(){

  //Para manejar el seleccionador del tipo de programa
  const[program,setProgram]=useState("UG");

  const[enrolments,setEnrolments]=useState(0)

  const handleChangeProgram=(event:ChangeEvent<HTMLSelectElement>)=>{
    setProgram(event.target.value)
  }

  const handleChangeEnrolments=(updateEnrolments:number)=>{
    setEnrolments(updateEnrolments)
  }

  return (
    <div className="App">
      <div className="programs">
        <label>Selecciona el tipo de estudio:</label>
        <select className="appDropDowns" onChange={handleChangeProgram} value={program}>
        <option value={"UG"}>Grado</option>
        <option value={"PG"}>Postgrado</option>
        </select>
      <div>
        Matriculaciones Actuales: {enrolments}
      </div>
    <h1>Aplicación de Matriculación</h1>
    <EnrolmentForm chosenProgram={program} onChangeEnrolments={handleChangeEnrolments} currentEnrolments={enrolments}/>
    </div>
    </div>
  )
}

export default App