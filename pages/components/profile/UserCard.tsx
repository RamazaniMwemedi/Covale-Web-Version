import {
  Avatar,
  Button,
  DialogActions,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Badge from "@mui/material/Badge";
import { useTheme } from "@mui/styles";
import { purple } from "@mui/material/colors";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Dialog from "@mui/material/Dialog";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Cropper from "react-easy-crop";

import getCroppedImg from "../../../image/croppedImg";
import { addProfilePic } from "../../../services/user";
import { updateProfilePicture } from "../../../Redux/slices/user";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";

interface ProfilePic {
  file: File;
  fileName: string;
  fileUrl: string | ArrayBuffer | null | undefined;
  fileUri: string | ArrayBuffer | null;
  fileType: string;
  fileSize: number;
}
interface UserCardProp {
  user: {
    firstname: string;
    lastname: string;
    username: string;
    profilePic: {
      fileUrl: string;
    };
  };
}

const UserCard = ({ user }: UserCardProp) => {
  const profileFileInput = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<ProfilePic | null>(null);

  const dispatch = useDispatch();
  const theme: any = useTheme();
  const token = useCheckLogedinUserToken();
  const handleChoseProfile = () => {
    profileFileInput.current?.click();
    setOpen(true);
  };
  const croppedImageReady = async (file: File): Promise<void> => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      const newProfilePic = await addProfilePic(token, formData);
      dispatch(updateProfilePicture(newProfilePic));
    }
  };

  const handleSelectProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected File :>>", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic({
          file: file,
          fileName: file.name,
          fileUrl: reader.result,
          fileUri: reader.result,
          fileType: file.type,
          fileSize: file.size,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onCloseHandler = () => {
    setOpen(false);
    setProfilePic(null);
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            position: "relative",
          }}
        >
          {open && (
            <CropeImageDialog
              rounded={true}
              image={profilePic}
              onCloseHandler={onCloseHandler}
              croppedImageReady={croppedImageReady}
              caption="Update Profile Photoe"
              aspect={1}
            />
          )}
          {/* Avatar */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                sx={{
                  bgcolor: theme.colors.textBackground,
                }}
                onClick={handleChoseProfile}
              >
                {" "}
                <input
                  type="file"
                  hidden
                  ref={profileFileInput}
                  accept="image/*"
                  onChange={handleSelectProfilePic}
                />
                <CameraAltRoundedIcon color="action" />
              </IconButton>
            }
          >
            <Avatar
              sx={{
                width: 150,
                height: 150,
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              }}
              src={user.profilePic.fileUrl}
            >
              {user.firstname[0]} {user.lastname[0]}{" "}
            </Avatar>{" "}
          </Badge>

          {/* Name, and proffesional sumary */}
          <Box>
            <Typography variant="h4">
              {user.firstname} {user.lastname}{" "}
            </Typography>
            <Typography variant="body2">@{user.username}</Typography>
          </Box>
          <Button
            sx={{
              position: "absolute",
              bottom: 10,
              right: 30,
              height: "30px",
              textTransform: "unset",
              display: "flex",
              bgcolor: purple[500],
              gap: 1,
            }}
            variant="contained"
            size="small"
            color="secondary"
          >
            <ModeEditRoundedIcon fontSize="small" /> Edit profile
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserCard;

interface CroppImageAvatarProp {
  image: ProfilePic;
  croppedImageReady: (file: File) => void;
  onCloseHandler: () => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}
const CroppImageAvatar = ({
  image,
  croppedImageReady,
  onCloseHandler,
  rounded,
  caption,
  aspect,
}: CroppImageAvatarProp) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const theme: any = useTheme();

  const onCropChange = (crop: { x: number; y: number }): void => {
    setCrop(crop);
  };

  const onCropComplete = React.useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image.fileUrl,
        croppedAreaPixels
      );
      if (croppedImage) croppedImageReady(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);
  const onZoomChange = (zoom: number): void => {
    setZoom(zoom);
  };

  return (
    <Box>
      <Box
        sx={{
          height: 500,
          width: 200,
        }}
      >
        <Cropper
          image={image.fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={rounded ? "round" : "rect"}
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </Box>{" "}
      <Box sx={{ width: "90%", ml: 4 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomOutIcon />
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            color="secondary"
            onChange={(e, zoom: number) => onZoomChange(zoom)}
          />

          <ZoomInIcon />
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          bgcolor: theme.colors.background1,
          zIndex: 1,
          padding: 1,
        }}
      >
        <Button
          onClick={() => {
            showCroppedImage();
            onCloseHandler();
          }}
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "unset",
          }}
        >
          {caption}
        </Button>
        <Button
          sx={{
            textTransform: "unset",
          }}
          color="secondary"
          variant="outlined"
          onClick={onCloseHandler}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

interface CropeImaageDialogProp {
  image: ProfilePic;
  onCloseHandler: () => void;
  croppedImageReady: (file: File) => void;
  rounded: boolean;
  caption: string;
  aspect: number;
}
export function CropeImageDialog({
  image,
  onCloseHandler,
  croppedImageReady,
  rounded,
  caption,
  aspect,
}: CropeImaageDialogProp) {
  return (
    <React.Fragment>
      {image && (
        <Dialog fullWidth={true} maxWidth="md" open={true}>
          <CroppImageAvatar
            image={image}
            croppedImageReady={croppedImageReady}
            onCloseHandler={onCloseHandler}
            rounded={rounded}
            caption={caption}
            aspect={aspect}
          />
        </Dialog>
      )}
    </React.Fragment>
  );
}
