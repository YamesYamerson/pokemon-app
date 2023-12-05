import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import PokemonGame from './components/PokemonGame';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/pokemon" className="nav-link">Pokemon</Link>
            </li>
            <li className="nav-item">
              <Link to="/pokemongame" className="nav-link">Pokemon Game</Link>
            </li>
            <li className="nav-item">
              <Link to="/pokedex" className="nav-link">Pokedex</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemongame" element={<PokemonGame />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
