import React from "react"

import { Card, Typography } from "@mui/material"

import ItemsActionBar from "./ItemsActionBar"

const ItemsCard = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Items
      </Typography>
      <ItemsActionBar />
    </Card>
  )
}

export default ItemsCard
