import React, { useContext, useEffect, useState } from "react"

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import {
  categoryValues,
  slotValues,
  typeValues,
  mrValues,
  masteryValues,
  sourceValues,
} from "./admin-form-data"

import { ItemsContext } from "../contexts/ItemsContext"

const ItemForm = ({ item = {}, handleCloseModal }) => {
  const { startSetItem } = useContext(ItemsContext)
  const [values, setValues] = useState({
    id: item?.id || null,
    name: item?.name || "",
    category: item?.category || "",
    slot: item?.slot || "",
    type: item?.type || "",
    prime: item?.prime === true || item?.prime === false ? item?.prime : false,
    vaulted: item?.vaulted === true || item?.vaulted === false ? item?.vaulted : false,
    link: item?.link || "",
    mr: item?.mr ? parseInt(item.mr) : 0,
    mastery: item?.mastery ? parseInt(item.mastery) : 3000,
    source: item?.source || "",
  })
  const [sourceValue, setSourceValue] = useState({ value: item?.source || "" })
  const [sourceInputValue, setSourceInputValue] = useState(item?.source || "")

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      link: "https://warframe.fandom.com/wiki/" + values.name.replace(" ", "_"),
    }))
  }, [values.name])

  const onValueChange = (prop) => (e) => {
    setValues((prevState) => ({ ...prevState, [prop]: e.target.value }))
  }

  const onCheckboxChange = (prop) => (e) => {
    setValues((prevState) => ({ ...prevState, [prop]: e.target.checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    startSetItem({ ...item, ...values, source: sourceInputValue })
    handleCloseModal()
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Item Name"
            onChange={onValueChange("name")}
            size="small"
            value={values.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              id="category-select"
              label="Category"
              labelId="category-select-label"
              onChange={onValueChange("category")}
              size="small"
              value={values.category}
            >
              <MenuItem value="">
                <Typography color="text.disabled" fontStyle="italic">
                  None
                </Typography>
              </MenuItem>
              {categoryValues.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="slot-select-label">Slot</InputLabel>
            <Select
              disabled={
                !["Companion", "Weapon", "Vehicle"].includes(values.category)
              }
              id="slot-select"
              label="Slot"
              labelId="slot-select-label"
              onChange={onValueChange("slot")}
              size="small"
              value={values.slot}
            >
              <MenuItem value="">
                <Typography color="text.disabled" fontStyle="italic">
                  None
                </Typography>
              </MenuItem>
              {slotValues.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              disabled={
                !["Companion", "Weapon", "Vehicle"].includes(values.category)
              }
              id="type-select"
              label="Type"
              labelId="type-select-label"
              onChange={onValueChange("type")}
              size="small"
              value={values.type}
            >
              <MenuItem value="">
                <Typography color="text.disabled" fontStyle="italic">
                  None
                </Typography>
              </MenuItem>
              {typeValues.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.prime === true}
                onChange={onCheckboxChange("prime")}
              />
            }
            label="Prime"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.vaulted === true}
                onChange={onCheckboxChange("vaulted")}
              />
            }
            label="Vaulted"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Wiki Link"
            onChange={onValueChange("link")}
            size="small"
            value={values.link}
          />
          <Typography fontSize=".875rem" pt={0.5}>
            Validate Link:{" "}
            {values.link !== "https://warframe.fandom.com/wiki/" &&
              values.link !== "" && (
                <a href={values.link} target="_blank" rel="noopener noreferrer">
                  {values.link}
                </a>
              )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="mr-select-label">MR</InputLabel>
            <Select
              id="mr-select"
              label="MR"
              labelId="type-mr-label"
              onChange={onValueChange("mr")}
              size="small"
              value={values.mr}
            >
              {mrValues.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="mastery-select-label">Mastery</InputLabel>
            <Select
              id="mastery-select"
              label="Mastery"
              labelId="type-mastery-label"
              onChange={onValueChange("mastery")}
              size="small"
              value={values.mastery}
            >
              {masteryValues.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Autocomplete
              fullWidth
              getOptionLabel={(option) => option.value}
              id="controllable-states-demo"
              options={sourceValues}
              renderInput={(params) => <TextField {...params} label="Source" />}
              value={sourceValue}
              onChange={(e, newValue) => setSourceValue(newValue)}
              inputValue={sourceInputValue}
              onInputChange={(e, newInputValue) =>
                setSourceInputValue(newInputValue)
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button color="primary" type="submit" variant="contained">
              Save
            </Button>
            <Button
              color="inherit"
              onClick={handleCloseModal}
              type="button"
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ItemForm
