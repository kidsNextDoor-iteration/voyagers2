import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App.jsx';
// import env from './Users/rickmarkowitz/Documents/Codesmith/voyagers2/.env'

// import styles from './Style/styles.scss';

const root = createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);



