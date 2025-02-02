import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline } from "@mui/material"

import ItemsProvider from "./contexts/ItemsContext"
import SourcesProvider from "./contexts/SourcesContext"
import FiltersProvider from "./contexts/FiltersContext"
import ChecklistProvider from "./contexts/ChecklistContext"
import SystemAlertProvider from "./contexts/SystemAlertContext"
import CustomizedTheme from "./app/CustomizedTheme"

import "./app/firebase"
import "./index.css"
import AuthCheck from "./AuthCheck"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <CustomizedTheme>
      <CssBaseline />
      <BrowserRouter>
        <ItemsProvider>
          <SourcesProvider>
            <FiltersProvider>
              <ChecklistProvider>
                <SystemAlertProvider>
                  <AuthCheck />
                </SystemAlertProvider>
              </ChecklistProvider>
            </FiltersProvider>
          </SourcesProvider>
        </ItemsProvider>
      </BrowserRouter>
    </CustomizedTheme>
  </React.StrictMode>
)
