import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import {
  ImageComponent,
  Video,
  Pdf,
  Audio,
  Docx,
  Xls,
  Ppt,
  OtherFile,
} from "../../../assets/ExtraComponents";

const FileComponent = ({ file, height, width, controls, displayFile }) => {
  if (file) {
    if (file.fileType) {
      if (file.fileType.includes("image")) {
        return (
          <ImageComponent
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            height={height ? height : 40}
            displayFile={displayFile}
          />
        );
      } else if (file.fileType.includes("video")) {
        return (
          <Video
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (file.fileType.includes("application/pdf")) {
        return (
          <Pdf
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (file.fileType.includes("audio")) {
        return (
          <Audio
            height={height ? height : 130}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 230}
          />
        );
      } else if (
        file.fileType.includes(
          "vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        return (
          <Box>
            <Docx
              height={height ? height : 40}
              src={file.fileUrl}
              fileName={file.fileName}
              width={width ? width : 40}
              displayFile={displayFile}
            />
          </Box>
        );
      } else if (file.fileType.includes("application/msword")) {
        return (
          <Docx
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (file.fileType.includes("application/vnd.ms-excel")) {
        return (
          <Xls
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (
        file.fileType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        return (
          <Xls
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (file.fileType.includes("application/vnd.ms-powerpoint")) {
        return (
          <Ppt
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else if (
        file.fileType.includes(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
      ) {
        return (
          <Ppt
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      } else {
        return (
          <OtherFile
            height={height ? height : 40}
            src={file.fileUrl}
            fileName={file.fileName}
            width={width ? width : 40}
            displayFile={displayFile}
          />
        );
      }
    }
  }
};

export default FileComponent;
