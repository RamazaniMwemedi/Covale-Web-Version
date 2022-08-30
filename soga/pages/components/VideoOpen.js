import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function MaxWidthDialog({ open, handleClose, handleClickOpen }) {
  const fullWidth = true;
  const maxWidth = "xl";

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            height: "100vh",
            display: "flex",
            margin: 0,
            padding: 0,
          }}
        >
          {/* Right */}
          <Box
            sx={{
              flex: 0.7,
              backgroundColor: "red",
            }}
          >
            <Typography>Right</Typography>
          </Box>
          {/* Left */}
          <Box
            sx={{
              flex: 0.3,
              backgroundColor: "dodgerblue",
            }}
          >
            <Typography>Left</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
