import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import FileComponent from "../mediaFiles/FileComponent";
import {
  FileObject,
  RootState,
} from "../../../interfaces/myprofile";
const Files = () => {
  const [tabValue, setTabValue] = useState("all");

  const tabValueHandler = (value: string) => {
    setTabValue(value);
  };
  return (
    <Box sx={{ width: "auto", ml: 7, mt: -3 }}>
      <FilesTab tabValueHandler={tabValueHandler} tabValue={tabValue} />{" "}
      <Box
        sx={{
          // // should be scrollable
          // overflow: "auto",
          // height: "360px",
          // width: "340px",
          // mt: 0,
          // mb: 1,
          // borderRadius: "10px",
          // "& .MuiAvatar-root": {
          //   width: 32,
          //   height: 32,
          //   ml: -0.5,
          //   mr: 1,
          // },
          // "&:before": {
          //   content: '""',
          //   display: "block",
          //   position: "absolute",
          //   top: 0,
          //   right: 14,
          //   width: 10,
          //   height: 10,
          //   bgcolor: "background.paper",
          //   transform: "translateY(-50%) rotate(45deg)",
          //   zIndex: 0,
          // },

          // pb: 4,
        }}
      >
        <FilsContex tabValue={tabValue} />
      </Box>
    </Box>
  );
};
export default Files;

const NavButton = styled(Button)(() => ({
  fontWeight: "bold",
  fontSize: "11px",
  "&:hover": {
    fontWeight: "bold",
  },
  // a bottom line
  borderRadius: 3,
  textTransform: "none",
  display: "flex",
}));

interface FilesTabProps {
  tabValue: string;
  tabValueHandler: (value: string) => void;
}
const FilesTab = ({ tabValue, tabValueHandler }: FilesTabProps) => {
  const purpleColor = purple[500];
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        mt: 1,
        mb: 1,
        // ml: 0.5,
        // scrollable
        overflow: "auto",
        gap: 1,
      }}
    >
      <NavButton
        sx={
          tabValue === "all"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("all");
        }}
      >
        All Files
      </NavButton>
      <NavButton
        sx={
          tabValue === "gallery"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("gallery");
        }}
      >
        Gallery
      </NavButton>
      <NavButton
        sx={
          tabValue === "videos"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("videos");
        }}
      >
        Videos
      </NavButton>
      <NavButton
        sx={
          tabValue === "documents"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("documents");
        }}
      >
        Documents
      </NavButton>
      <NavButton
        sx={
          tabValue === "spreadsheets"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("spreadsheets");
        }}
      >
        Spreadsheets
      </NavButton>
      <NavButton
        sx={
          tabValue === "pfdlibrary"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("pfdlibrary");
        }}
      >
        PDFLibrary
      </NavButton>
      <NavButton
        sx={
          tabValue === "presentations"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("presentations");
        }}
      >
        Presentations
      </NavButton>
      <NavButton
        sx={
          tabValue === "audiofiles"
            ? {
                borderBottom: `2px solid ${purpleColor}`,
                color: purpleColor,
                backgroundColor: theme.colors.background1,
              }
            : {
                color: "grey",
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          tabValueHandler("audiofiles");
        }}
      >
        AudioFiles
      </NavButton>
    </Box>
  );
};
interface FilsContexProp {
  tabValue: string;
}

const FilsContex = ({ tabValue }: FilsContexProp) => {
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore ? userStore.user : null;
  const allFiles = user ? user.files : [];

  switch (tabValue) {
    case "all":
      return <AllFiles allFiles={allFiles} />;
    case "gallery":
      return <Gallery />;
    case "videos":
      return <Videos />;
    case "documents":
      return <Documents />;
    case "spreadsheets":
      return <Spreadsheets />;
    case "pdflibrary":
      return <PDFLibrary />;
    case "presentations":
      return <Presentations />;
    case "audiofiles":
      return <AudioFiles />;
    default:
      return <AllFiles allFiles={allFiles} />;
  }
};

const AllFiles = ({ allFiles }: { allFiles: FileObject[] }) => {
  console.log("ALL FILES >>>", allFiles);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">All Files</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {allFiles.length > 0 ? (
          <>
            {allFiles.map((fileObject) => (
              <FileComponent
                key={fileObject.file.id}
                file={fileObject.file}
                displayFile={true}
                height={300}
                width={300}
              />
            ))}
          </>
        ) : (
          <Typography variant="h5">No Files</Typography>
        )}
      </Box>
    </Box>
  );
};

const Gallery = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Gallery</Typography>
    </Box>
  );
};
const Videos = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Video Library</Typography>
    </Box>
  );
};
const Documents = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Documents</Typography>
    </Box>
  );
};
const Spreadsheets = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Spreadsheets</Typography>
    </Box>
  );
};
const PDFLibrary = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Pdfs</Typography>
    </Box>
  );
};
const Presentations = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Presentations</Typography>
    </Box>
  );
};
const AudioFiles = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="h4">Audio Files</Typography>
    </Box>
  );
};
