import {
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  useTheme,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import OtpInput from "react-otp-input";
import validator from "validator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Logo from "../assets/Logo";
import {
  confirmOTP,
  recoverAccountConfirmEmail,
  resetPasswordHandler,
} from "../services/user";
import { useRouter } from "next/router";

const Recover = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isOTP, setIsOTP] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const checkEmail = async () => {
    setLoading(true);
    if (!validator.isEmail(email)) {
      setError("Invalid email address");
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);

      return false;
    }
    const statusCode = await recoverAccountConfirmEmail(email);
    if (statusCode === 204) {
      setError(`Invalid Email`);
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);

      return false;
    } else if (statusCode === 200) {
      setLoading(false);
      setIsOTP(true);
    }
  };
  const checkOTP = async (otp: string) => {
    if (otp.length < 6) {
      setError("Invalid OTP");
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const statusCode = await confirmOTP(otp, email);
    if (statusCode === 204) {
      setError(`Invalid OTP`);
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);

      return false;
    } else if (statusCode === 203) {
      setError(`OTP expired`);
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (statusCode === 200) {
      setIsResetPassword(true);
    }
  };
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    // Check for password strength
    const passwordValidationOptions = {
      minLength: 8, // Password should be at least 8 characters long
      minLowercase: 1, // Password should contain at least 1 lowercase letter
      minUppercase: 1, // Password should contain at least 1 uppercase letter
      minNumbers: 1, // Password should contain at least 1 number
      minSymbols: 1, // Password should contain at least 1 special character/symbol
    };

    if (!validator.isStrongPassword(password, passwordValidationOptions)) {
      setError(
        "Password should be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and special characters."
      );
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 8000);

      return;
    } else if (email && password) {
      setLoading(true);

      const response = await resetPasswordHandler(email, password);
      console.log("Response from Server :>>", response);

      if (response) {
        window.localStorage.setItem("logedinUser", JSON.stringify(response));
        window.localStorage.setItem("theme", "light-mode");
        router.push("/chats/");
      } else {
        setError("Something went wrong. Try again later.");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: (theme) => theme.palette.background.default,
          borderRadius: 1,
          p: 5,
          width: 450,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo height={50} width={50} />
          <Typography
            variant="h5"
            sx={{
              background:
                "linear-gradient(to right, rgb(214, 67, 181), rgb(120, 79, 195))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Covale
          </Typography>
        </Box>
        <br />
        <Typography align="center" variant="h6">
          Recover your account
        </Typography>
        <Box>
          {error && <Alert severity="error">{error}</Alert>}
          {isOTP ? (
            <>
              {isResetPassword ? (
                <>
                  <Box>
                    <Typography align="center" variant="body1">
                      Reset your password.
                    </Typography>
                    <br />
                    {/* Password and Confirm Password */}
                    <Box gap={1} display={"grid"}>
                      <FormControl sx={{ mt: 2 }} variant="outlined">
                        <InputLabel
                          color="secondary"
                          htmlFor="outlined-adornment-password"
                          size="small"
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          color="secondary"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                      <FormControl sx={{ mt: 2 }} variant="outlined">
                        <InputLabel
                          color="secondary"
                          htmlFor="outlined-adornment-password"
                          size="small"
                        >
                          Password confirm
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password-confirm"
                          type={showPassword ? "text" : "password"}
                          color="secondary"
                          size="small"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label=" Password confirm"
                        />
                      </FormControl>
                    </Box>
                    <br />

                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box />
                      <LoadingButton
                        color="secondary"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                        }}
                        variant="contained"
                        loading={loading}
                        onClick={resetPassword}
                      >
                        Reset
                      </LoadingButton>
                    </Box>
                  </Box>
                </>
              ) : (
                <VerifyOTP checkOTP={checkOTP} loading={loading} />
              )}
            </>
          ) : (
            <>
              <Box>
                <Typography align="center" variant="body1">
                  Enter your email address to recover your account.
                </Typography>
                <br />
                <TextField
                  color="secondary"
                  size="small"
                  label="Email"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  disabled={loading}
                />
                <br />
                <br />

                <br />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button
                    href="/login"
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                    variant="outlined"
                  >
                    Create new account
                  </Button>
                  <LoadingButton
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                    variant="contained"
                    loading={loading}
                    onClick={checkEmail}
                  >
                    Next
                  </LoadingButton>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Recover;

const VerifyOTP = ({
  checkOTP,
  loading,
}: {
  checkOTP: (otp: string) => void;
  loading: boolean;
}) => {
  const [otp, setOtp] = useState("");
  const theme = useTheme();

  return (
    <Box>
      <Typography align="center" variant="body1">
        Enter the OTP
      </Typography>
      <br />
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        inputStyle={{
          border: `1px solid ${theme.palette.secondary.main}`,
          width: 35,
          height: 35,
          margin: 5,
          borderRadius: 3,
        }}
        shouldAutoFocus
        renderInput={(props) => <input {...props} />}
      />
      <br />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          href="/login"
          color="secondary"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
          variant="outlined"
        >
          Create new account
        </Button>
        <LoadingButton
          color="secondary"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
          variant="contained"
          loading={loading}
          onClick={() => checkOTP(otp)}
        >
          Next
        </LoadingButton>
      </Box>
    </Box>
  );
};
