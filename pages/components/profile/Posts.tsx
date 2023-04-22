import React, { FC, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  addWorkExperience,
  deleteWorkExperience,
  updateProfessionalSum,
  updateWorkexperience,
} from "../../../services/user";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkExperienceToState,
  professionalSummaryUpdate,
  removeWorkExperienceFromState,
  updateworkexperienceState,
} from "../../../Redux/slices/user";
import { OrganizationIcon } from "../../../assets/Icons";
import {
  AddNewWorkExperinceProp,
  CardWithAvatarAndDateProps,
  FormDialogProp,
  RootState,
  SelectWorkExperienceProp,
  WorkExperience,
  WorkExperienceDialogProp,
} from "../../../interfaces/myprofile";
import { MomentInput } from "moment";

const Posts = () => {
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
  const AddNewWorkExperince = ({
    open,
    handleClose,
    titleValue,
    onTitleValueChange,
    error,
    errorMessage,
    saving,
    handleSaveChange,
    organizationName,
    onOrganizationNameValueChange,
    startDate,
    onStartDateValueChange,
    endDate,
    onEndDateValueChange,
    untilNowHandler,
    isUntillNow,
    location,
    locationTypeValue,
    onLocationValueChange,
    onLocationTypeValueChange,
    employmentTypeValue,
    onEmplymentTypeValueChange,
    jobDescriptionValue,
    onJobDescriptionValueChange,
  }: AddNewWorkExperinceProp) => {
    return (
      <div>
        <Dialog open={open}>
          <DialogTitle>Add Work Experience</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your job title and other work experience details
              below. This information can help potential employers or colleagues
              better understand your professional background and qualifications.
            </DialogContentText>
            <br />
            <FormControl sx={{ width: "100%", ml: 3 }}>
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
                id="title"
                label="Title"
                fullWidth
                inputProps={{ minLength: 50, maxLength: 350 }}
                value={titleValue}
                onChange={onTitleValueChange}
              />
              <FormControl color="secondary" fullWidth sx={{ marginTop: 1 }}>
                <InputLabel id="employment-type-label" color="secondary">
                  Employment Type
                </InputLabel>
                <Select
                  labelId="employment-type-label"
                  id="employment-type"
                  value={employmentTypeValue}
                  onChange={(e: SelectChangeEvent<string>) => {
                    onEmplymentTypeValueChange(e);
                  }}
                  size="small"
                  color="secondary"
                  sx={{
                    width: "90%",
                    backgroundColor: theme.colors.textBackground,
                    borderStyle: "none",
                    marginTop: 1,
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="full-time"
                  >
                    Full-time
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="part-time"
                  >
                    Part-time
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="contract"
                  >
                    Contract
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="temporary"
                  >
                    Temporary
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="internship"
                  >
                    Internship
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="apprenticeship"
                  >
                    Apprenticeship
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="freelance"
                  >
                    Freelance
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="volunteer"
                  >
                    Volunteer
                  </MenuItem>
                </Select>
              </FormControl>

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
                id="organizanio-name"
                label="Ornaization Name"
                fullWidth
                inputProps={{ minLength: 50, maxLength: 350 }}
                value={organizationName}
                onChange={onOrganizationNameValueChange}
              />
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
                fullWidth
                id="location"
                label="Location"
                inputProps={{ minLength: 50, maxLength: 350 }}
                value={location}
                onChange={onLocationValueChange}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start date"
                  value={startDate}
                  onChange={(selectedStartDate: MomentInput) => {
                    onStartDateValueChange(moment(selectedStartDate));
                  }}
                  views={["year", "month"]}
                  openTo="year"
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        width: "90%",
                        backgroundColor: theme.colors.textBackground,
                        borderStyle: "none",
                        marginTop: 1,
                      }}
                      size="small"
                      color="secondary"
                      margin="dense"
                      fullWidth
                      {...params}
                      // helperText={params?.inputProps?.placeholder}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {!isUntillNow && (
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(selectedEndDate: MomentInput) => {
                      onEndDateValueChange(moment(selectedEndDate));
                    }}
                    views={["year", "month"]}
                    openTo="year"
                    renderInput={(params) => (
                      <>
                        <TextField
                          sx={{
                            width: "90%",
                            backgroundColor: theme.colors.textBackground,
                            borderStyle: "none",
                            marginTop: 1,
                          }}
                          size="small"
                          color="secondary"
                          margin="dense"
                          fullWidth
                          {...params}
                          // helperText={params?.inputProps?.placeholder}
                        />{" "}
                      </>
                    )}
                  />
                )}
                {/* Add check box to check if until now  */}
                <FormControlLabel
                  sx={{
                    // Be on the right side
                    justifyContent: "flex-end",
                    "& .MuiCheckbox-root": {
                      borderRadius: 4,
                    },
                  }}
                  control={
                    <Checkbox
                      checked={isUntillNow}
                      onChange={untilNowHandler}
                      name="checkedB"
                      size="small"
                      color="secondary"
                      sx={{ borderRadius: 4 }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: "small" }}>
                      Until now
                    </Typography>
                  }
                />
              </LocalizationProvider>
              {/* Location type, options: on-site, hybrid and remote */}

              <FormControl fullWidth color="secondary">
                <InputLabel id="location-type-label" color="secondary">
                  Location Type
                </InputLabel>
                <Select
                  labelId="location-type-label"
                  id="location-type"
                  value={locationTypeValue}
                  onChange={(event) => onLocationTypeValueChange(event)}
                  size="small"
                  sx={{
                    width: "90%",
                    backgroundColor: theme.colors.textBackground,
                    borderStyle: "none",
                    marginTop: 1,
                  }}
                  color="secondary"
                >
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="on-site"
                  >
                    On-site
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="hybrid"
                  >
                    Hybrid
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="remote"
                  >
                    Remote
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="job-description"
                label="Job Description"
                multiline
                rows={4}
                value={jobDescriptionValue}
                onChange={(event) => onJobDescriptionValueChange(event)}
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                color="secondary"
                sx={{
                  width: "90%",
                  backgroundColor: theme.colors.textBackground,
                  borderStyle: "none",
                  marginTop: 1,
                }}
                inputProps={{
                  minLength: 50,
                  maxLength: 4000,
                  style: {
                    fontSize: 12,
                  },
                }}
              />

              {error && <Typography color="error">{errorMessage}</Typography>}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                textTransform: "none",
              }}
              color="inherit"
              onClick={handleClose}
              size="small"
              variant="outlined"
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
  const WorkExperience = () => {
    const userStore = useSelector((state: RootState) => state.user);
    const user = userStore?.user;
    const dispatch = useDispatch();

    const token = useCheckLogedinUserToken();
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [jobDescriptionValue, setJobDescriptionValue] = useState<string>("");
    const [isUntillNow, setIsUntillNow] = useState<boolean>(false);

    const [organizationName, setOrganizationName] = useState<string>("");
    const [employmentTypeValue, setEmploymentTypeValue] = useState<string>("");
    const [locationTypeValue, setLocationTypeValue] = useState<string>("");
    const [startDate, setStartDate] = useState<MomentInput>(moment());
    const [endDate, setEndDate] = useState<MomentInput>(moment());

    const handleClose = () => setOpen(false);
    const onTitleValueChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setTitleValue(e.target.value);
    };
    const onLocationValueChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setLocation(e.target.value);
    };
    const onEmplymentTypeValueChange = (e: SelectChangeEvent<string>) => {
      setEmploymentTypeValue(e.target.value);
    };
    const onLocationTypeValueChange = (e: SelectChangeEvent<string>) => {
      setLocationTypeValue(e.target.value);
    };
    const untilNowHandler = () => {
      setIsUntillNow((prevState) => !prevState);
    };
    const onJobDescriptionValueChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setJobDescriptionValue(e.target.value);
    };
    const onOrganizationNameValueChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setOrganizationName(e.target.value);
    };
    const onStartDateValueChange = (newStartDate: MomentInput) => {
      setStartDate(newStartDate);
    };
    const onEndDateValueChange = (newEndDate: MomentInput) => {
      setEndDate(newEndDate);
    };
    const handleSaveChange = async () => {
      // Check if something is missing
      if (
        !titleValue ||
        !location ||
        !jobDescriptionValue ||
        !organizationName ||
        !employmentTypeValue
      ) {
        setError(true);
        setErrorMessage("Please fill all fields");
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 3000);
        return;
      }
      setSaving(true);
      const workExperienceObject = {
        title: titleValue,
        location: location,
        jobDescription: jobDescriptionValue,
        organizationName: organizationName,
        employmentType: employmentTypeValue,
        startDate: startDate,
        endDate: endDate,
        isUntillNow: isUntillNow,
        locationType: locationTypeValue,
      };
      const response = await addWorkExperience(token, workExperienceObject);
      dispatch(addWorkExperienceToState(response));

      setError(false);
      setErrorMessage("");
      if (response) {
        setOpen(false);
        setTitleValue("");
        setLocation("");
        setJobDescriptionValue("");
        setOrganizationName("");
        setEmploymentTypeValue("");
        setStartDate(moment());
        setEndDate(moment());
        setIsUntillNow(false);
        setError(false);
        setErrorMessage("");
        setSaving(false);
      } else {
        setError(true);
        setErrorMessage("Something went wrong");
      }
    };

    // Work Experience Dialog
    const [openWorkExperienceDialog, setOpenWorkExperienceDialog] =
      useState(false);
    const [selectedWorkExperience, setSelectedWorkExperience] =
      useState<SelectWorkExperienceProp | null>(null);
    const closeDialogHandler = () => setOpenWorkExperienceDialog(false);
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
            <IconButton onClick={() => setOpen(true)} size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {user &&
          user.workExperiences.map((workExperience) => {
            return (
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenWorkExperienceDialog(true);
                  setSelectedWorkExperience(workExperience);
                }}
              >
                <CardWithAvatarAndDate
                  title={workExperience.title}
                  subTitle={workExperience.organizationName}
                  startDate={workExperience.startDate}
                  endDate={workExperience.endDate}
                  isUntillNow={workExperience.isUntillNow}
                  jobDescription={workExperience.jobDescription}
                />
              </Box>
            );
          })}
        {selectedWorkExperience && (
          <WorkExperienceDialog
            open={openWorkExperienceDialog}
            closeDialogHandler={closeDialogHandler}
            employmentType={selectedWorkExperience.employmentType}
            endDate={selectedWorkExperience.endDate}
            isUntillNow={selectedWorkExperience.isUntillNow}
            jobDescription={selectedWorkExperience.jobDescription}
            location={selectedWorkExperience.location}
            organizationName={selectedWorkExperience.organizationName}
            startDate={selectedWorkExperience.startDate}
            title={selectedWorkExperience.title}
            locationType={selectedWorkExperience.locationType}
            id={selectedWorkExperience.id}
          />
        )}
        <AddNewWorkExperince
          titleValue={titleValue}
          error={error}
          errorMessage={errorMessage}
          handleClose={handleClose}
          handleSaveChange={handleSaveChange}
          onTitleValueChange={onTitleValueChange}
          open={open}
          saving={saving}
          endDate={endDate}
          onEndDateValueChange={onEndDateValueChange}
          onOrganizationNameValueChange={onOrganizationNameValueChange}
          onStartDateValueChange={onStartDateValueChange}
          organizationName={organizationName}
          startDate={startDate}
          isUntillNow={isUntillNow}
          location={location}
          onLocationValueChange={onLocationValueChange}
          untilNowHandler={untilNowHandler}
          employmentTypeValue={employmentTypeValue}
          onEmplymentTypeValueChange={onEmplymentTypeValueChange}
          jobDescriptionValue={jobDescriptionValue}
          onJobDescriptionValueChange={onJobDescriptionValueChange}
          onLocationTypeValueChange={onLocationTypeValueChange}
          locationTypeValue={locationTypeValue}
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
          isUntillNow={false}
          jobDescription="Hello"
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

