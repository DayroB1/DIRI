import React, { FormEvent, useState } from 'react'

function EnrolmentForm() {
  const[firstName,setFisrtName]=useState("");
  const[lastName,setLastName]=useState("");
  const[welcomeMessage,setwelcomeMessage]=useState("");

  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
    setwelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
    event.preventDefault();
  }

  return (
    <div>
      <form className='enrolForm' onSubmit={handleSubmit}>
        <h2>Datos del estudiante</h2>
        <label>Nombre:</label>
        <input type="text" name='fname' onBlur={(event)=>setFisrtName(event.target.value)}></input>
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