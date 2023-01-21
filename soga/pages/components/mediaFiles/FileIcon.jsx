import {
  AudioIcon,
  ImageIcon,
  PdfIcon,
  VideoIcon,
  DocxIcon,
  XlsIcon,
  PptIcon,
} from "../../../assets/Icons";

const FileIcone = ({ fileType }) => {
  if (fileType) {
    if (fileType.includes("image")) {
      return <ImageIcon height={25} width={25} />;
    } else if (fileType.includes("video")) {
      return <VideoIcon height={25} width={25} />;
    } else if (fileType.includes("application/pdf")) {
      return <PdfIcon height={25} width={25} />;
    } else if (fileType.includes("application/msword")) {
      return <DocxIcon height={25} width={25} />;
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      return <DocxIcon height={25} width={25} />;
    } else if (fileType.includes("application/vnd.ms-excel")) {
      return <XlsIcon height={25} width={25} />;
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      return <XlsIcon height={25} width={25} />;
    } else if (fileType.includes("application/vnd.ms-powerpoint")) {
      return <PptIcon height={25} width={25} />;
    } else if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      )
    ) {
      return <PptIcon height={25} width={25} />;
    } else if (fileType.includes("audio")) {
      return <AudioIcon height={25} width={25} />;
    }
    return "Hello";
  }
};

export default FileIcone;
