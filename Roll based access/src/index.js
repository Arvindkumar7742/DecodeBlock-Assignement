import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast"
import { UserProvider } from './ContextAPI/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </>
);

