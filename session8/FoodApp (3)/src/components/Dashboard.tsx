import React from "react";
import "../styles.css";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  return (
    
    <div className="dashboard-container">
      <Navbar/>  
      <h1>Panel de Usuario</h1>
      <p>Este es un saludo de bienvenida, eres un usuario de la aplicación FoodApp.</p>
    </div>
  );
};

export default Dashboard;