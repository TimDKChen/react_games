import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StateContext, { State } from './hooks/context.js';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateContext.Provider value={new State()}>
        <App />
      </StateContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
