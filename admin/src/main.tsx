import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DialogProvider } from '@shared/providers/DialogProvider';
import '@shared/libs/languages/config';
import { persistor, store } from './store';
import App from './App';
import './styles/style.scss';
import axios from '@libs/axios';
import { confiureServices } from '@shared/services';
import { registerAxiosInterceptors } from './middlewares/axios.interceptors';

registerAxiosInterceptors(axios);
confiureServices(axios);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DialogProvider>
          <App />
        </DialogProvider>
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
