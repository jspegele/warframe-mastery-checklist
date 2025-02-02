import { useContext } from "react"
import { Alert, Box, Container } from "@mui/material"

import { SystemAlertContext } from "../contexts/SystemAlertContext"

const SystemAlert = () => {
  const { selectSystemAlert } = useContext(SystemAlertContext)
  const alert = selectSystemAlert()

  if (!alert?.message) return ""

  return (
    <Box
      sx={{
        bgcolor:
          alert.severity === "success"
            ? "#0c130d"
            : alert.severity === "warning"
            ? "#191207"
            : alert.severity === "error"
            ? "#160b0b"
            : "#071318",
      }}
    >
      <Container>
        <Alert severity={alert.severity || "info"}>{alert.message}</Alert>
      </Container>
    </Box>
  )
}

export default SystemAlert
