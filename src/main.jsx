import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatApp from './components/ChatApp/ChatApp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/chat",
        element: <ChatPage />
      },
      {
        path: "/chatapp",
        element: <ChatApp />
      },
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
