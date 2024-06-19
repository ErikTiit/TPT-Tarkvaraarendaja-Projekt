import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/app.jsx';
import { UserProvider } from './src/Data/UserContext.jsx'; 

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <UserProvider> 
      <App />
    </UserProvider>
  </React.StrictMode>
);