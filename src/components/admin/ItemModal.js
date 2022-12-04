import React, { useEffect, useRef, useState } from "react"

import { IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

import ItemForm from "./ItemForm"

const style = {
  bgcolor: "background.paper",
  borderRadius: ".5rem",
  boxShadow: 4,
  left: "50%",
  maxWidth: "1000px",
  p: 4,
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
}

const ItemModal = ({ item = null, modalOpen, handleCloseModal }) => {
  const [copyTitle, setCopyTitle] = useState("Copy ID")
  const instance = useRef({ timer: 0 })

  // Timer cleanup
  useEffect(() => {
    const timer = instance.current.timer
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id)
    setCopyTitle("Copied!")
    clearTimeout(instance.current.timer)
    instance.current.timer = setTimeout(() => {
      setCopyTitle("Copy ID")
    }, 2000)
  }

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="item-modal-title"
      aria-describedby="item-modal-description"
    >
      <Stack spacing={4} sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h3" fontWeight="500">
            {item ? "Edit Item" : "Add Item"}
          </Typography>
          {item && (
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography fontSize=".875rem">{item.id}</Typography>
              <Tooltip title={copyTitle}>
                <IconButton
                  aria-label="Copy Id"
                  onClick={() => handleCopy(item.id)}
                >
                  <ContentCopyIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
        <ItemForm item={item} handleCloseModal={handleCloseModal} />
      </Stack>
    </Modal>
  )
}

export default ItemModal
