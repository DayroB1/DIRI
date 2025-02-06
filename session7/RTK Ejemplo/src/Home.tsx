import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './features/store';
import { fetchNewTime } from './features/timeSlice';

const Home: React.FC = () => {
//   const currentTime = useSelector((state: RootState) => state.time.currentTime);
const { currentTime, loading, error } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch<AppDispatch>();

  return (
    // <div className="home">
    //   <h1>Ejemplo simple Redux Toolkit</h1>
    //   <p>Hora actual: {new Date(currentTime).toLocaleString()}</p>
    //   <button onClick={() => dispatch(fetchNewTime())}>Actualizar</button>
    // </div>
    <div className="home">
      <h1>Ejemplo simple Redux Toolkit</h1>
      <p>Hora actual: {new Date(currentTime).toLocaleString()}</p>
      {loading ? (
        <p>⏳Cargando...</p>
      ) : (
        <button onClick={() => dispatch(fetchNewTime())} disabled={loading}>
          Actualizar
        </button>
      )}
      {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
    </div>
  );
};

export default Home;