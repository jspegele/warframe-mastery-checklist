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
    id: "id",
    isSortable: true,
    label: "ID",
    align: "left",
  },
  {
    id: "created",
    isSortable: true,
    label: "Created",
    align: "left",
  },
  {
    id: "lastModified",
    isSortable: true,
    label: "Last Modified",
    align: "left",
  },
  {
    id: "owned",
    isSortable: true,
    label: "Owned",
    align: "right",
  },
  {
    id: "mastered",
    isSortable: true,
    label: "Mastered",
    align: "right",
  },
  {
    id: "intrinsics",
    isSortable: true,
    label: "Intrinsics",
    align: "right",
  },
  {
    id: "actions",
    isSortable: false,
    label: "Actions",
    align: "center",
  },
]

function ListsTableHead({ order, orderBy, setOrder, setOrderBy }) {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return (
    <TableHead sx={{ '& th': { color: "text.secondary" } }}>
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

ListsTableHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  setOrder: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
}

export default ListsTableHead
