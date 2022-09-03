import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function MaxWidthDialog({
  open,
  handleClose,
  handleClickOpen,
  videoUrl,
}) {
  const fullWidth = true;
  const maxWidth = "xl";

  return (
    <React.Fragment>
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
            backgroundColor: "#ffffff",
            border: "1px solid black",
            opacity: 0.6,
          }}
        >
          {/* Right */}
          <div
            style={{
              flex: 0.7,
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <video
              controls
              style={{
                width: "60vw",
                height: "90vh",
                borderRadius: "3px",
              }}
              height="100vh"
            >
              <source src={videoUrl} />
              Sorry, your browser doesn't support embedded videos.
            </video>{" "}
          </div>
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
