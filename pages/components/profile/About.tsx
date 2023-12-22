import { useTheme } from "@mui/styles";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import {
  addEducationAndCertificates,
  addWorkExperience,
  deleteWorkExperience,
  updateProfessionalSum,
  updateWorkexperience,
} from "../../../services/user";
import {
  addWorkExperienceToState,
  professionalSummaryUpdate,
  removeWorkExperienceFromState,
  updateworkexperienceState,
} from "../../../Redux/slices/user";
import {
  AddNewEducationAndCertificatesProp,
  AddNewWorkExperinceProp,
  CardWithAvatarAndDateProps,
  FormDialogProp,
  RootState,
  SelectWorkExperienceProp,
  ThemeInterface,
  UserInterFace,
  WorkExperience,
  WorkExperienceDialogProp,
} from "../../../interfaces/myprofile";
import { Box } from "@mui/system";
import {
  Button,
  Card,
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
  Link,
  CardMedia,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment, { MomentInput } from "moment";
import { LoadingButton } from "@mui/lab";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendIcon from "@mui/icons-material/Send";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { OrganizationIcon } from "../../../assets/Icons";

const About = () => {
  const theme: ThemeInterface = useTheme();
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;

  return (
    <Box>
      {user && (
        <>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
            }}
          >
            <ProfessionalSummary user={user} />
            <br />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
            >
              {/* Professional Summary */}
              {/* Work Experience  */}
              <WorkExperience />
              {/* Education And Certificates */}
              <EducationAndCertificates user={user} />
            </Box>
            <br />
            {/* Education And Certificates */}
          </Box>
          <br />
          <Box
            sx={{
              bgcolor: theme.colors.background1,
              p: 1,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                }}
              >
                Connections
              </Typography>

              <Button
                color="secondary"
                sx={{
                  // width: 150,
                  textTransform: "none",
                }}
              >
                <Link
                  href="/colleagues/mycolleagues"
                  underline="none"
                  sx={{
                    color: (theme) => theme.palette.secondary.main,
                    display: "flex",
                    p: 0,
                  }}
                >
                  See all connections
                </Link>
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {user.colleagues.length} Connection
              {user.colleagues.length > 1 && "'s"}
            </Typography>
            <br />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
              }}
            >
              {user.colleagues.map((colleague) => (
                <Card
                  sx={{
                    maxWidth: 135,
                    bgcolor: theme.colors.background1,
                    p: 1,
                  }}
                  key={colleague.id}
                >
                  <CardMedia
                    sx={{ height: 110, width: 110, borderRadius: 4 }}
                    image={colleague.profilePic.fileUrl}
                    title={colleague.username}
                  />
                  <Typography
                    gutterBottom
                    variant="body1"
                    fontWeight={700}
                    component="div"
                  >
                    {colleague.firstname} {colleague.lastname}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
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
  const theme: ThemeInterface = useTheme();
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
        transition: "box-shadow 0.3s, background-color 0.3s", // Add animation
        "&:hover": {
          boxShadow: 3,
          bgcolor: theme.colors.itemBackground,
        },
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

const ProfessionalSummary: FC<{
  user: UserInterFace;
}> = ({ user }) => {
  const theme: ThemeInterface = useTheme();

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

  if (user) {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.background1,
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
            variant="h6"
            component={"h6"}
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
  const theme: ThemeInterface = useTheme();

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Add Work Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your job title and other work experience details below.
            This information can help potential employers or colleagues better
            understand your professional background and qualifications.
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
  const theme: ThemeInterface = useTheme();

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
        bgcolor: theme.colors.background1,
        p: 1,
        borderRadius: 2,
        flex: 0.5,
        [theme.breakpoints.down("md")]: {
          flex: 1,
        },
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
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 0.5,
          }}
          component={"h6"}
        >
          Work Experience
        </Typography>
        <Box>
          <IconButton onClick={() => setOpen(true)} size="small">
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      {user && user.workExperiences.length > 1 ? (
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
        })
      ) : (
        <Box
          sx={{
            ml: 5,
          }}
        >
          {/* No work experience, add */}
          <br />
          <Typography
            variant="caption"
            sx={{
              mb: 0.5,
            }}
            component={"p"}
          >
            No work experience, click on the{" "}
            <IconButton onClick={() => setOpen(true)} size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>{" "}
            to add one.
          </Typography>
          <br />
        </Box>
      )}
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
const EducationAndCertificates: FC<{
  user: UserInterFace;
}> = () => {
  const theme: ThemeInterface = useTheme();

  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  const dispatch = useDispatch();

  const token = useCheckLogedinUserToken();

  const [type, setType] = useState<"education" | "certificate">("education");
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [isUntillNow, setIsUntillNow] = useState(false);
  const [startDate, setStartDate] = useState<MomentInput>(moment());
  const [endDate, setEndDate] = useState<MomentInput>(moment());
  const [skills, setSkills] = useState<string[]>([]);
  const [sourceUrl, setSourceUrl] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);



  // End
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => setOpen(false);

  const onTypeChange = (newType: "education" | "certificate") => {
    setType(newType);
  };

  const onSchoolNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSchoolName(e.target.value);
  };

  const onDegreeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDegree(e.target.value);
  };

  const onFieldOfStudyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldOfStudy(e.target.value);
  };

  const onCertificateNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCertificateName(e.target.value);
  };

  const onIsUntillNowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUntillNow(e.target.checked);
  };

  const onStartDateChange = (newStartDate: MomentInput) => {
    setStartDate(newStartDate);
  };

  const onEndDateChange = (newEndDate: MomentInput) => {
    setEndDate(newEndDate);
  };

  const onSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const onSourceUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSourceUrl(e.target.value);
  };

  const onTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const onThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setThumbnail(e.target.value);
  };

  const onDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const onFileChange = (file:File|undefined) => {
    
      setFile(file);
  };
  const untilNowHandler = () => {
    setIsUntillNow((prevState) => !prevState);
  };

  const handleSaveChange = async () => {
    // Check if something is missing
    if (!title) {
      setError(true);
      setErrorMessage("Please fill all fields");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    }
    setSaving(true);
    const educationAndCertificates: {
      type: "education" | "certificate";
      details: {
        schoolName: string;
        degree: string;
        fieldOfStudy: string;
        certificateName: string;
        isUntillNow: boolean;
        startDate: MomentInput;
        endDate: MomentInput;
        skills: string[];
        media: {
          sourceUrl: string;
          title: string;
          thumbnail: string;
          description: string;
          file: File | undefined;
        };
      };
    } = {
      type,
      details: {
        certificateName,
        degree,
        endDate,
        fieldOfStudy,
        isUntillNow,
        media: {
          file: file,
          description: description,
          sourceUrl: sourceUrl,
          thumbnail: thumbnail,
          title: title,
        },
        schoolName,
        skills,
        startDate,
      },
    };
    const response = await addEducationAndCertificates(
      token,
      educationAndCertificates
    );
    dispatch(addWorkExperienceToState(response));

    setError(false);
    setErrorMessage("");
    if (response) {
      setOpen(false);
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
        bgcolor: theme.colors.background1,
        p: 1,
        borderRadius: 2,
        flex: 0.5,
        [theme.breakpoints.down("md")]: {
          flex: 1,
        },
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
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 0.5,
          }}
          component={"h6"}
        >
          Education and Certifications
        </Typography>
        <Box>
          <IconButton onClick={() => setOpen(true)} size="small">
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      {user && user.educationAndCertificates.length > 1 ? (
        user.educationAndCertificates.map((educationAndCertificate) => {
          return (
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenWorkExperienceDialog(true);
                // setSelectedWorkExperience(workExperience);
              }}
            >
              <EducationAndCertificationCard {...educationAndCertificate} />
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            ml: 5,
          }}
        >
          {/* No work experience, add */}
          <br />
          <Typography
            variant="caption"
            sx={{
              mb: 0.5,
            }}
            component={"p"}
          >
            No work education and certificates found, click on the{" "}
            <IconButton onClick={() => setOpen(true)} size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>{" "}
            to add one.
          </Typography>
          <br />
        </Box>
      )}
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
      <AddNewEducationAndCertificates
        open={open}
        saving={saving}
        isUntillNow={isUntillNow}
        handleClose={handleClose}
        handleSaveChange={handleSaveChange}
        untilNowHandler={untilNowHandler}
        error={error}
        errorMessage={errorMessage}
        type={type}
        schoolName={schoolName}
        degree={degree}
        fieldOfStudy={fieldOfStudy}
        certificateName={certificateName}
        startDate={startDate}
        endDate={endDate}
        skills={skills}
        sourceUrl={sourceUrl}
        title={title}
        thumbnail={thumbnail}
        description={description}
        file={file}
        onTypeChange={onTypeChange}
        onSchoolNameChange={onSchoolNameChange}
        onDegreeChange={onDegreeChange}
        onFieldOfStudyChange={onFieldOfStudyChange}
        onCertificateNameChange={onCertificateNameChange}
        onIsUntillNowChange={onIsUntillNowChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSkillsChange={onSkillsChange}
        onSourceUrlChange={onSourceUrlChange}
        onTitleChange={onTitleChange}
        onThumbnailChange={onThumbnailChange}
        onDescriptionChange={onDescriptionChange}
        onFileChange={onFileChange}
      />
    </Box>
  );
};
interface EducationAndCertificationCardProp {
  type: "education" | "certificate";
  details: {
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    certificateName: string;
    isUntillNow: boolean;
    startDate: Date;
    endDate: Date;
    skills: string[];
    media: {
      sourceUrl: string;
      title: string;
      thumbnail: string;
      description: string;
      file: File;
    };
  };
}
const EducationAndCertificationCard: FC<EducationAndCertificationCardProp> = ({
  type,
  details: {
    schoolName,
    degree,
    fieldOfStudy,
    certificateName,
    isUntillNow,
    startDate,
    endDate,
    skills,
    media,
  },
}) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const years = duration.years();
  const months = duration.months();
  const formattedDuration = `${years} years and ${months} months`;
  const theme: ThemeInterface = useTheme();
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
        transition: "box-shadow 0.3s, background-color 0.3s", // Add animation
        "&:hover": {
          boxShadow: 3,
          bgcolor: theme.colors.itemBackground,
        },
      }}
    >
      <OrganizationIcon height={45} width={40} />
      <Box>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {" "}
          {schoolName}{" "}
        </Typography>
        <Typography variant="body1"> {degree} </Typography>
        <Typography variant="body2">
          {moment(startDate).format("MMMM YYYY")}
          {` `}&middot;{" "}
          {isUntillNow ? "Present" : moment(endDate).format("MMMM YYYY")}
        </Typography>
        <Typography variant="caption" fontWeight={"bold"}>
          {formattedDuration}
        </Typography>
        <br />
      </Box>
    </Box>
  );
};

