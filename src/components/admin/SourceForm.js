import React, { useContext, useState } from "react"

import { Box, Button, Grid, Stack, TextField } from "@mui/material"

import { SourcesContext } from "../../contexts/SourcesContext"

const SourceForm = ({ source = {}, handleCloseModal }) => {
  const { startSetSource } = useContext(SourcesContext)

  const [values, setValues] = useState({
    id: source?.id || null,
    description: source?.description || "",
    link: source?.link || "",
  })

  const onValueChange = (prop) => (e) => {
    setValues((prevState) => ({ ...prevState, [prop]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    startSetSource({
      ...source,
      ...values
    })
    handleCloseModal()
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            onChange={onValueChange("description")}
            size="small"
            value={values.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Link"
            onChange={onValueChange("link")}
            size="small"
            value={values.link}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button color="primary" type="submit" variant="contained">
              Save
            </Button>
            <Button
              color="inherit"
              onClick={handleCloseModal}
              type="button"
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SourceForm
