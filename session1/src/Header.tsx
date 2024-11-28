import React from 'react';

const TaskLogging1: React.FC = () => {
  return (
    <div className="notificationsFrame">
      <div className="panel">
        <div className="header">
          <div className="menuIcon">
            <div className="dashTop"></div>
            <div className="dashBottom"></div>
            <div className="circle"></div>
          </div>
          <h1>Registro de Tareas</h1>
          <input
            type="text"
            className="searchInput"
            placeholder="Buscar ..."
          />
          <div className="fa fa-search searchIcon"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskLogging1;
