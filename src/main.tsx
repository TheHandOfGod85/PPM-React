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
import Root from './pages/root'
import RequestResetPasswordPage from './pages/requestResetPasswordPage'
import ResetPasswordPage from './pages/resetPasswordPage'
import UsersPage from './pages/usersPage'
import SignupPage from './pages/signupPage'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './features/ui/ProtectedRoute'
import ProtectedRouteRole from './features/ui/ProtectRouteRole'
import HideRoute from './features/ui/HideRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <SideBar />
      </ProtectedRoute>
    ),
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
        path: 'users',
        element: (
          <ProtectedRouteRole>
            <UsersPage />
          </ProtectedRouteRole>
        ),
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
  {
    path: 'reset-password-request',
    element: (
      <HideRoute>
        <RequestResetPasswordPage />
      </HideRoute>
    ),
  },
  {
    path: 'reset-password/:verificationCode',
    element: (
      <HideRoute>
        <ResetPasswordPage />
      </HideRoute>
    ),
  },
  {
    path: 'users/:userId/signup/:verificationCode',
    element: <SignupPage />,
  },
  { path: '*', element: <NotFoundPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: '8px',
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'oklch(var(--n))',
          color: 'white',
        },
      }}
    />
  </React.StrictMode>
)
