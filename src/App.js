import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Slido from './components/slido';
import Blanko from './components/blanko';
import Snako from './components/snako';
import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="logo" />
        <div className="link-container">
          <Link to="/">
            <p className="full-text">Dashboard</p>
            <p className="short-text">D</p>
          </Link>
          <Link to="/blanko">
            <p className="full-text">Blanko</p>
            <p className="short-text">B</p>
          </Link>
          <Link to="/slido">
            <p className="full-text">Slido</p>
            <p className="short-text">S</p>
          </Link>
          <Link to="/snako">
            <p className="full-text">Snako</p>
            <p className="short-text">Sn</p>
          </Link>
        </div>
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/snako" element={<Snako />} />
        </Routes>
      </main>
      <footer className="footer">
      </footer>
    </div>
  );
}

export default App;
