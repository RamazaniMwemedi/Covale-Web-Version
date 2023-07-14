import React, { ChangeEvent, FC, RefObject, useRef, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import WorktLeft from "../components/work/WorkLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";

import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector } from "react-redux";
import { RootState, ThemeInterface } from "../../interfaces/myprofile";
import { AddEventIcon, ImageIcon } from "../../assets/Icons";
const Events = () => {
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state: RootState) => state.user);
  const theme: ThemeInterface = useTheme();
  const [buttonIndex, setButtonIndex] = useState(0);
  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            bgcolor: theme.colors.background,
          }}
        >
          <CssBaseline />
          {userStore.user ? (
            <>
              <DrawerComponent />
              <WorktLeft />
              <Box
                sx={{
                  // display: "grid",
                  //   gridTemplateColumns: "55% 45%", // set explicit column widths
                  // gridTemplateRows: "auto", // set the row height to auto
                  // gap: "1rem",
                  width: "90%",
                  ml: -7,
                  pt: 2,
                  // ml: 7,
                  //   "@media screen and (max-width: 1400px)": {
                  //     gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
                  //     placeItems: "center",
                  //   },
                }}
              >
                <Box height={"95vh"} overflow={"hidden"}>
                  <Box
                    sx={{
                      position: "sticky",
                      top: 0,
                    }}
                  >
                    <Typography variant="h5"> Events</Typography>
                    <br />
                    <Box display="flex" gap={7}>
                      <CreateEventDialog />
                      <Box display={"flex"} gap={1}>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{
                            bgcolor:
                              buttonIndex === 0
                                ? (theme) => theme.palette.secondary.main
                                : theme.colors.background1,
                            "&:hover": {
                              bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            textTransform: "none",
                            borderRadius: 2.5,
                          }}
                          size="small"
                          onClick={() => setButtonIndex(0)}
                        >
                          Upcoming
                        </Button>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{
                            bgcolor:
                              buttonIndex === 1
                                ? (theme) => theme.palette.secondary.main
                                : theme.colors.background1,
                            "&:hover": {
                              bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            textTransform: "none",
                            borderRadius: 2.5,
                          }}
                          size="small"
                          onClick={() => setButtonIndex(1)}
                        >
                          Invitations
                        </Button>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{
                            bgcolor:
                              buttonIndex === 2
                                ? (theme) => theme.palette.secondary.main
                                : theme.colors.background1,
                            "&:hover": {
                              bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            textTransform: "none",
                            borderRadius: 2.5,
                          }}
                          size="small"
                          onClick={() => setButtonIndex(2)}
                        >
                          Host
                        </Button>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{
                            bgcolor:
                              buttonIndex === 3
                                ? (theme) => theme.palette.secondary.main
                                : theme.colors.background1,
                            "&:hover": {
                              bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            textTransform: "none",
                            borderRadius: 2.5,
                          }}
                          size="small"
                          onClick={() => setButtonIndex(3)}
                        >
                          Past
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  <br />
                  <Divider />
                  <EventStatus status={buttonIndex} />
                </Box>
              </Box>{" "}
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </>
  );
};

export default Events;

