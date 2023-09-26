import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DialogProvider } from '@shared/providers/DialogProvider';
import { LoaderProvider } from '@shared/providers/LoaderProvider/LoaderProvider';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './customValidations';
import '@shared/libs/languages/config';




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </DialogProvider>
  </React.StrictMode>,
)
