import React, { useContext, useState } from "react"

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import { ItemsContext } from "../../contexts/ItemsContext"
import ItemModal from "./ItemModal"

const APIItems = () => {
  const { selectItems } = useContext(ItemsContext)
  const dbItems = selectItems()

  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({
    hasWikiaUrl: false,
    isMatched: false,
    isUnmatched: true,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const onFiltersChange = (filter) => (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: e.target.checked,
    }))
  }

  const handleOpenAddItemModal = (item) => {
    setCurrentItem({
      name: item.name,
      category: item.category === "Warframes" ? "Warframe" : item.category,
      mr: item.masteryReq,
      prime: item.isPrime,
    })
    setModalOpen(true)
  }

  const handleCloseAddItemModal = () => {
    setCurrentItem(null)
    setModalOpen(false)
  }

  const handleFetchItems = () => {
    setLoading(true)
    fetch("https://api.warframestat.us/items")
      .then((res) => res.json())
      .then((res) => {
        // const uniqueCategories = [...new Set(allItems.map((item) => item.category))]
        const categories = [
          "Arch-Gun",
          "Arch-Melee",
          "Archwing",
          "Melee",
          "Pets",
          "Primary",
          "Secondary",
          "Sentinels",
          "Warframes",
        ]

        const filteredItems = []

        for (let i = 0; i < res.length; i++) {
          if (categories.includes(res[i].category))
            filteredItems.push({
              ...res[i],
              matches: dbItems.filter(
                (dbItem) =>
                  dbItem.name.toLowerCase() === res[i].name.toLowerCase()
              ).length,
            })
        }

        setItems(filteredItems)
        setLoading(false)
      })
  }

  const getVisibleItems = () => {
    return items.filter((item) => {
      console.log(item.name, item.wikiaUrl)
      const wikiaUrlMatch = !filters.hasWikiaUrl || item.wikiaUrl
      const isMatched = !filters.isMatched || item.matches > 0
      const isUnmatched = !filters.isUnmatched || item.matches === 0
      return wikiaUrlMatch && isMatched && isUnmatched
    })
  }

  return (
    <Box sx={{ width: "100%" }}>
      {items.length > 0 ? (
        <Box>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hasWikiaUrl}
                  onChange={onFiltersChange("hasWikiaUrl")}
                  size="small"
                />
              }
              label="Has Wiki Link"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isMatched}
                  onChange={onFiltersChange("isMatched")}
                  size="small"
                />
              }
              label="Has Match"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isUnmatched}
                  onChange={onFiltersChange("isUnmatched")}
                  size="small"
                />
              }
              label="No Match"
              sx={{ mr: 3 }}
            />
          </FormGroup>
          <TableContainer sx={{ marginTop: 2 }}>
            <Table aria-labelledby="itemsTable" size="small">
              <TableHead sx={{ "& th": { color: "text.secondary" } }}>
                <TableRow>
                  <TableCell width="200px">Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Match Found?</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getVisibleItems().map((item, i) => (
                  <TableRow
                    key={item.name + i}
                    sx={{
                      height: "50px",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {item.wikiaUrl ? (
                        <Link
                          href={item.wikiaUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        item.name
                      )}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.matches}</TableCell>
                    <TableCell>
                      <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {item.matches === 0 && (
                          <Button onClick={() => handleOpenAddItemModal(item)}>
                            Add Item
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ItemModal
            item={currentItem}
            modalOpen={modalOpen}
            handleCloseModal={handleCloseAddItemModal}
          />
        </Box>
      ) : (
        <Stack direction="row" marginRight="2rem" spacing={1}>
          <Button onClick={handleFetchItems} variant="contained">
            Fetch Items
          </Button>
          {loading && <CircularProgress size="2rem" sx={{ ml: 2 }} />}
        </Stack>
      )}
    </Box>
  )
}

export default APIItems
