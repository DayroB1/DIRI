import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Student } from '../entities/Student'

interface EnrolmentFormProps{
  chosenProgram:string
  currentEnrolments:number
  onChangeEnrolments:(updateEnrolments:number)=>void

  //Para comunicar los dos siblings
  onStudentChanged:(student:Student)=>void

  editingStudent?:Student
}

function EnrolmentForm(props:EnrolmentFormProps) {

  const nameInputRef = useRef<HTMLInputElement>(null)
  const[firstName,setFisrtName]=useState("");
  const[lastName,setLastName]=useState("");
  const[welcomeMessage,setwelcomeMessage]=useState("");
  const[btnTitle,setBtnTitle]=useState("Registrar")
  const[editingStudentID,setEditingStudentID]=useState<string>()

  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{

    const submitter=(event.nativeEvent as SubmitEvent).submitter as HTMLInputElement

    if(!submitter||submitter.value != "Cancelar"){
      setwelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
    props.onChangeEnrolments(props.currentEnrolments+1)

    const student:Student={
      id:editingStudentID,
      firstName:firstName,
      lastName:lastName,
      program:props.chosenProgram
    }
    props.onStudentChanged(student)
    }
  
    event.currentTarget.reset() //este evento se hace para vaciar el formulario
    
    setEditingStudentID(undefined)
    setFisrtName("")
    setLastName("")
    nameInputRef.current?.focus() //para hacer foco del cursor en el campo del nombre
    event.preventDefault(); 
    setBtnTitle("Registrar")
  }

  useEffect(() => {
    if (props.editingStudent) {
   setEditingStudentID(props.editingStudent.id);
    setFisrtName(props.editingStudent.firstName);
    setLastName(props.editingStudent.lastName);
    setBtnTitle("Actualizar");
    }
  }, [props.editingStudent]);

  return (
    <div>
      <form className='enrolForm' onSubmit={handleSubmit}>
        <h2>Datos del estudiante - {props.chosenProgram}</h2>
        <label>Nombre:</label>
        <input type="text" name='fname' onChange={(event)=>setFisrtName(event.target.value)} ref={nameInputRef} value={firstName}></input>
        <br/>
        <label>Apellidos:</label>
        <input name='lname' onChange={(event)=>setLastName(event.target.value)} value={lastName}></input>
        <br/>
        <br/>
        <input type="submit" value={btnTitle}></input>
        <input type="submit" value="Cancelar"></input>
        <label id="studentMsg" className='message'>{welcomeMessage}</label>
      </form>
    </div>
  )
}

export default EnrolmentForm