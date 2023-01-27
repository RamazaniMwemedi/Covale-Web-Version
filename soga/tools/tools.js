// A function which will determine the type of gile and returns the appropriate fileType e.g. image, video, audio, document, xls, ppt, pdf, zip, etc

const getFileType = (fileType) => {
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

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

module.exports = { getFileType, timeAgo };
