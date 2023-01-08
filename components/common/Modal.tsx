import { Box, Modal } from "@mui/material";

interface ModalElementProps {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element[] | JSX.Element;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export const ModalElement = (props: ModalElementProps) => {
  const { open, handleClose, children } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
