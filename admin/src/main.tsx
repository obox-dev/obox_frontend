import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { DialogProvider } from '@shared/providers/DialogProvider';
import './customValidations';
import 'react-toastify/dist/ReactToastify.css';
import '@shared/libs/languages/config';
import './styles/style.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
    <ToastContainer />
  </React.StrictMode>
);
