import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/App';
import './web/App.css';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
); 