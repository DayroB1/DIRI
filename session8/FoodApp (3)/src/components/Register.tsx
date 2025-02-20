import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { FirebaseDatabaseService } from "../firebase/FirebaseDatabaseService";
import "../styles.css"; 

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await authService.signUp(email, password);
      const userService = new FirebaseDatabaseService();
      await userService.setUserRoles(userCredential.user.uid, { email: userCredential.user.email, roles: { admin: false } });
      setSuccess('Registro exitoso. Redirigiendo al menú...');
      setTimeout(() => navigate('/FoodApp'), 2000);
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="style-form">
      <h2>Registrarse</h2>
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
      <button type="submit">Registrarse</button>
    </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default Register;