import React, { useEffect, useState } from "react";
import "../styles.css";
import Navbar from "./Navbar";
import { FirebaseDatabaseService } from "../firebase/FirebaseDatabaseService";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<{ uid: string; email: string; roles: { admin: boolean } }[]>([]);
  const databaseService = new FirebaseDatabaseService();

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await databaseService.getAllUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (uid: string, isAdmin: boolean) => {
    try {
      await databaseService.setUserRoles(uid, {
        email: users.find((user) => user.uid === uid)?.email || "",
        roles: { admin: !isAdmin },
      });
      // Actualiza la lista de usuarios después de cambiar el rol
      const updatedUsers = users.map((user) =>
        user.uid === uid ? { ...user, roles: { admin: !isAdmin } } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };

  return (
    <div className="admin-container">
      <Navbar />
      <h1>Panel de Administración</h1>
      <p>Gestión avanzada para administradores. Aquí puedes convertir en administrador a otros usuarios.</p>

      <h2>Lista de Usuarios</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.uid} className="user-item">
            <span>{user.email}</span>
            <button
              onClick={() => handleToggleAdmin(user.uid, user.roles.admin)}
              className={user.roles.admin ? "revoke-admin" : "make-admin"}
            >
              {user.roles.admin ? "Quitar Admin" : "Hacer Admin"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;