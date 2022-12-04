import React, { useEffect, useRef } from "react"

import { Modal, Stack, Typography } from "@mui/material"

import SourceForm from "./SourceForm"

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

const SourceModal = ({ source = null, modalOpen, handleCloseModal }) => {
  const instance = useRef({ timer: 0 })

  // Timer cleanup
  useEffect(() => {
    const timer = instance.current.timer
    return () => clearTimeout(timer)
  }, [])

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="source-modal-title"
      aria-describedby="source-modal-description"
    >
      <Stack spacing={4} sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h3" fontWeight="500">
            {source ? "Edit Source" : "Add Source"}
          </Typography>
          {source && (
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography fontSize=".875rem">{source.id}</Typography>
            </Stack>
          )}
        </Stack>
        <SourceForm source={source} handleCloseModal={handleCloseModal} />
      </Stack>
    </Modal>
  )
}

export default SourceModal
