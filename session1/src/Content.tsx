import React from 'react';

const TaskLogging2: React.FC = () => {
  return (
    // <div className="notificationsFrame">
    //   <div className="panel">
        <div className="bg-blue-300 p-4 rounded">
          <div className="line"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <img
                alt="Francisca"
                src="/images/francisca.jpg"
                className="rounded-full"
              />
            </div>
            <span className="time">Hace una hora</span>
            <p>Fui a comer con amigos</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <img
                alt="Paco"
                src="/images/paco.jpg"
                className="rounded-full"
              />
            </div>
            <span className="time">10:00 am</span>
            <p>Leí un artículo sobre tecnología</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <img
                alt="Quica"
                src="/images/quica.jpg"
                className="rounded-full"
              />
            </div>
            <span className="time">10:00 am</span>
            <p>Escribí notas sobre un proyecto importante</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <img
                alt="Curro"
                src="/images/curro.jpg"
                className="rounded-full"
              />
            </div>
            <span className="time">2:21 pm</span>
            <p>Preparé la presentación para la reunión de mañana</p>
          </div>
        </div>
    //   </div>
    // </div>
  );
};

export default TaskLogging2;
