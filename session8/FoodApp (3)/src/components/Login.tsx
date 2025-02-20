import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import '../styles.css'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await authService.signIn(email, password);
      console.log("Usuario autenticado:", userCredential.user);
      setSuccess('Has iniciado sesión correctamente');
      setTimeout(() => navigate('/FoodApp'), 1000);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="style-form">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-container"> 
      <button className="btn" onClick={() => navigate(-1)}>Volver</button>
      <button type="submit">Ingresar</button>
    </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default Login;