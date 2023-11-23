import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/authLayout.tsx'
import DashboardLayout from '../layouts/dashboardLayout.tsx'
import LoginPage from 'pages/Auth/Login.tsx'
import SignupPage from 'pages/Auth/Signup.tsx'
import TransactionsPage from 'pages/Dashboard/Transactions.tsx'
import HomePage from 'pages/Dashboard/Home.tsx'
import LandingPage from 'pages/Landing'
import GroupsPage from 'pages/Dashboard/Groups.tsx'
import SavingsPage from 'pages/Dashboard/Savings.tsx'
import SettingsPage from 'pages/Dashboard/Settings.tsx'
import PlaygroundPage from 'pages/Playground'

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
    path: routes.auth.root.path,
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: routes.auth.login.path, element: <LoginPage /> },
      { path: routes.auth.signup.path, element: <SignupPage /> },
    ],
  },
])

export default pagesRouter
