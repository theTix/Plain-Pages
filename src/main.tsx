import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//context
import { UserContextProvider } from './contexts/UserContextProvider.tsx';
import { AuthorizationContextProvider } from './contexts/AuthorizationContextProvider.tsx'
import DescriptionContextProvider from './contexts/DescriptionContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <UserContextProvider>
        <DescriptionContextProvider>
          <App />
        </DescriptionContextProvider>
      </UserContextProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>,
)
