import React from "react"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import WorldState from "../worldstate/WorldState"

const WorldStateAccordion = () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Game News and Worldstate</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <WorldState elevation={2} />
    </AccordionDetails>
  </Accordion>
)

export default WorldStateAccordion
