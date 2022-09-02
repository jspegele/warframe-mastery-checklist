import React, { useContext } from "react"
import PropTypes from "prop-types"

import { MenuItem, Select } from "@mui/material"

import { ChecklistContext } from "../contexts/ChecklistContext"

const levels = [30, 32, 34, 36, 38, 40]

const ItemMasterySelector = ({ listId, itemId, itemLevel }) => {
  const { startSetItemLevel } = useContext(ChecklistContext)

  const onLevelChange = (e) => {
    startSetItemLevel(listId, itemId, e.target.value)
  }

  return (
    <Select
      id="level-select"
      label="Age"
      labelId="level-select-label"
      onChange={onLevelChange}
      size="small"
      value={itemLevel}
    >
      {levels.map((level) => (
        <MenuItem key={level} value={level}>{level}</MenuItem>
      ))}
    </Select>
  )
}

ItemMasterySelector.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemLevel: PropTypes.number.isRequired,
}

export default ItemMasterySelector
