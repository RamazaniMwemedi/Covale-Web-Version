import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { Avatar, Typography } from "@mui/material";

import AvatarB from "./Avatar"

import styles from "../../styles/Chatleft.module.css";


export default function MaxWidthDialog({ user }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const inputRef = React.useRef();
  const username = user ? user.username : "Username";

  const [image, setImage] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [cropedArea, setCroppedArea] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);

  const triggerFileSelectPopup = () => inputRef.current.click();

  const onCropComplete = (croppedAreaPercertage, cropedAreaPixels) => {
    setCroppedArea(cropedAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const displayName = user ? user.username : "Name";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <>
        <div className={styles.drawer_header}>
          <div className="avatarClick">
            {" "}
            <Avatar
              onClick={handleClickOpen}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </div>
          <Typography variant="h6" noWrap>
            {displayName}
          </Typography>
        </div>
        {/* {image && (
          <div className="cropper">
            <Cropper
              image={image}
              zoom={zoom}
              crop={crop}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="bottom">
              <Box sx={{ width: 300, marginLeft: 10, bottom: 0 }}>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  setImage(null);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        )} */}
      </>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "40px",
              }}
            >
              <Box>
                <AvatarB triggerFileSelectPopup={triggerFileSelectPopup} />
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={onSelectFile}
                />
              </Box>

              <Box>
                <Typography variant="h5">{username}</Typography>
                <Box sx={{ display: "flex", gap: "100px" }}>
                  {/* Followers */}
                  <Box
                    sx={{
                      backgroundColor: "aliceblue",
                      width: "105px",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="body1">Followers</Typography>
                  </Box>
                  {/* Following */}
                  <Box
                    sx={{
                      backgroundColor: "aliceblue",
                      width: "105px",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="body1">Following</Typography>
                  </Box>
                  {/* Friends */}
                  <Box
                    sx={{
                      backgroundColor: "aliceblue",
                      width: "105px",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="body1">Friends</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
