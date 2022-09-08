import React, { useState } from "react"
import { Box, Card, Tabs, Tab } from "@mui/material"

import TabPanel from "../common/TabPanel"
import ChecklistTable from "./ChecklistTable"
import OtherMastery from "./OtherMastery"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const ChecklistTabs = () => {
  const categories = ["Weapon", "Warframe", "Necramech", "Companion", "Vehicle"]

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
          {categories.map((category, i) => (
            <Tab key={category} label={`${category}s`} {...a11yProps(i)} />
          ))}
          <Tab label="Other" {...a11yProps(categories.length)} />
        </Tabs>
      </Box>
      {categories.map((category, i) => (
        <TabPanel  index={i} key={category} value={tabValue}>
          <ChecklistTable category={category} />
        </TabPanel>
      ))}
      <TabPanel index={categories.length} value={tabValue}>
        <OtherMastery />
      </TabPanel>
    </Card>
  )
}
export default ChecklistTabs
