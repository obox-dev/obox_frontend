import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@app/styles/style.scss'

import '@shared/libs/languages/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
