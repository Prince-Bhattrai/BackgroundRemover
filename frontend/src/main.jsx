import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BgProvider } from './context/BgContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='486568811864-ism9f2knu20kkp73i4r34uges674cfd2.apps.googleusercontent.com'>
      <BrowserRouter>
        <BgProvider>
          <App />
        </BgProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
