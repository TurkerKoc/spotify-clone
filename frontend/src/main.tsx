import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom' //for routing pages
import AuthProvider from './providers/AuthProvider.tsx'

// For the Clerk AUTH
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider> {/* whenver a page is rendered, the auth provider will be called */}
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
