import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { MenuItem, Select } from "@mui/material"

const levels = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

const ItemMasterySelector = ({ itemLevel }) => {
  const [level, setLevel] = useState(levels[0])
  const onLevelChange = (e) => setLevel(e.target.value)

  useEffect(() => {
    setLevel(itemLevel)
  }, [itemLevel])

  return (
    <Select
      id="level-select"
      label="Age"
      labelId="level-select-label"
      onChange={onLevelChange}
      size="small"
      value={level}
    >
      {levels.map((level) => (
        <MenuItem value={level}>{level}</MenuItem>
      ))}
    </Select>
  )
}

ItemMasterySelector.propTypes = {
  itemLevel: PropTypes.func.isRequired,
}

export default ItemMasterySelector
