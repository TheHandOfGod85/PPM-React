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
import Root from './pages/root'
import RequestResetPasswordPage from './pages/requestResetPasswordPage'
import ResetPasswordPage from './pages/resetPasswordPage'

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
  { path: 'reset-password-request', element: <RequestResetPasswordPage /> },
  { path: 'reset-password/:verificationCode', element: <ResetPasswordPage /> },
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
