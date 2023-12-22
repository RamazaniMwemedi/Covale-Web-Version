import React, { ChangeEvent, FC, RefObject, useRef, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
  IconButton,
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
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

// My components
import DrawerComponent from "../components/others/DrawerComponent";
import WorktLeft from "../components/work/WorkLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";

import LoadingLogo from "../components/others/LoadingLogo";
import { useSelector } from "react-redux";
import { RootState, ThemeInterface } from "../../interfaces/myprofile";
import { AddEventIcon, ImageIcon } from "../../assets/Icons";
import { textTransform } from "@mui/system";
import moment from "moment";
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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

interface EventScheduleItem {
  scheduleItemTitle: string;
  startDateAndTime: number;
  endDateAndTime?: number;
  scheduleItemDescription: string;
}

function CreateEventDialog() {
  const [open, setOpen] = React.useState(true);
  const [step, setStep] = useState(0);
  const theme: ThemeInterface = useTheme();
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [startEventDate, setStartEventDate] = useState<number>(moment.now());
  const [endEventDate, setEndEventDate] = useState<number>(moment.now());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const [eventSchedules, setEventSchedules] = useState<EventScheduleItem[]>([]);
  const [isAdddingSchedule, setIsAdddingSchedule] = useState<boolean>(true);
  const handleEventImageChange = (): void => {
    if (imageFileRef.current?.files && imageFileRef.current.files[0]) {
      const file = imageFileRef.current.files[0];
      setImageFile(file);
    }
  };

  const handleStartEventDateChange = (date: number): void => {
    if (date) setStartEventDate(date);
  };

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEventName(event.target.value);
  };

  const handleEndEventDateChange = (date: number): void => {
    if (date) setEndEventDate(date);
  };

  const handleEventDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEventDescription(event.target.value);
  };

  const handleTogleIsAdddingSchedule = () => {
    setIsAdddingSchedule((p) => !p);
  };
  const addEventSchedule = (newEventSchedule: EventScheduleItem) => {
    setEventSchedules((prevEventSchedules) => [
      ...prevEventSchedules,
      newEventSchedule,
    ]);
  };
  const removeEventSchedule = (scheduleName: string) => {
    setEventSchedules((prevEventSchedules) =>
      prevEventSchedules.filter(
        (eventSchedule) => eventSchedule.scheduleItemTitle !== scheduleName
      )
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const steps = ["Event Details", "Location", "Event Settings"];

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
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>{" "}
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
            eventSchedules={eventSchedules}
            addEventSchedule={addEventSchedule}
            handleTogleIsAdddingSchedule={handleTogleIsAdddingSchedule}
            isAdddingSchedule={isAdddingSchedule}
            removeEventSchedule={removeEventSchedule}
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
            onClick={() => setStep((p) => p + 1)}
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
  isAdddingSchedule: boolean;
  eventDescription: string;
  startEventDate: number;
  endEventDate: number;
  eventSchedules: EventScheduleItem[];
  addEventSchedule: (newEventSchedule: EventScheduleItem) => void;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
  imageFile: File | null;
  handleTogleIsAdddingSchedule: () => void;
  handleEventImageChange: () => void;
  handleStartEventDateChange: (date: number) => void;
  handleEventNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndEventDateChange: (date: number) => void;
  handleEventDescriptionChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  removeEventSchedule: (scheduleName: string) => void;
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
  addEventSchedule,
  eventSchedules,
  isAdddingSchedule,
  handleTogleIsAdddingSchedule,
  removeEventSchedule,
}) => {
  const theme: ThemeInterface = useTheme();
  const [scheduleItemTitle, setScheduleItemTitle] = useState<string>("");
  const [scheduleItemDescription, setScheduleItemDescription] =
    useState<string>("");
  const [startDateAndTime, setStartDateAndTime] = useState<number>(
    moment.now()
  );
  const [endDateAndTime, setEndDateAndTime] = useState<number>(moment.now());

  const handleScheduleItemTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScheduleItemTitle(event.target.value);
  };

  const handleScheduleItemDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScheduleItemDescription(event.target.value);
  };

  const handleStartDateAndTimeChange = (date: number) => {
    setStartDateAndTime(date);
  };

  const handleEndDateAndTimeChange = (date: number) => {
    setEndDateAndTime(date);
  };

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
            // ref={imageFileRef}
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
              if (date) handleStartEventDateChange(date);
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
              if (date) handleEndEventDateChange(date);
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
        <Box display={"grid"} gap={1}>
          <Typography variant="h6">Event Schedules</Typography>
          {eventSchedules.length > 0 ? (
            eventSchedules.map((eventSchedules, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: theme.colors.background1,
                  width: "70%",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" fontWeight={700}>
                    {eventSchedules.scheduleItemTitle}
                  </Typography>
                  <Box display="flex">
                    <Typography variant="caption">
                      {moment(eventSchedules.startDateAndTime).format(
                        "HH:MM , DD/MM/YYYY"
                      )}
                    </Typography>
                    <Typography variant="caption" sx={{ mx: 1 }}>
                      -
                    </Typography>
                    <Typography variant="caption">
                      {moment(eventSchedules.endDateAndTime).format(
                        "HH:MM , DD/MM/YYYY"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={() =>
                      removeEventSchedule(eventSchedules.scheduleItemTitle)
                    }
                    size="small"
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No event schedule added</Typography>
          )}
        </Box>
        <br />
        {!isAdddingSchedule && (
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
            endIcon={<ControlPointRoundedIcon />}
            onClick={handleTogleIsAdddingSchedule}
          >
            Add event schedule
          </Button>
        )}
        {isAdddingSchedule && (
          <Box
            display={"grid"}
            sx={{
              placeContent: "center",
              width: 500,
            }}
          >
            <br />
            <Box sx={{ boxShadow: 2, p: 2, borderRadius: 2 }}>
              <TextField
                label="Schedule Item Title"
                size="small"
                sx={{ width: "100%" }}
                color="secondary"
                value={scheduleItemTitle}
                onChange={handleScheduleItemTitleChange}
              />
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start date"
                  value={startDateAndTime}
                  onChange={(date) => {
                    if (date) handleStartDateAndTimeChange(date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      size="small"
                      sx={{ width: 200, pr: 1 }}
                      helperText={params?.inputProps?.placeholder}
                    />
                  )}
                />
                <DateTimePicker
                  label="End date"
                  value={endDateAndTime}
                  onChange={(date) => {
                    if (date) handleEndDateAndTimeChange(date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      size="small"
                      sx={{ width: 200 }}
                      helperText={params?.inputProps?.placeholder}
                    />
                  )}
                />
              </LocalizationProvider>
              <br />
              <br />
              <TextField
                label="Schedule Item Description"
                size="small"
                color="secondary"
                placeholder="Describe your Schedule Item"
                multiline
                maxRows={2}
                sx={{ width: "100%" }}
                value={scheduleItemDescription}
                onChange={handleScheduleItemDescriptionChange}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  if (scheduleItemTitle && scheduleItemDescription) {
                    // Validation: Ensure start date is before end date
                    if (startDateAndTime >= endDateAndTime) {
                      alert("Start date must be before end date.");
                      return;
                    }

                    // Duplicate Prevention: Check for duplicate event schedules
                    const hasDuplicate = eventSchedules.some(
                      (eventSchedule) =>
                        eventSchedule.scheduleItemTitle === scheduleItemTitle
                    );
                    if (hasDuplicate) {
                      alert(
                        "An event schedule with the same title already exists."
                      );
                      return;
                    }

                    // Create an object of the new event schedule
                    const newEventSchedule: EventScheduleItem = {
                      scheduleItemTitle: scheduleItemTitle,
                      startDateAndTime: startDateAndTime,
                      endDateAndTime: endDateAndTime,
                      scheduleItemDescription: scheduleItemDescription,
                    };

                    // Add the new event schedule to the event schedules array

                    addEventSchedule(newEventSchedule);

                    // Reset the state
                    setScheduleItemTitle("");
                    setScheduleItemDescription("");
                    setStartDateAndTime(moment.now());
                    setEndDateAndTime(moment.now());

                    handleTogleIsAdddingSchedule();
                  } else {
                    alert("Please fill in all required fields.");
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
