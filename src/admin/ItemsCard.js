import React, { useContext } from "react"

import { Card, Typography } from "@mui/material"

import { ItemsContext } from "../contexts/ItemsContext"

import ItemsActionBar from "./ItemsActionBar"
import ItemsTable from "./ItemsTable"

const ItemsCard = () => {
  const { selectItems } = useContext(ItemsContext)

  const getVisibleItems = (items) => {
    return items.sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  return (
    <Card sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Items
      </Typography>
      <ItemsActionBar />
      <ItemsTable visibleItems={getVisibleItems(selectItems())} />
    </Card>
  )
}

export default ItemsCard
