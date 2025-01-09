import { ChangeEvent, useState } from "react"
import EnrolmentForm from "./components/EnrolmentForm"
import EnrolList from "./components/EnrolList";
import { Student } from "./entities/Student";

function App(){

  //Para manejar el seleccionador del tipo de programa
  const[program,setProgram]=useState("UG");

  //Para manejar las matrículas
  const[ugEnrolments,setUGEnrolments]=useState(0)

  const[pgEnrolments,setPGEnrolments]=useState(0)

  // Este estado se ha credao para manejar el estudiante actual
  const [student, setStudent] = useState<Student | undefined>(undefined);

  const handleChangeProgram=(event:ChangeEvent<HTMLLIElement>)=>{
    setProgram(event.target.value.toString())
  }

  const handleChangeEnrolments=(updateEnrolments:number)=>{
    program == "UG" ? setUGEnrolments(updateEnrolments): setPGEnrolments(updateEnrolments)
  }

  const selectedEnrolments=():number=>{
    return program=="UG"?ugEnrolments:pgEnrolments
  }

  const handleStudentChange = (newStudent: Student) => {
    setStudent(newStudent);
  };


  return (
    <div className="App">
      <div className="programs">
        <ul className="ulEnrol">
          <li className="parentLabels" onChange={handleChangeProgram}>
            <input type="radio" value="UG" name="programGroup" defaultChecked>
            </input>Grado
            <input type="radio" value="PG" name="programGroup" className="radioSel">
            </input>Postgrado
          </li>
          <li>Matriculaciones actuales:{selectedEnrolments()}</li>
        </ul>
        {/* <label>Selecciona el tipo de estudio:</label>
        <select className="appDropDowns" onChange={handleChangeProgram} value={program}>
        <option value={"UG"}>Grado</option>
        <option value={"PG"}>Postgrado</option>
        </select>
      <div>
        Matriculaciones Actuales: {enrolments}
      </div> */}
    <h1>Aplicación de Matriculación</h1>
    
    </div> 
    <EnrolmentForm chosenProgram={program} onChangeEnrolments={handleChangeEnrolments} currentEnrolments={selectedEnrolments()} onStudentChanged={handleStudentChange}/>
    <EnrolList student={student}/>
    </div>
  )
}

export default App