import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/authContext';
import { RefreshProvider } from './context/RefreshContext';
import './styles/main.scss'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RefreshProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </RefreshProvider>
    </AuthProvider>
  </React.StrictMode>
);