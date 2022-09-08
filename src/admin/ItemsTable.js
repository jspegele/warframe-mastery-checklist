import React, { useState } from "react"

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"

import ItemModal from "./ItemModal"

const ItemsTable = ({ visibleItems }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const handleOpenModal = (item) => {
    setCurrentItem(item)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentItem(null)
    setModalOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleItems.length) : 0

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <TableContainer>
        <Table
          aria-labelledby="itemsTable"
          size="small"
          sx={{ minWidth: 600 }}
        >
          <TableHead sx={{ '& th': { color: "text.secondary" } }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Mastery</TableCell>
              <TableCell align="right">MR</TableCell>
              <TableCell align="center">Prime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& tr:hover': { cursor: "pointer" } }}>
            {visibleItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  hover
                  onClick={() => handleOpenModal(item)}
                  tabIndex={-1}
                  key={item.id}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.slot}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell align="right">{item.mastery}</TableCell>
                  <TableCell align="right">{item.mr}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center" spacing={0.5}>
                      {item.prime && (
                        <Tooltip title={`Prime${item.vaulted ? ` (vaulted)` : ""}`}>
                          <Box>
                            <Typography component="span" fontWeight="500">P</Typography>
                            {item.vaulted && <Typography component="span"> (V)</Typography>}
                          </Box>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
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
      <ItemModal item={currentItem} modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
    </Box>
  )
}

export default ItemsTable
