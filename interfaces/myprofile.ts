import { Breakpoints, SelectChangeEvent, Theme } from "@mui/material";
import { MomentInput } from "moment";

export interface RootState {
  user: {
    user: UserInterFace;
  };
  work: {
    work: {};
  };
  keyPairs: {
    keyPairs: KeysSchema[];
  };
  chats: {
    chats: ChatInterface[];
  };
  teams: {
    teams: TeamInterface[];
  };
  projects: { projects: ProjectInterface[] };
  colleagues: { colleagues: { explore: UserInterFace[] } };
  notifications: {
    notifications: NotificationInterface[];
  };
}
interface KeysSchema {
  privateKey: string;
  publicKey: string;
  generatedAt: Date;
  generatedByUserId: string;
  generatedForModel: string;
  modelId: string;
}

export interface ThemeInterface extends Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    background: string;
    background1: string;
    textBackground: string;
    textBackground2: string;
    itemBackground: string;
    drawerBackground: string;
    border: string;
    hoverDate: string;
    background2: string;
    meetBackground: string;
  };
  themeChengeHandler: (theme: string) => void;
  // breakpoints: Breakpoints;
  // transitions: TransitionsOptions;
  // spacing: (val: number) => number;
}

export interface ProfilePic {
  file: File;
  fileName: string;
  fileUrl: string | ArrayBuffer | null;
  fileUri: string | ArrayBuffer | null;
  fileType: string;
  fileSize: number;
}
export interface UserInterFace {
  id: string;
  token: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: string;
  gender: string;
  email: string;
  chatId: string;
  professionalSummary: string;
  profilePic: {
    fileUrl: string;
  };
  coverPic: {
    fileUrl: string;
  };
  files: FileObject[];
  workExperiences: {
    title: string;
    organizationName: string;
    location: string;
    employmentType: string;
    jobDescription: string;
    isUntillNow: boolean;
    startDate: Date;
    endDate: Date;
    locationType: string;
    id: string;
  }[];
  educationAndCertificates: {
    type: "education" | "certificate",
    details: {
      schoolName: string,
      degree: string,
      fieldOfStudy: string,
      certificateName: string,
      isUntillNow: boolean,
      startDate: Date,
      endDate: Date,
      skills: string[],
      media: {
        sourceUrl: string,
        title: string,
        thumbnail: string,
        description: string,
        file: File,
      },
    },
  }[]
  colleagues: UserInterFace[];
  chats: {
    id: string;
    colleague: string;
    createdBY: string;
  }[];
  teams: {
    id: string;
    teamName: string;
    createdAt: string;
    members: string[];
    projects: string[];
  }[];
}

export interface CropperImageInterface {
  file: File | null;
  fileName: string;
  fileUrl: string;
  fileUri: string;
  fileType: string;
  fileSize: number;
  id?: string;
}
export interface FileObject {
  albumName: string;
  file: CropperImageInterface;
}
export interface CroppImageAvatarProp {
  image: CropperImageInterface;
  croppedImageReady: (file: File) => void;
  onCloseHandler: () => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}

export interface CropeImaageDialogProp {
  image: CropperImageInterface;
  onCloseHandler: () => void;
  croppedImageReady: (file: File) => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}
export interface FullWidthTabsProps {
  value: number;
  handleChange: (newValue: number) => void;
  handleChangeIndex: (index: number) => void;
}

export interface ContentsProps {
  value: number;
  handleChangeIndex: (index: number) => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
export interface CardWithAvatarAndDateProps {
  subTitle: string;
  avatarSrc?: string;
  title: string;
  jobDescription: string;
  isUntillNow: Boolean;
  startDate: Date;
  endDate: Date;
}
export interface FormDialogProp {
  professionalSumm: string;
  errorMessage: string;
  open: boolean;
  error: boolean;
  saving: boolean;
  handleClose: () => void;
  handleSaveChange: () => void;
  professionalSummChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface AddNewWorkExperinceProp {
  open: boolean;
  saving: boolean;
  isUntillNow: boolean;
  handleClose: () => void;
  handleSaveChange: () => void;
  untilNowHandler: () => void;
  error: boolean;
  errorMessage: string;
  titleValue: string;
  location: string;
  locationTypeValue: string;
  employmentTypeValue: string;
  jobDescriptionValue: string;
  onEmplymentTypeValueChange: (e: SelectChangeEvent<string>) => void;
  onLocationTypeValueChange: (e: SelectChangeEvent<string>) => void;
  onJobDescriptionValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onLocationValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTitleValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  organizationName: string;
  onOrganizationNameValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  startDate: MomentInput;
  onStartDateValueChange: (newEndDate: MomentInput) => void;
  endDate: MomentInput;
  onEndDateValueChange: (newEndDate: MomentInput) => void;
}

export interface WorkExperienceDialogProp {
  title: string;
  organizationName: string;
  location: string;
  employmentType: string;
  jobDescription: string;
  isUntillNow: boolean;
  startDate: Date;
  endDate: Date;
  open: boolean;
  locationType: string;
  id: string;
  closeDialogHandler: () => void;
}


export interface AddNewEducationAndCertificatesProp {
  open: boolean;
  saving: boolean;
  handleClose: () => void;
  handleSaveChange: () => void;
  untilNowHandler: () => void;
  error: boolean;
  errorMessage: string;
  type: "education" | "certificate";
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  certificateName: string;
  isUntillNow: boolean;
  startDate: MomentInput;
  endDate: MomentInput;
  skills: string[];
  sourceUrl: string;
  title: string;
  thumbnail: string;
  description: string;
  file: File | undefined;
  onTypeChange: (newType: "education" | "certificate") => void;
  onSchoolNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDegreeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFieldOfStudyChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCertificateNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onIsUntillNowChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartDateChange: (newStartDate: MomentInput) => void;
  onEndDateChange: (newEndDate: MomentInput) => void;
  onSkillsChange: (newSkills: string[]) => void;
  onSourceUrlChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTitleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onThumbnailChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDescriptionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (  file: File | undefined) => void;
}



export interface SelectWorkExperienceProp {
  title: string;
  organizationName: string;
  location: string;
  employmentType: string;
  jobDescription: string;
  isUntillNow: boolean;
  startDate: Date;
  endDate: Date;
  locationType: string;
  id: string;
}

export interface WorkExperience {
  title: string;
  organizationName: string;
  location: string;
  locationType: string;
  employmentType: string;
  jobDescription: string;
  isUntillNow: boolean;
  startDate: MomentInput;
  endDate: MomentInput;
  id: string;
}

export interface ChatInterface {
  id: string;
  colleagueUsername: string;
  colleagueProfilePic: {
    fileUrl: string;
  };
  messages: MessageInterface[];
  files: FileInterface[];
}

export interface MessageInterface {
  id: string;
  message: string;
  sentAt: string;
  sender: string;
  files: FileInterface[];
}

export interface FileInterface {
  fileName: string;
  fileUrl: string;
  fileUri: string;
  fileType: string;
}

export interface TeamInterface {
  id: string;
  teamName: string;
}

export interface ProjectInterface {
  id: string;
  subProjects: SubProjectsInterface[];
}

export interface SubProjectsInterface {
  id: string;
  tasks: {}[];
}

export interface NotificationInterface {
  id: string;
  read: boolean;
  category: "chats" | "work" | "project" | "callendar" | "meetings";
  subject: string;
  preview: string;
  token: string;
  time: string;
  priority: string;
  type: string;
}
