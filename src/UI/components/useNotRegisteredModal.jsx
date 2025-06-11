import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function useNotRegisteredModal({ intialOpenState = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(intialOpenState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const render = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="d-flex flex-column justify-content-start align-items-center"
          >
            <Typography className="fs-6">
              برای دسترسی به این بخش باید ابتدا ثبت نام/ورود کنید .
            </Typography>
            <Button
              className="mt-3"
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/register?returnUrl=" + location.pathname);
              }}
            >
              ثبت نام / ورود
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  };

  return { open, setOpen, handleOpen, handleClose, render };
}
