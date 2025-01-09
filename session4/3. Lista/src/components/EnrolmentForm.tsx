import React, { FormEvent, useRef, useState } from 'react'
import { Student } from '../entities/Student'

interface EnrolmentFormProps{
  chosenProgram:string
  currentEnrolments:number
  onChangeEnrolments:(updateEnrolments:number)=>void

  //Para comunicar los dos siblings
  onStudentChanged:(student:Student)=>void
}

function EnrolmentForm(props:EnrolmentFormProps) {

  const nameInputRef = useRef<HTMLInputElement>(null)
  const[firstName,setFisrtName]=useState("");
  const[lastName,setLastName]=useState("");
  const[welcomeMessage,setwelcomeMessage]=useState("");

  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
    setwelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
    props.onChangeEnrolments(props.currentEnrolments+1)


    const student:Student={
      firstName:firstName,
      lastName:lastName,
      program:props.chosenProgram
    }
    props.onStudentChanged(student)
    event.currentTarget.reset() //este evento se hace para vaciar el formulario
    nameInputRef.current?.focus()
    event.preventDefault();
  }

  return (
    <div>
      <form className='enrolForm' onSubmit={handleSubmit}>
        <h2>Datos del estudiante - {props.chosenProgram}</h2>
        <label>Nombre:</label>
        <input type="text" name='fname' onBlur={(event)=>setFisrtName(event.target.value)} ref={nameInputRef}></input>
        <br/>
        <label>Apellidos:</label>
        <input name='lname' onBlur={(event)=>setLastName(event.target.value)}></input>
        <br/>
        <br/>
        <input type="submit" value="Registrar"></input>
        <label id="studentMsg" className='message'>{welcomeMessage}</label>
      </form>
    </div>
  )
}

export default EnrolmentForm