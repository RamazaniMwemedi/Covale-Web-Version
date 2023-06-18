import { SelectChangeEvent } from "@mui/material";
import { MomentInput } from "moment";
import { PostInterface } from "./work";

export interface RootState {
  user: {
    user: UserInterFace
  };
  work:{
    work:{
      posts:PostInterface[]
    }
  }
  keyPairs:{
    keyPairs:KeysSchema[]
  }
}
interface KeysSchema {
  privateKey: string;
  publicKey: string;
  generatedAt: Date;
  generatedByUserId:string;
  generatedForModel: string;
  modelId: string;
}

export interface ThemeInterface {
  typography: {
    fontFamily: string;
  };
  palette: {
    mode: string;
  };
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
      firstname: string;
      lastname: string;
      username: string;
      professionalSummary: string;
      profilePic: {
        fileUrl: string;
      };
      coverPic: {
        fileUrl: string;
      };
      colleagues:{
      username: string;
      firstname: string;
      lastname: string;
      id: string;
      profilePic: { fileUrl: string };
    }[];
      files:FileObject[];
      workExperiences: [
        {
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
      ];
    } 

export interface CropperImageInterface {
  file: File | null;
  fileName: string;
  fileUrl: string;
  fileUri: string;
  fileType: string;
  fileSize: number;
  id?:string
}
export interface FileObject{
  albumName:string,
  file:CropperImageInterface
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
