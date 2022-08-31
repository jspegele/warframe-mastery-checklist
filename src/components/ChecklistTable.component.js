import React, { useState } from "react"

import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material"

import ChecklistTableHead from "./ChecklistTableHead.component"

const ChecklistTable = ({ checklist, items }) => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const isOwned = (id) => checklist.owned.includes(id)
  const isMastered = (id) => checklist.mastered.includes(id)

  const getVisibleItems = () => {
    return items.sort((a, b) => {
      if (orderBy === "name" && order === "asc") return a.name > b.name ? 1 : -1
      if (orderBy === "name" && order === "desc")
        return a.name < b.name ? 1 : -1
      if (orderBy === "slot" && order === "asc") return a.slot > b.slot ? 1 : -1
      if (orderBy === "slot" && order === "desc")
        return a.slot < b.slot ? 1 : -1
      if (orderBy === "type" && order === "asc") return a.type > b.type ? 1 : -1
      if (orderBy === "type" && order === "desc")
        return a.type < b.type ? 1 : -1
      if (orderBy === "mr" && order === "asc") return a.mr > b.mr ? 1 : -1
      if (orderBy === "mr" && order === "desc") return a.mr < b.mr ? 1 : -1
      if (orderBy === "source" && order === "asc")
        return a.source > b.source ? 1 : -1
      if (orderBy === "source" && order === "desc")
        return a.source < b.source ? 1 : -1
      return 1
    })
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          aria-labelledby="checklistTable"
          size="small"
          sx={{ minWidth: 750 }}
        >
          <ChecklistTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
            {getVisibleItems().map((item) => (
              <TableRow hover tabIndex={-1} key={item.id}>
                <TableCell component="th" scope="row">
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </TableCell>
                <TableCell>{item.slot}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell align="right">{item.mr}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell align="center">
                  <Checkbox color="primary" checked={isOwned(item.id)} size="small" />
                </TableCell>
                <TableCell align="center">
                  <Checkbox color="primary" checked={isMastered(item.id)} size="small" />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default ChecklistTable
