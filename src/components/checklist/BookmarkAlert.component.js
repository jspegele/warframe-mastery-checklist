import React from "react"
import { Alert, AlertTitle } from "@mui/material"

const BookmarkAlert = () => (
  <Alert severity="warning">
    <AlertTitle sx={{ fontSize: ".875rem" }}>Be sure to bookmark this page so you can return to your checklist:</AlertTitle>
    {window.location.href}
  </Alert>
)

export default BookmarkAlert
