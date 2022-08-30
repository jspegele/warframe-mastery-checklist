import React, { useContext } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { createBrowserHistory } from "history"

import { AuthContext } from "../contexts/AuthContext"

import Layout from "../components/Layout.component"
import DashboardPage from "../components/DashboardPage.component"
import ChecklistPage from "../components/ChecklistPage.component"
import AdminDashboardPage from "../admin/AdminDashboardPage.component"

export const history = createBrowserHistory()

function RequireAuth({ children }) {
  const { authState } = useContext(AuthContext)
  const location = useLocation()

  if (!authState.uid) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return children
}

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout />
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/list/:listId" element={<ChecklistPage />} />
      </Route>
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/admin/" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
