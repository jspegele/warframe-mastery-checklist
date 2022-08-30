import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { Box, Card, Tabs, Tab, Typography } from "@mui/material"

import { ItemsContext } from "../contexts/ItemsContext"

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const ChecklistTabs = ({ checklist }) => {
  const { selectItems } = useContext(ItemsContext)
  const items = selectItems()

  const categories = [
    { id: "weapon", title: "Weapons" },
    { id: "warframe", title: "Warframes" },
    { id: "necramech", title: "Necramechs" },
    { id: "companion", title: "Companions" },
    { id: "vehicle", title: "Vehicles" },
  ]
  console.log(categories)

  const [tabValue, setTabValue] = useState(0)
  const handleTabChange = (event, newValue) => setTabValue(newValue)

  return (
    <Card sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {categories.map((category, i) => (
            <Tab key={category.id} label={category.title} {...a11yProps(i)} />
          ))}
          <Tab label="Other" {...a11yProps(categories.length)} />
        </Tabs>
      </Box>
      {categories.map((category, i) => (
        <TabPanel key={category.id} index={i} value={tabValue}>
          {category.id}
        </TabPanel>
      ))}
      <TabPanel index={categories.length} value={tabValue}>
        Other stuff
      </TabPanel>
    </Card>
  )
}
export default ChecklistTabs
