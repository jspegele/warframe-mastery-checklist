import React, { useContext, useState } from "react"

import { Box, Typography } from "@mui/material"

import { ItemsContext } from "../../contexts/ItemsContext"

import ItemsActionBar from "./ItemsActionBar"
import ItemsTable from "./ItemsTable"

const Items = () => {
  const { selectItems } = useContext(ItemsContext)
  const [textFilter, setTextFilter] = useState("")

  const getVisibleItems = (items) => {
    return items
      .filter((item) => {
        const needle = textFilter.toLowerCase()
        return (
          item.category.toLowerCase().includes(needle) ||
          item.name.toLowerCase().includes(needle) ||
          item.slot.toLowerCase().includes(needle) ||
          item.source.toLowerCase().includes(needle) ||
          item.type.toLowerCase().includes(needle)
        )
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  const visibleItems = getVisibleItems(selectItems())

  return (
    <Box>
      <ItemsActionBar
        textFilter={textFilter}
        setTextFilter={setTextFilter}
        visibleItems={visibleItems}
      />
      {visibleItems?.length > 0 ? (
        <ItemsTable visibleItems={visibleItems} />
      ) : (
        <Typography pt={10} textAlign="center">
          No items found
        </Typography>
      )}
    </Box>
  )
}

export default Items
