import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//context
import { UserContextProvider } from './contexts/UserContextProvider.tsx';
import { AuthorizationContextProvider } from './contexts/AuthorizationContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>,
)