// ... (existing imports)

const AddNewEducationAndCertificates = ({
  open,
  handleClose,
  type,
  schoolName,
  degree,
  fieldOfStudy,
  certificateName,
  isUntillNow,
  startDate,
  endDate,
  skills,
  sourceUrl,
  title,
  thumbnail,
  description,
  file,
  onTypeChange,
  onSchoolNameChange,
  onDegreeChange,
  onFieldOfStudyChange,
  onCertificateNameChange,
  onIsUntillNowChange,
  onStartDateChange,
  onEndDateChange,
  onSkillsChange,
  onSourceUrlChange,
  onTitleChange,
  onThumbnailChange,
  onDescriptionChange,
  onFileChange,
  saving,
  handleSaveChange,
  untilNowHandler,
  error,
  errorMessage,
}: AddNewEducationAndCertificatesProp) => {
  const theme: ThemeInterface = useTheme();

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Add Education or Certificates</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your education or certification details below. This
            information can help others, such as colleagues or potential
            employers, better understand your academic background and
            certifications you've achieved.
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
              id="school-name"
              label="School Name"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={schoolName}
              onChange={onSchoolNameChange}
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
              id="degree"
              label="Degree"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={degree}
              onChange={onDegreeChange}
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
              id="field-of-study"
              label="Field of Study"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={fieldOfStudy}
              onChange={onFieldOfStudyChange}
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
              id="certificate-name"
              label="Certificate Name"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={certificateName}
              onChange={onCertificateNameChange}
            />

            {/* Skills (as a placeholder, replace it with your actual implementation) */}
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
              id="skills"
              label="Skills"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={skills.join(", ")}
              onChange={(e) => onSkillsChange(e.target.value.split(", "))}
            />

            {/* Source URL (as a placeholder, replace it with your actual implementation) */}
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
              id="source-url"
              label="Source URL"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={sourceUrl}
              onChange={onSourceUrlChange}
            />

            {/* Title (as a placeholder, replace it with your actual implementation) */}
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
              value={title}
              onChange={onTitleChange}
            />

            {/* Thumbnail (as a placeholder, replace it with your actual implementation) */}
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
              id="thumbnail"
              label="Thumbnail"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={thumbnail}
              onChange={onThumbnailChange}
            />

            {/* Description (as a placeholder, replace it with your actual implementation) */}
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
              id="description"
              label="Description"
              fullWidth
              inputProps={{ minLength: 50, maxLength: 350 }}
              value={description}
              onChange={onDescriptionChange}
            />

            {/* File (as a placeholder, replace it with your actual implementation) */}
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => onFileChange(e.target.files?.[0])}
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

export default About;
