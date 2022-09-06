import React from "react"
import PropTypes from "prop-types"

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"

const headCells = [
  {
    id: "name",
    isSortable: true,
    label: "Name",
    align: "left",
  },
  {
    id: "slot",
    isSortable: true,
    label: "Slot",
    align: "left",
  },
  {
    id: "type",
    isSortable: true,
    label: "Type",
    align: "left",
  },
  {
    id: "mr",
    isSortable: true,
    label: "MR",
    align: "right",
  },
  {
    id: "source",
    isSortable: true,
    label: "Source",
    align: "left",
  },
  {
    id: "owned",
    isSortable: false,
    label: "Owned",
    align: "center",
  },
  {
    id: "mastered",
    isSortable: false,
    label: "Mastered",
    align: "center",
  },
  {
    id: "level",
    isSortable: false,
    label: "Level",
    align: "center",
  },
]

function ChecklistTableHead({ order, orderBy, setOrder, setOrderBy }) {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.isSortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

ChecklistTableHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  setOrder: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
}

export default ChecklistTableHead
