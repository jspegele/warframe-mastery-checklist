import React from "react"
import { Routes, Route } from "react-router-dom"

import Layout from "../components/Layout.component"
import DashboardPage from "../components/DashboardPage.component"


const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout />
        }
      >
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
