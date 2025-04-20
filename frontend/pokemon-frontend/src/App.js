import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PokemonDetail from '../src/components/Detailscreen';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: redirect from "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Main routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
