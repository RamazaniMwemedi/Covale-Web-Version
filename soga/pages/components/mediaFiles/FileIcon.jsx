import {
  AudioIcon,
  ImageIcon,
  PdfIcon,
  VideoIcon,
  DocxIcon,
  XlsIcon,
  PptIcon,
  File,
} from "../../../assets/Icons";

const FileIcone = ({ fileType, height, width }) => {
  if (fileType) {
    if (fileType.includes("image")) {
      return (
        <ImageIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("video")) {
      return (
        <VideoIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("application/pdf")) {
      return (
        <PdfIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("application/msword")) {
      return (
        <DocxIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      return (
        <DocxIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("application/vnd.ms-excel")) {
      return (
        <XlsIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      return (
        <XlsIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("application/vnd.ms-powerpoint")) {
      return (
        <PptIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      )
    ) {
      return (
        <PptIcon height={height ? height : 25} width={width ? width : 25} />
      );
    } else if (fileType.includes("audio")) {
      return (
        <AudioIcon height={height ? height : 25} width={width ? width : 25} />
      );
    }
    return <File height={height ? height : 25} width={width ? width : 25} />;
  }
};

export default FileIcone;
