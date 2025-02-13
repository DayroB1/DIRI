import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Panel de Usuario</h1>
      <p className="mt-2 text-gray-600">Aquí puedes gestionar tus datos y configuraciones.</p>
    </div>
  );
};

export default Dashboard;
