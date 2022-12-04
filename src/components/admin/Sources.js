import React, { useContext, useState } from "react"

import { Box, Typography } from "@mui/material"

import SourcesActionBar from "./SourcesActionBar"
import SourcesTable from "./SourcesTable"

import { SourcesContext } from "../../contexts/SourcesContext"

const Sources = () => {
  const { selectSources } = useContext(SourcesContext)
  const [textFilter, setTextFilter] = useState("")

  const getVisibleSources = (sources) => {
    return sources
      .filter((source) => {
        const needle = textFilter.toLowerCase()
        return (
          source.description.toLowerCase().includes(needle) ||
          source.link.toLowerCase().includes(needle)
        )
      })
      .sort((a, b) => (a.description > b.description ? 1 : -1))
  }

  const visibleSources = getVisibleSources(selectSources())

  return (
    <Box>
      <SourcesActionBar
        textFilter={textFilter}
        setTextFilter={setTextFilter}
        visibleSources={visibleSources}
      />
      {visibleSources?.length > 0 ? (
        <SourcesTable visibleSources={visibleSources} />
      ) : (
        <Typography pt={10} textAlign="center">
          No sources found
        </Typography>
      )}
    </Box>
  )
}

export default Sources
