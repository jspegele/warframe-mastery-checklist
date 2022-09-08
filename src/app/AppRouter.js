import React, { useContext } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { createBrowserHistory } from "history"

import { AuthContext } from "../contexts/AuthContext"

import Layout from "../components/Layout"
import DashboardPage from "../components/DashboardPage"
import ChecklistPage from "../components/checklist/ChecklistPage"
import LoginPage from "../components/login/LoginPage"
import AdminDashboardPage from "../components/admin/AdminDashboardPage"

export const history = createBrowserHistory()

function RequireAnon({ children }) {
  const { selectUid } = useContext(AuthContext)
  const location = useLocation()
  const uid = selectUid()

  if (uid) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return children
}

function RequireAuth({ children }) {
  const { selectUid } = useContext(AuthContext)
  const location = useLocation()
  const uid = selectUid()

  if (!uid) {
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
          <RequireAnon>
            <Layout />
          </RequireAnon>
        }
      >
        <Route path="/login" element={<LoginPage />} />
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
