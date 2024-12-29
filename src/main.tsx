import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/auth/Register.tsx'
import Login from './components/auth/Login.tsx';
import './index.css'
import App from './App.tsx'
import GamesList from './components/dart/GameList.tsx';
import LoggedDart from './components/dart/LoggedInDart.tsx';
import Homepage from './components/home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }, 
  {
    path: '/games',
    element: <GamesList />
  },  
  {
    path: '/game/:gameId',
    element: <LoggedDart />
  }, 
  {
    path: '/tryout',
    element: <App />
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
