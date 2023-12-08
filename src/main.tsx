import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './app/routes/root'
import ErrorPage from './app/components/error-page'
import NotFoundPage from './app/components/not-found-page'
import Dashboard from './app/routes/dashboardPage'
import SideBar from './app/components/SideBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AssetsPage from './app/routes/assetsPage'
import About from './app/routes/aboutPage'
import AssetDetailsPage from './app/routes/assetDetailsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  {
    path: '/dashboard',
    element: <SideBar />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'assets',
        element: <AssetsPage />,
      },
      {
        path: 'assets/:assetId',
        element: <AssetDetailsPage />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
