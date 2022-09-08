import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getDatabase, ref, set } from "firebase/database"
import { DateTime } from "luxon"

import { Box, Button, Card, Grid, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

import { generateDescriptiveId } from "../utilities/generateDescriptiveId"
import WorldState from "./worldstate/WorldState"

const DashboardPage = () => {
  const navigate = useNavigate()
  const database = getDatabase()
  const checklists = localStorage.getItem("checklists") ? JSON.parse(localStorage.getItem("checklists")) : []

  const createChecklist = async () => {
    generateDescriptiveId().then((id) => {
      set(ref(database, `checklists/${id}`), {
        created: DateTime.now().toISO(),
        lastModified: DateTime.now().toISO()
      })
        .then(() => {
          localStorage.setItem("checklists", JSON.stringify([...checklists, id]))
          navigate(`/list/${id}`)
        })
        .catch((error) => console.log(error))
    })
  }

  return (
    <Box>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, pb: 2 }}
      >
        Warframe Mastery Checklist
      </Typography>
      <Typography fontSize=".875rem" maxWidth="75ch">
        Warframe Mastery Checklist is a site to help you plan what gear to grind
        for next. Check off frames, weapons, companions, etc that you already
        own and have mastered, find gear that is available to you at your
        current mastery rank, learn how to obtain it, and see how many items you
        need to master to hit the next rank.
      </Typography>
      <Grid container mt={6} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", p: 3 }}>
            <Typography fontSize="1.125rem" fontWeight="500" pb={1}>
              Create a Checklist
            </Typography>
            <Typography fontSize=".875rem" pb={1}>
              Create a new checklist to get started.
            </Typography>
            <Typography fontSize=".875rem" pb={1}>
              Be sure to bookmark your checklist URL so you can return to it
              later.
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={createChecklist}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Create a Checklist
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: "flex", flexDirection: "column", height: "100%", p: 3 }}>
            <Typography fontSize="1.125rem" fontWeight="500" pb={1}>
              Already have a checklist?
            </Typography>
            {checklists.length > 0 ? (
              <>
                {checklists.map((checklist, i) => (
                  <Typography key={i} fontSize=".875rem" pb={0.5}>
                    <Link to={"list/" + checklist}>
                      {window.location.href + "list/" + checklist}
                    </Link>
                  </Typography>
                ))}
                <Typography fontSize=".875rem" fontStyle="italic" mt="auto">
                  Please bookmark your checklists. These links will no longer
                  show here if you clear your browsing data.
                </Typography>
              </>
            ) : (
              <Typography fontSize=".875rem" pb={1}>
                Go directly to your bookmarked url to access it.
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
      <Box mt={4}>
        <WorldState />
      </Box>
    </Box>
  )
}

export default DashboardPage
