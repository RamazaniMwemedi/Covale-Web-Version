// A function which will determine the type of gile and returns the appropriate fileType e.g. image, video, audio, document, xls, ppt, pdf, zip, etc

export const getFileType = (fileType) => {
  if (fileType.includes("image")) {
    return "Image";
  } else if (fileType.includes("video")) {
    return "Video";
  } else if (fileType.includes("audio")) {
    return "Audio";
  } else if (
    fileType.includes(
      "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        "msword" ||
        "vnd.oasis.opendocument.text" ||
        "vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    return "Document";
  } else if (
    fileType.includes(
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        "vnd.ms-excel" ||
        "vnd.oasis.opendocument.spreadsheet"
    )
  ) {
    return "Xls";
  } else if (
    fileType.includes(
      "vnd.openxmlformats-officedocument.presentationml.presentation" ||
        "vnd.ms-powerpoint" ||
        "vnd.oasis.opendocument.presentation"
    )
  ) {
    return "Ppt";
  } else if (fileType.includes("pdf")) {
    return "Pdf";
  } else if (
    fileType.includes(
      "zip" ||
        "x-rar-compressed" ||
        "x-7z-compressed" ||
        "x-tar" ||
        "x-gzip" ||
        "x-bzip" ||
        "x-bzip2" ||
        "x-lzma" ||
        "x-xz" ||
        "x-apple-diskimage"
    )
  ) {
    return "Zip";
  } else {
    return "File";
  }
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds";
};
export default { getFileType, timeAgo };
