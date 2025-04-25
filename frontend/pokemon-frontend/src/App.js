import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonDetail from '../src/components/Detailscreen'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      
      </Routes>
    </Router>
  );
}

export default App;
