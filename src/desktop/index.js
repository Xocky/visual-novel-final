import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../common/App';
import '../web/App.css';
import { HashRouter } from 'react-router-dom';
import '../../public/styles.css';
import '../common/styles/core.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
); 