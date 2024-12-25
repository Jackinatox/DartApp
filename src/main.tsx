import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/auth/Register.tsx'
import Login from './components/auth/Login.tsx';
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
