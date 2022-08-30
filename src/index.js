import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline } from "@mui/material"

import AuthProvider from "./contexts/AuthContext"
import ItemsProvider from "./contexts/ItemsContext"
import CustomizedTheme from "./app/CustomizedTheme"

import App from "./App"
import "./app/firebase"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <CustomizedTheme>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ItemsProvider>
            <App />
          </ItemsProvider>
        </AuthProvider>
      </BrowserRouter>
    </CustomizedTheme>
  </React.StrictMode>
)
