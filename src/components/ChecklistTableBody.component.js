import React from "react"

import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material"

import { ChecklistContext } from "../contexts/ChecklistContext"
import { useContext } from "react"
import ItemMasterySelector from "./ItemMasterySelector.component"

const ChecklistTableBody = ({ items }) => {
  const { selectChecklist } = useContext(ChecklistContext)
  const checklist = selectChecklist()

  const isOwned = (id) => checklist.owned.includes(id)
  const isMastered = (id) => checklist.mastered.includes(id)

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
            <Checkbox color="primary" checked={isOwned(item.id)} size="small" />
          </TableCell>
          <TableCell align="center">
            <Checkbox
              color="primary"
              checked={isMastered(item.id)}
              size="small"
            />
          </TableCell>
          <TableCell align="center">
            {item.maxLevel > 30 ? (
              <ItemMasterySelector
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
