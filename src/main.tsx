import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './features/ui/error-page'
import NotFoundPage from './features/ui/not-found-page'
import SideBar from './features/ui/SideBar'
import './index.css'
import About from './pages/aboutPage'
import AssetDetailsPage from './pages/assetDetailsPage'
import AssetsPage from './pages/assetsPage'
import Dashboard from './pages/dashboardPage'
import NewAssetPage from './pages/newAssetPage'
import NewPartPage from './pages/newPartPage'
import Root from './pages/root'
import UpdateAssetPage from './pages/updateAssetPage'
import RequestResetPasswordPage from './pages/requestResetPasswordPage'

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
        path: 'assets/:assetId/edit-asset',
        element: <UpdateAssetPage />,
      },
      {
        path: 'assets/:assetId/new-part',
        element: <NewPartPage />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  { path: 'reset-password-request', element: <RequestResetPasswordPage /> },
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