const CardWithAvatarAndDate = ({
  title,
  subTitle,
  startDate,
  endDate,
  isUntillNow,
  jobDescription,
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
      <OrganizationIcon height={45} width={40} />
      <Box>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {" "}
          {title}{" "}
        </Typography>
        <Typography variant="body1"> {subTitle} </Typography>
        <Typography variant="body2">
          {moment(startDate).format("MMMM YYYY")}
          {` `}&middot;{" "}
          {isUntillNow ? "Present" : moment(endDate).format("MMMM YYYY")}
        </Typography>
        <Typography variant="caption" fontWeight={"bold"}>
          {formattedDuration}
        </Typography>
        <br />
        <Typography variant="caption" sx={{ mt: 2 }}>
          {jobDescription && jobDescription.length > 300
            ? jobDescription.substring(0, 300) + "..."
            : jobDescription.split(`\n`).map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
        </Typography>
      </Box>
    </Box>
  );
};

const WorkExperienceDialog: FC<WorkExperienceDialogProp> = ({
  open,
  title,
  closeDialogHandler,
  employmentType,
  endDate,
  isUntillNow,
  jobDescription,
  location,
  organizationName,
  startDate,
  locationType,
  id,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const token = useCheckLogedinUserToken();
  const dispatch = useDispatch();
  const updateWorkExperienceHandler = async (fromData: WorkExperience) => {
    if (token && fromData && id) {
      setUpdating(true);
      const response = await updateWorkexperience(token, fromData, id);
      if (response) {
        console.log(response);
        dispatch(updateworkexperienceState(response));
        setOpenForm(false);
        closeDialogHandler();
        setUpdating(false);
      }
    }
  };
  const handleDeleteExperience = async (id: string) => {
    if (token && id) {
      setDeleting(true);
      const response = await deleteWorkExperience(token, id);
      if (response) {
        dispatch(removeWorkExperienceFromState(id));
        setDeleting(false);
        closeDialogHandler();
      }
    }
  };
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {" "}
            Position
          </Typography>
        </Box>
        <Box>
          <IconButton size="large" onClick={() => setOpenForm(true)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton size="large" onClick={closeDialogHandler}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold">
                Organization Name
              </Typography>
              <Typography variant="body1">{organizationName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold">
                Employment Type{" "}
              </Typography>

              <Typography variant="body1">{employmentType}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold">
                Organization Location
              </Typography>
              <Typography variant="body1">{location}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold">
                Job Duration
              </Typography>
              <Typography variant="body2">
                {moment(startDate).format("MMMM YYYY")}
                {` `}&middot;{" "}
                {isUntillNow ? "Present" : moment(endDate).format("MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Location Type
              </Typography>
              <Typography variant="body1">
                {locationType ? locationType : "Not specified"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Job Description
              </Typography>
              <br />
              <Typography variant="body2">
                {jobDescription.split(`\n`).map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      {openForm && (
        <WorkExperienceForm
          open={openForm}
          closeDialogHandler={() => setOpenForm(false)}
          updateWorkExperienceHandler={updateWorkExperienceHandler}
          updating={updating}
          workExperience={{
            title,
            employmentType,
            endDate,
            isUntillNow,
            jobDescription,
            location,
            organizationName,
            startDate,
            locationType,
            id,
          }}
          handleDeleteExperience={handleDeleteExperience}
          deleting={deleting}
        />
      )}
    </Dialog>
  );
};
type WorkExperienceFormProps = {
  open: boolean;
  updating: boolean;
  deleting: boolean;
  closeDialogHandler: () => void;
  updateWorkExperienceHandler: (updatedWorkExperience: WorkExperience) => void;
  handleDeleteExperience: (id: string) => void;
  workExperience: WorkExperience;
};

const WorkExperienceForm: FC<WorkExperienceFormProps> = ({
  open,
  closeDialogHandler,
  updateWorkExperienceHandler,
  workExperience,
  handleDeleteExperience,
  updating,
  deleting,
}) => {
  const [formData, setFormData] = useState<WorkExperience>(workExperience);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    console.log("ID :>>", id);
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData({ ...formData, ["isUntillNow"]: checked });
  };

  const onStartDateValueChange = (date: MomentInput) => {
    setFormData({ ...formData, ["startDate"]: date });
  };
  const onEndDateValueChange = (date: MomentInput) => {
    setFormData({ ...formData, ["endDate"]: date });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateWorkExperienceHandler(formData);
    closeDialogHandler();
  };

  const handleSelectChange = (
    option: SelectChangeEvent<string>,
    optionFor: string
  ) => {
    setFormData({
      ...formData,
      [optionFor]: option.target.value,
    });
  };

  const theme: any = useTheme();

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Modify Your Experience
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  {" "}
                  <Typography variant="h6" fontWeight="bold">
                    Position
                  </Typography>
                  <Typography variant="h5">
                    <TextField
                      required
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
                      id="title"
                      fullWidth
                      inputProps={{ minLength: 50, maxLength: 350 }}
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold">
                  Organization Name
                </Typography>
                <TextField
                  required
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
                  id="organizationName"
                  fullWidth
                  inputProps={{ minLength: 50, maxLength: 350 }}
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold">
                  Employment Type{" "}
                </Typography>
                <FormControl color="secondary" fullWidth sx={{ marginTop: 1 }}>
                  <Select
                    labelId="employment-type-label"
                    id="employmentType"
                    value={formData.employmentType}
                    onChange={() => {}}
                    size="small"
                    color="secondary"
                    sx={{
                      width: "90%",
                      backgroundColor: theme.colors.textBackground,
                      borderStyle: "none",
                      marginTop: 1,
                    }}
                  >
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="full-time"
                    >
                      Full-time
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="part-time"
                    >
                      Part-time
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="contract"
                    >
                      Contract
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="temporary"
                    >
                      Temporary
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="internship"
                    >
                      Internship
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="apprenticeship"
                    >
                      Apprenticeship
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="freelance"
                    >
                      Freelance
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      value="volunteer"
                    >
                      Volunteer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold">
                  Organization Location
                </Typography>
                <TextField
                  required
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
                  fullWidth
                  id="location"
                  inputProps={{ minLength: 50, maxLength: 350 }}
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold">
                  Job Duration
                </Typography>{" "}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start date"
                    value={moment(formData.startDate).format("YYYY-MM-DD")}
                    onChange={(selectedEndDate: MomentInput) => {
                      onStartDateValueChange(selectedEndDate);
                    }}
                    views={["year", "month"]}
                    openTo="year"
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          width: "90%",
                          backgroundColor: theme.colors.textBackground,
                          borderStyle: "none",
                          marginTop: 1,
                        }}
                        size="small"
                        color="secondary"
                        margin="dense"
                        fullWidth
                        {...params}
                        // helperText={params?.inputProps?.placeholder}
                      />
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {!formData.isUntillNow && (
                    <DatePicker
                      label="End date"
                      value={formData.endDate}
                      onChange={(selectedEndDate: MomentInput) => {
                        onEndDateValueChange(selectedEndDate);
                      }}
                      views={["year", "month"]}
                      openTo="year"
                      renderInput={(params) => (
                        <>
                          <TextField
                            sx={{
                              width: "90%",
                              backgroundColor: theme.colors.textBackground,
                              borderStyle: "none",
                              marginTop: 1,
                            }}
                            size="small"
                            color="secondary"
                            margin="dense"
                            fullWidth
                            {...params}
                            // helperText={params?.inputProps?.placeholder}
                          />{" "}
                        </>
                      )}
                    />
                  )}
                  {/* Add check box to check if until now  */}
                  <FormControlLabel
                    sx={{
                      // Be on the right side
                      justifyContent: "flex-end",
                      "& .MuiCheckbox-root": {
                        borderRadius: 4,
                      },
                    }}
                    control={
                      <Checkbox
                        checked={formData.isUntillNow}
                        onChange={handleCheckboxChange}
                        name="checkedB"
                        size="small"
                        color="secondary"
                        sx={{ borderRadius: 4 }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "small" }}>
                        Currently Working Here
                      </Typography>
                    }
                  />
                </LocalizationProvider>
              </Grid>
              <FormControl fullWidth color="secondary">
                <InputLabel id="location-type-label" color="secondary">
                  Location Type
                </InputLabel>
                <Select
                  labelId="location-type-label"
                  id="location-type"
                  value={formData.locationType}
                  onChange={(option) =>
                    handleSelectChange(option, "locationType")
                  }
                  size="small"
                  sx={{
                    width: "90%",
                    backgroundColor: theme.colors.textBackground,
                    borderStyle: "none",
                    marginTop: 1,
                    ml: 1.5,
                  }}
                  color="secondary"
                >
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="on-site"
                  >
                    On-site
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="hybrid"
                  >
                    Hybrid
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 12,
                    }}
                    value="remote"
                  >
                    Remote
                  </MenuItem>
                </Select>
              </FormControl>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  rows={5}
                  id="jobDescription"
                  name="jobDescription"
                  color="secondary"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  label="Job Description"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          {deleting ? (
            <LoadingButton
              loading
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"
            />
          ) : (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              size="small"
              color="error"
              onClick={() => handleDeleteExperience(formData.id)}
            >
              Delete
            </Button>
          )}
          <Box>
            <Button
              onClick={closeDialogHandler}
              sx={{
                textTransform: "none",
                m: 1,
              }}
              color="inherit"
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
            {updating ? (
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
                size="small"
                onClick={() => updateWorkExperienceHandler(formData)}
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};
