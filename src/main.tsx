import React from 'react';

import 'github-markdown-css/github-markdown.css';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
