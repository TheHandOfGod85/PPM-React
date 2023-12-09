import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Root from './pages/root'
import ErrorPage from './features/ui/error-page'
import SideBar from './features/ui/SideBar'
import Dashboard from './pages/dashboardPage'
import AssetsPage from './pages/assetsPage'
import AssetDetailsPage from './pages/assetDetailsPage'
import About from './pages/aboutPage'
import NotFoundPage from './features/ui/not-found-page'
import NewAssetPage from './pages/newAssetPage'

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
        path: 'assets/new-asset',
        element: <NewAssetPage />,
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
