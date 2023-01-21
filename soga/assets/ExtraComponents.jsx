const { Box, IconButton, Typography } = require("@mui/material");
const { useRef, useState, useEffect } = require("react");
const {
  PdfIcon,
  DocxIcon,
  XlsIcon,
  PptIcon,
  ImageIcon,
  VideoIcon,
} = require("./Icons");

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";

const ImageComponent = React.memo(
  ({ src, fileName, width, height, displayFile }) => {
    const Widget = styled("div")(({ theme }) => ({
      borderRadius: 6,
      width: width,
      maxWidth: "100%",
      margin: displayFile ? "auto" : "none",
      position: "relative",
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(0,0,0,0.6)"
          : "rgba(255,255,255,0.4)",
      backdropFilter: "blur(40px)",
    }));

    return (
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget>
          {displayFile ? (
            <Image src={src} width={width} height={height} />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ImageIcon width={width} height={height} />
              <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
                {/* First 10 characters and .{fileExtension} */}
                {fileName.substring(0, 10)}...{fileName.split(".").pop()}
              </Typography>
            </Box>
          )}
        </Widget>
      </Box>
    );
  }
);

const Video = React.memo(({ src, fileName, width, height, displayFile }) => {
  const Widget = styled("div")(({ theme }) => ({
    borderRadius: 6,
    width: width,
    maxWidth: "100%",
    margin: displayFile ? "auto" : "none",
    position: "relative",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.6)"
        : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)",
  }));

  const theme = useTheme();
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        {displayFile ? (
          <video width={width} height={height} src={src} controls></video>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <VideoIcon width={width} height={height} />
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "12px",
                whiteSpace: "nowrap",
                wordBreak: "keep-all",
              }}
            >
              {/* First 10 characters and .{fileExtension} */}
              {fileName.substring(0, 10)}...{fileName.split(".").pop()}
            </Typography>
          </Box>
        )}
      </Widget>
    </Box>
  );
});

const Pdf = React.memo(({ src, fileName, width, height, displayFile }) => {
  const Widget = styled("div")(({ theme }) => ({
    borderRadius: 6,
    maxWidth: "100%",
    margin: displayFile ? "auto" : "none",
    position: "relative",
    backgroundColor: displayFile ? theme.colors.textBackground : "transparent",
    backdropFilter: "blur(40px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Box
      sx={{
        // Should fit the parent container
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // width: "100%",
        overflow: "hidden",
      }}
    >
      <Widget>
        {displayFile ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              // position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <iframe
              // className={filetype}
              width="100%"
              height="600"
              frameborder="0"
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            ></iframe>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <PdfIcon height={height} width={width} />
            <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
              {/* First 10 characters and .{fileExtension} */}
              {fileName.substring(0, 10)}...{fileName.split(".").pop()}
            </Typography>
          </Box>
        )}
      </Widget>
    </Box>
  );
});

const Audio = React.memo(({ src, width, height }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: width,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <audio
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: "auto",
          // Customized
          backgroundColor: theme.colors.background1,
          borderRadius: 6,
        }}
        src={src}
        width={width}
        height={height}
        controls
      />
    </Box>
  );
});

const Docx = React.memo(({ src, fileName, width, height, displayFile }) => {
  const Widget = styled("div")(({ theme }) => ({
    borderRadius: 6,
    width: width,
    maxWidth: "100%",
    margin: displayFile ? "auto" : "none",
    position: "relative",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.6)"
        : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)",
  }));
  return (
    <Box
      sx={
        {
          // width: "100%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }
      }
    >
      <Widget>
        <Box
          sx={
            {
              // width: "100%",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
            }
          }
        >
          {displayFile ? (
            <iframe
              width={width}
              height={height}
              frameborder="0"
              src={`https://docs.google.com/gview?url=${src}&embedded=true`}
            ></iframe>
          ) : (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <DocxIcon height={height} width={width} />
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "12px", width: "100%" }}
              >
                {fileName.substring(0, 10)}...{fileName.split(".").pop()}
              </Typography>
            </Box>
          )}
        </Box>
      </Widget>
    </Box>
  );
});

// xls
const Xls = React.memo(({ src, fileName, width, height, displayFile }) => {
  const Widget = styled("div")(({ theme }) => ({
    borderRadius: 6,
    maxWidth: "100%",
    margin: displayFile ? "auto" : "none",
    position: "relative",
    backgroundColor: displayFile ? theme.colors.textBackground : "transparent",
    backdropFilter: "blur(40px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Box
      sx={{
        // Should fit the parent container
        display: "flex",
        width: "100%",
      }}
    >
      <Widget>
        {displayFile ? (
          <iframe
            // className={filetype}
            width={width}
            height={height}
            frameborder="0"
            src={`https://docs.google.com/gview?url=${src}&embedded=true`}
          ></iframe>
        ) : (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <XlsIcon height={height} width={width} />
            <Typography variant="subtitle2" sx={{ fontSize: "12px" }} noWrap>
              {/* First 10 characters and .{fileExtension} */}
              {fileName.substring(0, 10)}...{fileName.split(".").pop()}
            </Typography>
          </Box>
        )}
      </Widget>
    </Box>
  );
});

const Ppt = React.memo(({ src, fileName, width, height, displayFile }) => {
  const Widget = styled("div")(({ theme }) => ({
    borderRadius: 6,
    maxWidth: "100%",
    margin: displayFile ? "auto" : "none",
    position: "relative",
    backgroundColor: displayFile ? theme.colors.textBackground : "transparent",
    backdropFilter: "blur(40px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Widget>
        {displayFile ? (
          <iframe
            // className={filetype}
            width={width}
            height={height}
            frameborder="0"
            src={`https://docs.google.com/gview?url=${src}&embedded=true`}
          ></iframe>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <PptIcon height={height} width={width} />
            <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
              {/* First 10 characters and .{fileExtension} */}
              {fileName.substring(0, 10)}...{fileName.split(".").pop()}
            </Typography>
          </Box>
        )}
      </Widget>
    </Box>
  );
});

module.exports = {
  ImageComponent,
  Video,
  Pdf,
  Audio,
  Docx,
  Xls,
  Ppt,
};
