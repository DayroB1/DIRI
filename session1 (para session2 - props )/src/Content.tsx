import React from 'react';

import ActivityItem from './ActivityItem';

function TaskLogging2(): JSX.Element {
  
  return (
    <>
      <ActivityItem alt="francisca" time="Hace una hora" description="Fui a comer con amigos"/>
      <ActivityItem alt="paco" time="10 am" description="Leí un artículo sobre la tecnología"/>
      <ActivityItem alt="quica" time="10 am" description="Escribí notas sobre un proyecto importante"/>
      <ActivityItem alt="curro" time="2:21" description="Preparé la presentación para el día mañana"/>
    </>
  );
}

export default TaskLogging2;

// const TaskLogging2: React.FC = () => {
//   return (
//     // <div className="notificationsFrame">
//     //   <div className="panel">
//         <div className="">
//           <div className="line"></div>
//           <div className="">
//             <div className="avatar">
//               <img
//                 alt="Francisca"
//                 src="/images/francisca.jpg"
//               />
//             </div>
//             <span className="time">Hace una hora</span>
//             <p>Fui a comer con amigos</p>
//           </div>
//           <div className="">
//             <div className="avatar">
//               <img
//                 alt="Paco"
//                 src="/images/paco.jpg"
//               />
//             </div>
//             <span className="time">10:00 am</span>
//             <p>Leí un artículo sobre tecnología</p>
//           </div>
//           <div className="">
//             <div className="avatar">
//               <img
//                 alt="Quica"
//                 src="/images/quica.jpg"
//               />
//             </div>
//             <span className="time">10:00 am</span>
//             <p>Escribí notas sobre un proyecto importante</p>
//           </div>
//           <div className="">
//             <div className="avatar">
//               <img
//                 alt="Curro"
//                 src="/images/curro.jpg"
//               />
//             </div>
//             <span className="time">2:21 pm</span>
//             <p>Preparé la presentación para la reunión de mañana</p>
//           </div>
//         </div>
//     //   </div>
//     // </div>
//   );
// };

