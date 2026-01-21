import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { BgProvider } from './context/BgContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='811968593825-b9c0593knjbfqu1ndagc0i24pn062ai8.apps.googleusercontent.com'>
      <BrowserRouter>
        <BgProvider>
          <App />
        </BgProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
