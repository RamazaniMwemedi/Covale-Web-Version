import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Button, Menu } from "@mui/material";
import { Box } from "@mui/system";

import FileComponent from "./FileComponent";

const FileDisplayComponent = ({ handleCloseShowVideoPlayer, file }) => {
  return (
    <Menu
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "felx",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      onClose={handleCloseShowVideoPlayer}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "hidden",
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          ml: 50,
          m: 0,
          position: "fixed",
          borderRadius: "10px",
          backgroundColor: "unset",
        },
      }}
      transformOrigin={{ horizontal: "center", vertical: "" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={true}
    >
      {/* Top */}
      <Box
        sx={{
          display: "felx",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 1,
          }}
        >
          <Button
            onClick={handleCloseShowVideoPlayer}
            variant="contained"
            color="secondary"
          >
            <KeyboardBackspaceRoundedIcon fontSize="medium" />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <FileComponent
            file={file}
            width={1000}
            height={600}
            controls={true}
            displayFile={true}
          />
        </Box>
      </Box>
    </Menu>
  );
};

export default FileDisplayComponent;