const EventStatus: FC<{ status: number }> = ({ status }) => {
  if (status === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
        }}
        key={status}
      >
        <Typography variant="h4">Upcoming Events</Typography>
        {Array.from({ length: 100 }).map((_, i) => (
          <Typography variant="h5" key={i}>
            {i}
          </Typography>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  } else if (status === 1) {
    return (
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
        }}
        key={status}
      >
        <Typography variant="h4">Invited Events</Typography>
        {Array.from({ length: 100 }).map((_, i) => (
          <Typography variant="h5" key={i}>
            {i}
          </Typography>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  } else if (status === 2) {
    return (
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
        }}
        key={status}
      >
        <Typography variant="h4">Host Events</Typography>
        {Array.from({ length: 100 }).map((_, i) => (
          <Typography variant="h5" key={i}>
            {i}
          </Typography>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  } else if (status === 3) {
    return (
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
        }}
        key={status}
      >
        <Typography variant="h4">Past Events</Typography>
        {Array.from({ length: 100 }).map((_, i) => (
          <Typography variant="h5" key={i}>
            {i}
          </Typography>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "scroll",
      }}
      key={status}
    >
      <Typography variant="h4">Upcoming Events</Typography>
      {Array.from({ length: 100 }).map((_, i) => (
        <Typography variant="h5" key={i}>
          {i}
        </Typography>
      ))}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Box>
  );
};

function CreateEventDialog() {
  const [open, setOpen] = React.useState(true);
  const theme: ThemeInterface = useTheme();
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [startEventDate, setStartEventDate] = useState<Date | undefined>();
  const [endEventDate, setEndEventDate] = useState<Date | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageFileRef = useRef<HTMLInputElement | null>(null);

  const handleEventImageChange = (): void => {
    if (imageFileRef.current?.files && imageFileRef.current.files[0]) {
      const file = imageFileRef.current.files[0];
      setImageFile(file);
    }
  };

  const handleStartEventDateChange = (date: Date | null | undefined): void => {
    if (date) setStartEventDate(date);
  };

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEventName(event.target.value);
  };

  const handleEndEventDateChange = (date: Date | null | undefined): void => {
    if (date) setEndEventDate(date);
  };

  const handleEventDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEventDescription(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        color="inherit"
        sx={{
          textTransform: "none",
          borderRadius: 3,
          bgcolor: theme.colors.background1,
          "&:hover": {
            bgcolor: (theme) => theme.palette.secondary.main,
          },
        }}
        endIcon={<AddEventIcon height={30} width={30} />}
        onClick={handleClickOpen}
      >
        Create New Event
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(6px)",
        }}
      >
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <CreateEventStep1
            eventName={eventName}
            handleEventNameChange={handleEventNameChange}
            endEventDate={endEventDate}
            eventDescription={eventDescription}
            handleEndEventDateChange={handleEndEventDateChange}
            handleEventDescriptionChange={handleEventDescriptionChange}
            handleEventImageChange={handleEventImageChange}
            handleStartEventDateChange={handleStartEventDateChange}
            imageFile={imageFile}
            imageFileRef={imageFileRef}
            startEventDate={startEventDate}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            size="small"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
interface CreateEventStep1Props {
  eventName: string;
  eventDescription: string;
  startEventDate: Date | undefined;
  endEventDate: Date | undefined;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
  imageFile: File | null;
  handleEventImageChange: () => void;
  handleStartEventDateChange: (date: Date | null | undefined) => void;
  handleEventNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndEventDateChange: (date: Date | null | undefined) => void;
  handleEventDescriptionChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
const CreateEventStep1: FC<CreateEventStep1Props> = ({
  eventName,
  handleEventNameChange,
  endEventDate,
  eventDescription,
  handleEndEventDateChange,
  handleEventDescriptionChange,
  handleEventImageChange,
  handleStartEventDateChange,
  imageFile,
  imageFileRef,
  startEventDate,
}) => {
  const theme: ThemeInterface = useTheme();
  return (
    <Box p={3}>
      <Box
        component="form"
        display={"flex"}
        flexDirection={"column"}
        autoComplete="off"
      >
        <Typography variant="h5">Event Details</Typography>
        <br />
        {/* Add your input fields and components that use the props */}
        <TextField
          required
          id="outlined-required"
          type="text"
          value={eventName}
          onChange={handleEventNameChange}
          label="Event name"
          defaultValue="Hello World"
          color="secondary"
          size="small"
          sx={{
            width: 500,
          }}
        />
        <br />
        <Box
          sx={{
            height: 100,
            width: 500,
            bgcolor: theme.colors.background1,
            display: "grid",
            placeItems: "center",
            // p: 3,
            borderRadius: 2,
          }}
        >
          <input
            style={{
              display: "none",
            }}
            type="file"
            ref={imageFileRef}
            onChange={handleEventImageChange}
          />
          <Button
            variant="contained"
            color="inherit"
            sx={{
              textTransform: "none",
              borderRadius: 1,
              bgcolor: theme.colors.background1,
              "&:hover": {
                bgcolor: (theme) => theme.palette.action.focus,
              },
            }}
            size="small"
            endIcon={<ImageIcon width={20} height={20} />}
          >
            Upload Cover Photo
          </Button>
        </Box>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start date"
            value={startEventDate}
            onChange={(date) => {
              handleStartEventDateChange(date);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                sx={{ width: 500 }}
                helperText={params?.inputProps?.placeholder}
              />
            )}
          />
          <br />
          <DateTimePicker
            label="End date"
            value={endEventDate}
            onChange={(date) => {
              handleEndEventDateChange(date);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                sx={{ width: 500 }}
                helperText={params?.inputProps?.placeholder}
              />
            )}
          />
        </LocalizationProvider>
        <br />
        <TextField
          id="outlined-textarea"
          label="Description"
          placeholder="Describe your event"
          multiline
          maxRows={4}
          value={eventDescription}
          onChange={handleEventDescriptionChange}
          sx={{ width: 500 }}
          color="secondary"
        />
        <br />
        <Button
          variant="contained"
          color="inherit"
          sx={{
            textTransform: "none",
            borderRadius: 1,
            bgcolor: theme.colors.background1,
            "&:hover": {
              bgcolor: (theme) => theme.palette.action.focus,
            },
            width: 200,
          }}
          size="small"
          endIcon={<ImageIcon width={20} height={20} />}
        >
          Add event schedule
        </Button>
      </Box>
    </Box>
  );
};
