import React, { useContext, useState } from "react"

import { Box, Table, TableContainer, TablePagination, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

import { ItemsContext } from "../../contexts/ItemsContext"
import { FiltersContext } from "../../contexts/FiltersContext"
import { ChecklistContext } from "../../contexts/ChecklistContext"

import ChecklistTableHead from "./ChecklistTableHead"
import ChecklistTableBody from "./ChecklistTableBody"

const ChecklistTable = ({ category }) => {
  const { selectItemsByCategory } = useContext(ItemsContext)
  const { selectFilters } = useContext(FiltersContext)
  const { selectChecklist } = useContext(ChecklistContext)
  const items = selectItemsByCategory(category)
  const checklist = selectChecklist()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getVisibleItems = () => {
    const filters = selectFilters()
    const textFilter = filters.text.toLowerCase()

    return items
      .filter((item) => {
        const { mastered, levels, owned } = checklist

        const textMatch =
          item.name.toLowerCase().includes(textFilter) ||
          item.slot.toLowerCase().includes(textFilter) ||
          item.type.toLowerCase().includes(textFilter) ||
          item.source.toLowerCase().includes(textFilter)

        const mrMatch = Number.isInteger(parseInt(filters.maxMr))
          ? parseInt(item.mr) <= parseInt(filters.maxMr)
          : true

        const masteredMatch = filters.hideMastered
          ? !mastered.includes(item.id) ||
            (item.maxLevel > 30 &&
              mastered.includes(item.id) &&
              (!levels.hasOwnProperty(item.id) ||
                levels[item.id] < 40))
          : true
        const ownedMatch = filters.hideOwned
          ? !owned.includes(item.id)
          : true
        const unownedMatch = filters.hideUnowned
          ? owned.includes(item.id)
          : true

        return (
          textMatch && mrMatch && masteredMatch && ownedMatch && unownedMatch
        )
      })
      .sort((a, b) => {
        if (orderBy === "name" && order === "asc")
          return a.name > b.name ? 1 : -1
        if (orderBy === "name" && order === "desc")
          return a.name < b.name ? 1 : -1
        if (orderBy === "slot" && order === "asc")
          return a.slot > b.slot ? 1 : -1
        if (orderBy === "slot" && order === "desc")
          return a.slot < b.slot ? 1 : -1
        if (orderBy === "type" && order === "asc")
          return a.type > b.type ? 1 : -1
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

  const visibleItems = getVisibleItems()

  return (
    <Box sx={{ width: "100%" }}>
      {visibleItems.length === 0 ? (
        <Box sx={{ alignItems: "center", color: "text.secondary", display: "flex", flexDirection: "column", pt: 10 }}>
          <SearchIcon sx={{ fontSize: "4rem" }} />
          <Typography>No {category}s found</Typography>
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: ".875rem",
              fontStyle: "italic",
              pb: 1,
              textAlign: "right",
            }}
          >
            Showing {visibleItems.length} of {items.length} items
          </Typography>
          <TableContainer>
            <Table
              aria-labelledby="checklistTable"
              size="small"
              sx={{ minWidth: 750 }}
            >
              <ChecklistTableHead
                order={order}
                setOrder={setOrder}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
              <ChecklistTableBody items={visibleItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={visibleItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  )
}
export default ChecklistTable
