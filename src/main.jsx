import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Auth0
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
<Auth0Provider
    domain="dev-5jfi8lkp.us.auth0.com"
    clientId="fKEO5AqB4jwPLvob1OdMsiFYnz69OMmf"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <BrowserRouter >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Auth0Provider>,
)
