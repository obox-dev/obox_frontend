import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import App from './App'
import { DialogProvider } from '@shared/providers/DialogProvider';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './customValidations';
import '@shared/libs/languages/config';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
    <ToastContainer />
  </React.StrictMode>,
)
