import React, { useState } from "react"

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

import SourceModal from "./SourceModal"

const SourcesTable = ({ visibleSources }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSource, setCurrentSource] = useState(null)

  const handleOpenModal = (source) => {
    setCurrentSource(source)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentSource(null)
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleSources.length) : 0

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <TableContainer>
        <Table
          aria-labelledby="sourcesTable"
          size="small"
          sx={{ minWidth: 600 }}
        >
          <TableHead sx={{ "& th": { color: "text.secondary" } }}>
            <TableRow>
              <TableCell sx={{ width: "36px" }}></TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleSources
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((source) => (
                <TableRow tabIndex={-1} key={source.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenModal(source)}
                      size="small"
                    >
                      <EditIcon size="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>{source.description}</TableCell>
                  <TableCell>
                    <a href={source.link} target="_blank" rel="noreferrer">
                      {source.link}
                    </a>
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
        count={visibleSources.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <SourceModal
        source={currentSource}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  )
}

export default SourcesTable
