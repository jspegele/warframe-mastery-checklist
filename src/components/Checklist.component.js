import React from "react"

import { Box } from "@mui/material"

import ChecklistTabs from "./ChecklistTabs.component"

const Checklist = ({ checklist, items }) => {
  return (
    <Box>
      <ChecklistTabs checklist={checklist} />
    </Box>
  )
}

export default Checklist
