import React, { useState } from "react"
import { Box, Card, Tabs, Tab } from "@mui/material"

import ChecklistTabPanel from "../common/TabPanel"
import Items from "./Items"
import Lists from "./Lists"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const AdminTabs = () => {
  const [tabValue, setTabValue] = useState(0)
  const handleTabChange = (event, newValue) => setTabValue(newValue)

  return (
    <Card sx={{ minHeight: "33vh", width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Items" {...a11yProps(0)} />
          <Tab label="Lists" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <ChecklistTabPanel index={0} value={tabValue}>
        <Items />
      </ChecklistTabPanel>
      <ChecklistTabPanel index={1} value={tabValue}>
        <Lists />
      </ChecklistTabPanel>
    </Card>
  )
}
export default AdminTabs
