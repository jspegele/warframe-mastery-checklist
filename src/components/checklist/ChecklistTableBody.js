import React, { useContext } from "react"

import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material"

import { ChecklistContext } from "../../contexts/ChecklistContext"
import ItemMasterySelector from "./ItemMasterySelector"

const ChecklistTableBody = ({ items }) => {
  const { selectChecklist, startSetOwnedList, startSetMasteredList } = useContext(ChecklistContext)
  const checklist = selectChecklist()

  const isOwned = (itemId) => checklist.owned.includes(itemId)
  const isMastered = (itemId) => checklist.mastered.includes(itemId)

  const handleOwnedCheck = (itemId) => startSetOwnedList(itemId, !isOwned(itemId))

  const handleMasteredCheck = (itemId) => startSetMasteredList(itemId, !isMastered(itemId))

  return (
    <TableBody>
      {items.map((item) => (
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
            <Checkbox
              color="primary"
              checked={isOwned(item.id)}
              onChange={() => handleOwnedCheck(item.id)}
              size="small"
            />
          </TableCell>
          <TableCell align="center">
            <Checkbox
              color="primary"
              checked={isMastered(item.id)}
              onChange={() => handleMasteredCheck(item.id)}
              size="small"
            />
          </TableCell>
          <TableCell align="center">
            {item.maxLevel > 30 ? (
              <ItemMasterySelector
                itemId={item.id}
                itemLevel={
                  checklist.levels.hasOwnProperty(item.id)
                    ? checklist.levels[item.id]
                    : 30
                }
              />
            ) : 30}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default ChecklistTableBody
