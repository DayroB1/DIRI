import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

const App: React.FC = () => {
  return (
  <Router>
  <Routes>
  <Route path="/about" element={<About />} />
  <Route path="*" element={<Home />} />
  </Routes>
  </Router>
  );
 };

 export default App