import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

import { updateProfessionalSum } from "../../../services/user";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { professionalSummaryUpdate } from "../../../Redux/slices/user";
import { RootState } from "../../../interfaces";

const Posts = ({}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "40% 60%", // set explicit column widths
        gridTemplateRows: "auto", // set the row height to auto
        gap: "1rem",
        width: "90%",
        ml: 7,
        "@media screen and (max-width: 800px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
        },
      }}
    >
      {/* Post Left */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Summary />
      </Box>
      {/* Post Right */}
      <Box
        sx={{
          width: "70%",
        }}
      >
        Rigtht
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i}>{i}</p>
        ))}
      </Box>
    </Box>
  );
};

export default Posts;
interface FormDialogProp {
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

const FormDialog = ({
  professionalSumm,
  open,
  handleClose,
  handleSaveChange,
  professionalSummChangeHandler,
  errorMessage,
  error,
  saving,
}: FormDialogProp) => {
  const theme: any = useTheme();

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Update Your Professional Summary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your updated Professional Summary (50-350 characters):
          </DialogContentText>
          <TextField
            sx={{
              width: "90%",
              backgroundColor: theme.colors.textBackground,
              borderStyle: "none",
              marginTop: 1,
            }}
            variant="outlined"
            size="small"
            color="secondary"
            margin="dense"
            id="professional-summary"
            label="Professional Summary"
            rows={4}
            fullWidth
            multiline
            inputProps={{ minLength: 50, maxLength: 350 }}
            value={professionalSumm}
            onChange={professionalSummChangeHandler}
            error={error}
            helperText={errorMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "none",
            }}
            color="inherit"
            onClick={handleClose}
            size="small"
          >
            Cancel
          </Button>
          {saving ? (
            <LoadingButton
              loading
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"
            />
          ) : (
            <Button
              color="secondary"
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              onClick={handleSaveChange}
              size="small"
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
const Summary = () => {
  const theme: any = useTheme();

  const ProfessionalSummary = () => {
    // FormDialog states and handler
    const [open, setOpen] = useState<boolean>(false);
    useState("");
    const handleClickOpen = () => {
      setOpen(true);
    };
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const token = useCheckLogedinUserToken();
    const [professionalSumm, setProfessionalSumm] = useState("");
    const professionalSummChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setProfessionalSumm(e.target.value);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleSaveChange = async () => {
      if (professionalSumm.length < 50) {
        setError(true);
        setErrorMessage("Professional summary must be at least 50 characters.");
      } else {
        // save the changes
        setSaving(true);
        setErrorMessage("");
        const response = await updateProfessionalSum(token, professionalSumm);
        if (response) {
          dispatch(professionalSummaryUpdate(response));
          setOpen(false);
          setError(false);
          handleClose();
        }
      }
    };

    const userStore = useSelector((state: RootState) => state.user);
    const user = userStore?.user;
    if (user) {
      return (
        <Box
          sx={{
            bgcolor: theme.colors.textBackground2,
            p: 1,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              Professional Summary
            </Typography>
            <Box>
              <IconButton onClick={handleClickOpen} size="small">
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <br />
          {user.professionalSummary.length < 1 && (
            <Typography
              variant="caption"
              sx={{
                ml: 5,
              }}
            >
              Click the{" "}
              <EditRoundedIcon
                sx={{
                  fontSize: "13px",
                }}
              />{" "}
              to add your Professional Summary
            </Typography>
          )}
          <Typography variant="body2">
            {user.professionalSummary.split(`\n`).map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </Typography>
          <FormDialog
            handleClose={handleClose}
            handleSaveChange={handleSaveChange}
            open={open}
            professionalSumm={professionalSumm}
            professionalSummChangeHandler={professionalSummChangeHandler}
            errorMessage={errorMessage}
            error={error}
            saving={saving}
          />
        </Box>
      );
    }
    return <></>;
  };
  const WorkExperience = () => {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Work Experience
          </Typography>
          <Box>
            <IconButton size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardWithAvatarAndDate
          title={"Advanced ICT Trainer"}
          subTitle="Solidarity Initiative For Refugees"
          avatarSrc="https://media.licdn.com/dms/image/C4D0BAQHe8fL22aVodQ/company-logo_100_100/0/1582888548679?e=1689206400&v=beta&t=Nzog9TlPB8ENkGEplWXt1OfB6MEplO9t0rc0cF1KzlQ"
          startDate={new Date("11/01/2023")}
          endDate={new Date("11/01/2025")}
        />
        <CardWithAvatarAndDate
          title={"Advanced ICT Trainer"}
          subTitle="Solidarity Initiative For Refugees"
          avatarSrc="https://media.licdn.com/dms/image/C4D0BAQHe8fL22aVodQ/company-logo_100_100/0/1582888548679?e=1689206400&v=beta&t=Nzog9TlPB8ENkGEplWXt1OfB6MEplO9t0rc0cF1KzlQ"
          startDate={new Date("11/01/2023")}
          endDate={new Date("11/01/2025")}
        />
      </Box>
    );
  };
  const EducationAndCertificates = () => {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Education and Certificates
          </Typography>
          <Box>
            <IconButton size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardWithAvatarAndDate
          title={"University of the People"}
          subTitle="BS Computer Science, Front end engineer"
          avatarSrc="https://th.bing.com/th/id/R.07095f38f56b752bd8ff8a159f634478?rik=N%2fu22PtUr2kf9A&pid=ImgRaw&r=0"
          startDate={new Date("11/01/2020")}
          endDate={new Date("11/01/2025")}
        />
      </Box>
    );
  };
  return (
    <Box
      sx={{
        bgcolor: theme.colors.background1,
        p: 1,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
        }}
      >
        Summary
      </Typography>
      {/* Professional Summary */}
      <ProfessionalSummary />
      <br />
      {/* Work Experience  */}
      <WorkExperience />
      <br />
      {/* Education And Certificates */}
      <EducationAndCertificates />
    </Box>
  );
};

interface CardWithAvatarAndDateProps {
  title: string;
  subTitle: string;
  avatarSrc: string;
  startDate: Date;
  endDate: Date;
}

const CardWithAvatarAndDate = ({
  title,
  subTitle,
  avatarSrc,
  startDate,
  endDate,
}: CardWithAvatarAndDateProps) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const years = duration.years();
  const months = duration.months();
  const formattedDuration = `${years} years and ${months} months`;
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        boxShadow: 1,
        mt: 3,
        borderRadius: 2,
        bgcolor: theme.colors.textBackground2,
        p: 1,
      }}
    >
      <Avatar
        src={avatarSrc}
        sx={{
          height: 50,
          width: 50,
        }}
      >
        {title[0]}
      </Avatar>
      <Box>
        <Typography variant="body1"> {title} </Typography>
        <Typography variant="body2"> {subTitle} </Typography>
        <Typography variant="caption">
          {moment(startDate).format("MMMM YYYY")}
          {` `}&middot; {moment(endDate).format("MMMM YYYY")}
        </Typography>
        <br />
        <Typography variant="caption">{formattedDuration}</Typography>
      </Box>
    </Box>
  );
};
