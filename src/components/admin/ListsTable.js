import React, { useContext, useState } from "react"
import { getDatabase, ref, remove } from "firebase/database"
import { DateTime } from "luxon"

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material"

import { AdminChecklistsContext } from "../../contexts/AdminChecklistsContext"
import ListsTableHead from "./ListsTableHead"

const ListsTable = ({ order, setOrder, orderBy, setOrderBy, visibleLists }) => {
  const database = getDatabase()
  const { removeChecklist } = useContext(AdminChecklistsContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleLists.length) : 0

  const deleteList = (id) => {
    if (window.confirm("Are you sure you want to delete this list?") === true) {
      // Remove list from firebase
      remove(ref(database, "checklists/" + id)).then(() => {
        // Remove id from secondary index
        remove(ref(database, "checklists_index/" + id)).then(() => {
          removeChecklist(id)
        })
      })
    }
  }

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <TableContainer>
        <Table aria-labelledby="itemsTable" size="small" sx={{ minWidth: 600 }}>
          <ListsTableHead
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <TableBody>
            {visibleLists
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((list) => (
                <TableRow key={list.id}>
                  <TableCell>{list.id}</TableCell>
                  <TableCell>
                    {list.created &&
                      DateTime.fromISO(list.created).toFormat("yyyy-LL-dd")}
                  </TableCell>
                  <TableCell>
                    {list.lastModified &&
                      DateTime.fromISO(list.lastModified).toFormat("yyyy-LL-dd")}
                  </TableCell>
                  <TableCell align="right">{list.owned && list.owned.length}</TableCell>
                  <TableCell align="right">{list.mastered && list.mastered.length}</TableCell>
                  <TableCell align="right">
                    {list.intrinsics &&
                      list.intrinsics.command +
                        list.intrinsics.engineering +
                        list.intrinsics.gunnery +
                        list.intrinsics.piloting +
                        list.intrinsics.tactical}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteList(list.id)} size="small">
                      Delete List
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
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
        count={visibleLists.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default ListsTable
