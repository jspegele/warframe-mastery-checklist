import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline } from "@mui/material"

import CustomizedTheme from "./app/CustomizedTheme"
import AuthProvider from "./contexts/AuthContext"
import ItemsProvider from "./contexts/ItemsContext"
import FiltersProvider from "./contexts/FiltersContext"
import ChecklistProvider from "./contexts/ChecklistContext"

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
            <FiltersProvider>
              <ChecklistProvider>
                <App />
              </ChecklistProvider>
            </FiltersProvider>
          </ItemsProvider>
        </AuthProvider>
      </BrowserRouter>
    </CustomizedTheme>
  </React.StrictMode>
)
