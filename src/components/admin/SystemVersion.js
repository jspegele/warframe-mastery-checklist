import { useEffect, useState } from "react"
import { getDatabase, ref, get, set } from "firebase/database"
import { Button, Card, Stack, TextField, Typography } from "@mui/material"

const SystemVersion = () => {
  const database = getDatabase()
  const [version, setVersion] = useState("")
  const onVersionChange = (e) => setVersion(e.target.value)

  useEffect(() => {
    get(ref(database, "itemsVersion/"))
      .then((snap) => {
        if (snap.exists()) {
          setVersion(snap.val())
        }
      })
      .catch((error) => console.error(error))
  }, [])

  const handleSaveVersion = (e) => {
    e.preventDefault()

    set(ref(database, "itemsVersion/"), version).catch((error) =>
      console.log(error)
    )
  }

  return (
    <Card sx={{ p: 2, height: "100%" }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Items Version
      </Typography>
      <form onSubmit={handleSaveVersion}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Version"
            onChange={onVersionChange}
            size="small"
            value={version}
          />
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

export default SystemVersion
