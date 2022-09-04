import React, { useState } from "react"
import { getDatabase, ref, get, remove } from "firebase/database"

import { Box, Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { DateTime } from "luxon"

const ListManagementPage = () => {
  const database = getDatabase()

  const [lists, setLists] = useState([])

  const getAllLists = () => {
    get(ref(database, "checklists")).then((snap) => {
      const checklistArray = []
      for (const [key, value] of Object.entries(snap.val())) {
        checklistArray.push({
          num_properties: Object.keys(value).length,
          id: key,
          ...value,
        })
      }
      setLists(checklistArray)
    })
  }

  const getAllEmptyLists = () => {
    get(ref(database, "checklists")).then((snap) => {
      const checklistArray = []
      for (const [key, value] of Object.entries(snap.val())) {
        if (
          Object.keys(value).length === 1 &&
          value.hasOwnProperty("created")
        ) {
          checklistArray.push({
            num_properties: Object.keys(value).length,
            id: key,
            ...value,
          })
        }
      }
      setLists(checklistArray)
    })
  }

  const removeAllEmptyLists = () => {
    get(ref(database, "checklists")).then((snap) => {
      for (const [key, value] of Object.entries(snap.val())) {
        if (
          Object.keys(value).length === 1 &&
          value.hasOwnProperty("created")
        ) {
          remove(ref(database, "checklists/" + key))
          console.log(key + "removed")
        }
      }
    })
  }

  const getAllListsWithNothingOwned = () => {
    get(ref(database, "checklists")).then((snap) => {
      const checklistArray = []
      for (const [key, value] of Object.entries(snap.val())) {
        if (!value.hasOwnProperty("owned")) {
          checklistArray.push({
            num_properties: Object.keys(value).length,
            id: key,
            ...value,
          })
        }
      }
      setLists(checklistArray)
    })
  }

  const deleteList = (id) => {
    remove(ref(database, "checklists/" + id)).then(() => {
      setLists(prevState => [...prevState.filter(list => list.id !== id)])
      console.log(id + " removed")
    })
  }

  return (
    <Box>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, pb: 2 }}
      >
        List Management
      </Typography>
      <Typography mt={10}>
        <Button onClick={getAllLists}>Get Lists</Button>
      </Typography>
      {lists.length > 0 && (
        <Card>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>created</TableCell>
                <TableCell>owned</TableCell>
                <TableCell>mastered</TableCell>
                <TableCell>intrinsics</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists.sort((a, b) => a.created > b.created ? 1 : -1).map((list) => (
                <TableRow key={list.id}>
                  <TableCell>{list.id}</TableCell>
                  <TableCell>
                    {list.created &&
                      DateTime.fromISO(list.created).toFormat("yyyy-LL-dd")}
                  </TableCell>
                  <TableCell>{list.owned && list.owned.length}</TableCell>
                  <TableCell>{list.mastered && list.mastered.length}</TableCell>
                  <TableCell>
                    {list.intrinsics &&
                      list.intrinsics.command +
                        list.intrinsics.engineering +
                        list.intrinsics.gunnery +
                        list.intrinsics.piloting +
                        list.intrinsics.tactical}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteList(list.id)} size="small">Delete List</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </Box>
  )
}

export default ListManagementPage
