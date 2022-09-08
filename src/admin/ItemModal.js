import React from 'react';

import { Modal, Stack, Typography } from '@mui/material';
import ItemForm from "./ItemForm";

const style = {
  bgcolor: 'background.paper',
  borderRadius: ".5rem",
  boxShadow: 4,
  left: '50%',
  maxWidth: "1000px",
  p: 4,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
};

const ItemModal = ({ item, modalOpen, handleCloseModal }) => {

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack spacing={4} sx={style}>
        <Typography component="h3" fontWeight="500">
          Edit Item
        </Typography>
        <ItemForm item={item} handleCloseModal={handleCloseModal} />
      </Stack>
    </Modal>
  );
}

export default ItemModal
