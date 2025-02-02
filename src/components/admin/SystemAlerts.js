import { useContext, useState } from "react"
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"

import { SystemAlertContext } from "../../contexts/SystemAlertContext"

const SystemAlerts = () => {
  const { selectSystemAlert, setSystemAlert } = useContext(SystemAlertContext)
  const alert = selectSystemAlert()

  const [message, setMessage] = useState(alert?.message)
  const [severity, setSeverity] = useState(alert?.severity)

  const onMessageChange = (e) => setMessage(e.target.value)
  const onSeverityChange = (e) => setSeverity(e.target.value)

  const handleSaveAlert = (e) => {
    e.preventDefault()
    setSystemAlert({ message, severity })
  }

  return (
    <Card sx={{ p: 2, height: "100%" }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Set a System Alert
      </Typography>
      <form onSubmit={handleSaveAlert}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={2}
            onChange={onMessageChange}
            size="small"
            value={message}
          />
          <FormControl fullWidth size="small">
            <InputLabel id="severity-select-label">Severity</InputLabel>
            <Select
              id="severity-select"
              label="Severity"
              labelId="severity-select-label"
              onChange={onSeverityChange}
              size="small"
              value={severity}
            >
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Card>
  )
}

export default SystemAlerts
