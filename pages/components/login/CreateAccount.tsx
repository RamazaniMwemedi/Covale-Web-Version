import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TextField, Button, Box } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import SendIcon from "@mui/icons-material/Send";

import DatePicker from "../calender/DatePicker";

import styles from "../../../styles/Login.module.css";
import { ThemeInterface } from "../../../interfaces/myprofile";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle: React.FC<{
  children: any;
  onClose: () => void;
}> = ({ children, onClose, ...other }) => {
  const theme: ThemeInterface = useTheme();

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CreateAccount = forwardRef(
  (
    props: {
      signUpHandlerSubmit: () => void;
      signupUsernameChangeHandler: () => void;
      signupUsernameErrorBoolean: boolean;
      signupUsernameError: string;
      signupEmailChangeHandler: () => void;
      signupEmailErrorBoolean: boolean;
      signupEmailError: string;
      signupFirstnameChangeHandler: () => void;
      signupFirstnameErrorBoolean: boolean;
      submiting: boolean;
      signupFirstnameError: string;
      signupLastnameChangeHandler: () => void;
      signupLastnameErrorBoolean: boolean;
      signupLastnameError: string;
      signupPasswordChangeHandler: () => void;
      signupBirthdayChangeHandler: () => void;
      signupGenderHandler: () => void;
      signupPasswordErrorBoolean: boolean;
      signupPasswordError: string;
      signupError: string;
      signupBirthdayError: string;
      signupGenderError: string;
      signupBirthday: string;
      singupGender: string;
    },
    ref
  ) => {
    const theme: ThemeInterface = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => {
      return { handleClose };
    });

    return (
      <Box>
        <Button
          variant="contained"
          color="success"
          sx={{
            textTransform: "none",
          }}
          onClick={handleClickOpen}
        >
          Signup
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle onClose={handleClose}>
            <Typography variant="h5">Create an account</Typography>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              {props.signupError}
            </Typography>
            <Typography sx={{ color: "red" }}>
              {props.signupBirthdayError}
            </Typography>
            <Typography sx={{ color: "red" }}>
              {props.signupGenderError}
            </Typography>

            <form onSubmit={props.signUpHandlerSubmit}>
              <div className={styles.form_one}>
                <TextField
                  label="Username"
                  color="secondary"
                  size="small"
                  onChange={props.signupUsernameChangeHandler}
                  error={props.signupUsernameErrorBoolean}
                  helperText={props.signupUsernameError}
                />
                <br />
                <TextField
                  label="email"
                  color="secondary"
                  size="small"
                  onChange={props.signupEmailChangeHandler}
                  error={props.signupEmailErrorBoolean}
                  helperText={props.signupEmailError}
                />
              </div>
              <br />
              <div className={styles.form_two}>
                <TextField
                  label="Firstname"
                  color="secondary"
                  size="small"
                  onChange={props.signupFirstnameChangeHandler}
                  error={props.signupFirstnameErrorBoolean}
                  helperText={props.signupFirstnameError}
                />

                <TextField
                  label="Lastname"
                  color="secondary"
                  size="small"
                  onChange={props.signupLastnameChangeHandler}
                  error={props.signupLastnameErrorBoolean}
                  helperText={props.signupLastnameError}
                />
              </div>
              <br />
              <TextField
                label="Password"
                color="secondary"
                size="small"
                type={"password"}
                onChange={props.signupPasswordChangeHandler}
                error={props.signupPasswordErrorBoolean}
                helperText={props.signupPasswordError}
              />
              <br />
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5px",
                }}
              >
                <DatePicker
                  signupBirthdayChangeHandler={
                    props.signupBirthdayChangeHandler
                  }
                  signupBirthday={props.signupBirthday}
                />
                <FormControl color="secondary">
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={props.singupGender}
                    onChange={props.signupGenderHandler}
                  >
                    <FormControlLabel
                      color="secondary"
                      value="female"
                      control={<Radio color="secondary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      color="secondary"
                      value="male"
                      control={<Radio color="secondary" />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <DialogActions>
                {props.submiting ? (
                  <LoadingButton
                    loading={props.submiting}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="contained"
                  >
                    Creating your account
                  </LoadingButton>
                ) : (
                  <Button
                    autoFocus
                    color="success"
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Create account
                  </Button>
                )}
              </DialogActions>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </Box>
    );
  }
);

export default CreateAccount;

CreateAccount.propTypes = {
  signUpHandlerSubmit: PropTypes.func.isRequired,
  signupUsernameChangeHandler: PropTypes.func.isRequired,
  signupUsernameErrorBoolean: PropTypes.bool.isRequired,
  signupUsernameError: PropTypes.string.isRequired,
  signupEmailChangeHandler: PropTypes.func.isRequired,
  signupEmailErrorBoolean: PropTypes.bool.isRequired,
  signupEmailError: PropTypes.string.isRequired,
  signupFirstnameChangeHandler: PropTypes.func.isRequired,
  signupFirstnameErrorBoolean: PropTypes.bool.isRequired,
  signupFirstnameError: PropTypes.string.isRequired,
  signupLastnameChangeHandler: PropTypes.func.isRequired,
  signupLastnameErrorBoolean: PropTypes.bool.isRequired,
  signupLastnameError: PropTypes.string.isRequired,
  signupPasswordChangeHandler: PropTypes.func.isRequired,
  signupPasswordErrorBoolean: PropTypes.bool.isRequired,
  signupPasswordError: PropTypes.string.isRequired,
};

CreateAccount.displayName = "CreateAccount";
