export interface RootState {
  user: {
    user: {
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
    } | null;
  };
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
  firstname: string;
  lastname: string;
  username: string;
  professionalSummary: string;
  profilePic: {
    fileUrl: string;
  };
}
export interface CropperImageInterface {
    file: File;
    fileName: string;
    fileUrl: string;
    fileUri: string;
    fileType: string;
    fileSize: number;
  };
export interface CroppImageAvatarProp {
  image:CropperImageInterface;
  croppedImageReady: (file: File) => void;
  onCloseHandler: () => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}

export interface CropeImaageDialogProp {
  image:CropperImageInterface;
  onCloseHandler: () => void;
  croppedImageReady: (file: File) => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}
export interface FullWidthTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
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
