import { createBrowserRouter } from 'react-router-dom'

import LoginPage from 'pages/Auth/Login'
import SignupPage from 'pages/Auth/Signup'
import GroupsPage from 'pages/Dashboard/Groups.tsx'
import HomePage from 'pages/Dashboard/Home.tsx'
import SavingsPage from 'pages/Dashboard/Savings.tsx'
import SettingsPage from 'pages/Dashboard/Settings.tsx'
import TransactionsPage from 'pages/Dashboard/Transactions.tsx'
import LandingPage from 'pages/Landing'
import PlaygroundPage from 'pages/Playground'
import ResetPasswordPage from 'pages/Auth/ResetPassword'
import VerifyEmailPage from 'pages/Auth/Signup/verifyEmail.tsx'

import AuthLayout from '../layouts/authLayout.tsx'
import DashboardLayout from '../layouts/dashboardLayout.tsx'
import ResetPasswordLayout from '../pages/Auth/ResetPassword/layout.tsx'

import routes from './routes.ts'

const pagesRouter = createBrowserRouter([
  {
    path: routes.playground.root.path,
    element: <PlaygroundPage />,
  },
  {
    path: routes.landing.root.path,
    element: <LandingPage />,
  },
  {
    path: routes.dashboard.root.path,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.dashboard.groups.path, element: <GroupsPage /> },
      {
        path: routes.dashboard.transactions.path,
        element: <TransactionsPage />,
      },
      { path: routes.dashboard.settings.path, element: <SettingsPage /> },
      { path: routes.dashboard.savings.path, element: <SavingsPage /> },
    ],
  },
  {
    element: <ResetPasswordLayout />,
    path: routes.auth['reset-password'].abs_path,
    children: [
      {
        index: true,
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: routes.auth.root.path,
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: routes.auth.login.path, element: <LoginPage /> },
      { path: routes.auth.signup.path, element: <SignupPage /> },
    ],
  },
  { path: routes.auth['verify-email'].path, element: <VerifyEmailPage /> },
])

export default pagesRouter
