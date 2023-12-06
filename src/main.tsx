import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './app/routes/root'
import ErrorPage from './app/components/error-page'
import NotFoundPage from './app/components/not-found-page'
import Dashboard from './app/routes/dashboard'
import SideBar from './app/components/SideBar'

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  {
    path: '/dashboard',
    element: <SideBar />,
    children: [
      {
        path: 'assets',
        element: <Dashboard />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
