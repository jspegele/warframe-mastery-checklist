import React, { useContext, useState } from "react"
import PropTypes from "prop-types"

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import { ChecklistContext } from "../../contexts/ChecklistContext"

const IntrinsicInput = ({ intrinsic }) => {
  const { startSetIntrinsic, selectIntrinsics } = useContext(ChecklistContext)
  const intrinsics = selectIntrinsics()

  const [value, setValue] = useState(intrinsics[intrinsic] || 0)

  const label = intrinsic.charAt(0).toUpperCase() + intrinsic.slice(1)

  const onValueChange = (e) => {
    const value = e.target.value
    console.log(value)
    if (value >= 0 && value <= 10) {
      setValue(parseInt(value))
      startSetIntrinsic(intrinsic, parseInt(value))
    }
  }

  const handleAddOne = () => {
    const newVal = value < 10 ? value + 1 : 10
    setValue(newVal)
    startSetIntrinsic(intrinsic, newVal)
  }

  const handleMouseDown = (e) => e.preventDefault()

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={value}
        onChange={onValueChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="add 1 to intrinsic value"
              color="primary"
              edge="end"
              onClick={handleAddOne}
              onMouseDown={handleMouseDown}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}

IntrinsicInput.propTypes = {
  intrinsic: PropTypes.string.isRequired,
}

export default IntrinsicInput
