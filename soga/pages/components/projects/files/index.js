import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import FileIcone from "../../mediaFiles/FileIcon";
import { useTheme } from "@emotion/react";
import moment from "moment";

const Files = ({ files, handleShowFile }) => {
  const theme = useTheme();
  return (
    <>
      {files && (
        <Box>
          {/* All files main box */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {files.map((file) => (
              <Box
                sx={{
                  bgcolor: theme.colors.textBackground,
                  m: 1,
                  borderRadius: "5px",
                  p: 1,
                  alignContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: 1,
                }}
                onClick={() => handleShowFile(file)}
              >
                <FileIcone fileType={file.fileType} height={50} width={50} />
                <Box>
                  <Typography variant="body1">
                    <b> File name : </b> {file.fileName}
                  </Typography>
                  <Typography variant="body2">
                    <b>Added at : </b>{" "}
                    {moment(file.createdAt).format("MMMM Do YYYY HH:mm ")}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

Files.propTypes = {
  files: PropTypes.array.isRequired,
  handleShowFile: PropTypes.func.isRequired,
};

export default Files;
