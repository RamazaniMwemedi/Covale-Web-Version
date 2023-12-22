import Image from "next/image";
import { FC } from "react";
export const PdfIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image src="/icons/pdf.png" width={width} height={height} alt="PDF" />;

export const ImageIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image src="/icons/photo.png" width={width} height={height} alt="Image" />
);

export const VideoIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image src="/icons/video.png" width={width} height={height} alt={"Video"} />
);

export const ExeIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image src="/icons/exe.png" width={width} height={height} alt="exe" />;

export const AudioIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image src="/icons/audi.pngo" width={width} height={height} alt="Audion" />
);

export const DocxIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image src="/icons/docs.png" width={width} height={height} alt="Docx" />;

export const TxtIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image src="/icons/txt.png" width={width} height={height} alt="Txt" />;

export const CsvIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image src="/icons/csv.png" width={width} height={height} alt="Csv" />;

export const XlsIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image width={width} height={height} src="/icons/xls.png" alt="Xls" />;

// ppt
export const PptIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image width={width} height={height} src="/icons/ppt.png" alt="Ppt" />;

export const File: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image width={width} height={height} src="/icons/file.png" alt="File" />;
export const FileIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image width={width} height={height} alt="FileIcon" src="/icons/file.png" />
);

export const OrganizationIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="Organization"
    src="/icons/organization.png"
  />
);

export const PersonalInfoIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="PersonalInfoIcon"
    src="/icons/person_id.png"
  />
);

export const PrivacyIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="PrivacyIcon"
    src="/icons/padlock.png"
  />
);

export const UserShieldIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="UserShieldIcon"
    src="/icons/shield.png"
  />
);
export const UserIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image width={width} height={height} alt="UserIcon" src="/icons/user.png" />
);
export const GroupIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image width={width} height={height} alt="GroupIcon" src="/icons/group.png" />
);

export const GraduetionCap: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="GraduetionCap"
    src="/icons/gradueation_cap.png"
  />
);

export const EventIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image width={width} height={height} alt="EventIcon" src="/icons/event.png" />
);

export const PrizeIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image width={width} height={height} alt="PrizeIcon" src="/icons/prize.png" />
);

export const HappySmileIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="Happy Smile"
    src="/icons/happy_smile.png"
  />
);

export const ThumbsUpIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="ThumbsUpIcon"
    src="/icons/thumb_up.png"
  />
);

export const HeartIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="ThumbsUpIcon"
    src="/icons/heart.png"
  />
);
export const CelebrateIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    width={width}
    height={height}
    alt="ThumbsUpIcon"
    src="/icons/celebrate.png"
  />
);
export const BulbIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image alt="Bulb Icon" width={width} height={height} src="/icons/bulb.png" />
);
export const ThinkinhFaceIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    alt="Think Face"
    width={width}
    height={height}
    src="/icons/think_face.png"
  />
);
export const HandHoldingHeartIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => <Image alt="Care" width={width} height={height} src="/icons/care.png" />;
export const FunnyIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    alt="Funny Face"
    width={width}
    height={height}
    src="/icons/funny.png"
  />
);
export const DashboardIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    alt="DashboardIcon"
    width={width}
    height={height}
    src="/icons/dashboard.png"
  />
);
export const BookMarkIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image alt="BookMark" width={width} height={height} src="/bookMark.png" />
);
export const BriefCaseIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    alt="Breifcase"
    width={width}
    height={height}
    src="/icons/brieftcase.png"
  />
);
export const AddEventIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <Image
    alt="AddEvent"
    width={width}
    height={height}
    src="/icons/add_event.png"
  />
);

export const RepostIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    // class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
  >
    <g>
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
    </g>
  </svg>
);
