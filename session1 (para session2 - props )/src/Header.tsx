import React from 'react';


interface Header {
  title: string;
}

function TaskLogging1({ title }: Header): JSX.Element {
  return (
    <div className="notificationsFrame">
      <div className="panel">
        <div className="header">
          <div className="menuIcon">
            <div className="dashTop"></div>
            <div className="dashBottom"></div>
            <div className="circle"></div>
          </div>
          <h1>{title}</h1>
          <input type="text" placeholder="Buscar ..." />
          <div className="fa fa-search searchIcon"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskLogging1;






// const TaskLogging12: React.FC = () => {
//   return (
//     <div className="notificationsFrame">
//       <div className="panel">
//         <div className="header">
//           <div className="menuIcon">
//             <div className="dashTop"></div>
//             <div className="dashBottom"></div>
//             <div className="circle"></div>
//           </div>
//           <h1>Registro de Tareas</h1>
//           <input
//             type="text"
//             placeholder="Buscar ..."
          
//           />
//           <div className="fa fa-search searchIcon"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskLogging12;
