import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/authContext';
import { RefreshProvider } from './context/RefreshContext';
import { HelmetProvider } from 'react-helmet-async';
import './styles/main.scss'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RefreshProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RefreshProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);