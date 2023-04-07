import { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
// CSS
import styles from "../styles/Login.module.css";
// My modules
import loginServices from "../services/login";
import CreateAccount from "./components/login/CreateAccount";
import Logo from "../assets/Logo";

const LoginPage = () => {
  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(false));
  }, []);
  // User
  // Signin form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Signup form states
  const [signupUsername, setSignupUsername] = useState("");
  const [signupFirstname, setSignupFirstname] = useState("");
  const [signupLastname, setSignupLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupBirthday, setSignupBirthday] = useState(new Date());
  const [signupGender, setSignupGender] = useState(null);

  // Login Form Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
  const [passwordErrorBoolean, setPasswordErrorBoolean] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Signup Form Error states
  const [signupUsernameError, setSignupUsernameError] = useState("");
  const [signupFirstnameError, setSignupFirstnameError] = useState("");
  const [signupLastnameError, setSignupLastnameError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupUsernameErrorBoolean, setSignupUsernameErrorBoolean] =
    useState(false);
  const [signupFirstnameErrorBoolean, setSignupFirstnameErrorBoolean] =
    useState(false);
  const [signupLastnameErrorBoolean, setSignupLastnameErrorBoolean] =
    useState(false);
  const [signupEmailErrorBoolean, setSignupEmailErrorBoolean] = useState(false);
  const [signupPasswordErrorBoolean, setSignupPasswordErrorBoolean] =
    useState(false);
  const [signupBirthdayError, setSignupBirthdayError] = useState("");
  const [signupGenderError, setSignupGenderError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [submiting, setSubmiting] = useState(false);
  const [signInSubmiting, setSignInSubmiting] = useState(false);
  const signupRef = useRef(null);

  const theme = useTheme();

  // Signin Handlers
  const signInHandlerSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      setEmailErrorBoolean(true);
      setTimeout(() => {
        setEmailError("");
        setEmailErrorBoolean(false);
      }, 3000);
    } else if (!password) {
      setPasswordError("Password is required");
      setPasswordErrorBoolean(true);
      setTimeout(() => {
        setPasswordError("");
        setPasswordErrorBoolean(false);
      }, 3000);
    } else if (!email.includes("@")) {
      setEmailError("Email is not valid");
      setEmailErrorBoolean(true);
      setTimeout(() => {
        setEmailError("");
        setEmailErrorBoolean(false);
      }, 3000);
    } else {
      try {
        setSignInSubmiting(true);
        const data = {
          email,
          password,
        };
        const response = await loginServices.signIn(data);

        if (response) {
          window.localStorage.setItem("logedinUser", JSON.stringify(response));
          window.localStorage.setItem("theme", "light-mode");
          router.push("/chats/");
        }
      } catch (exception) {
        setSignInSubmiting(false);
        setLoginError(exception.response.data.error);
        setTimeout(() => {
          setLoginError("");
        }, 3000);
      }
    }
  };

  // Signup Handler
  const signUpHandlerSubmit = async (e) => {
    e.preventDefault();
    // user age
    const age =
      new Date().getFullYear() - new Date(signupBirthday).getFullYear();

    const data = {
      username: signupUsername,
      firstname: signupFirstname,
      lastname: signupLastname,
      email: signupEmail,
      password: signupPassword,
      birthday: signupBirthday,
      gender: signupGender,
    };
    if (!signupUsername) {
      setSignupUsernameError("Username is required");
      setSignupUsernameErrorBoolean(true);
      setTimeout(() => {
        setSignupUsernameError("");
        setSignupUsernameErrorBoolean(false);
      }, 3000);
    } else if (!signupFirstname) {
      setSignupFirstnameError("Firstname is required");
      setSignupFirstnameErrorBoolean(true);
      setTimeout(() => {
        setSignupFirstnameError("");
        setSignupFirstnameErrorBoolean(false);
      }, 3000);
    } else if (!signupLastname) {
      setSignupLastnameError("Lastname is required");
      setSignupLastnameErrorBoolean(true);
      setTimeout(() => {
        setSignupLastnameError("");
        setSignupLastnameErrorBoolean(false);
      }, 3000);
    } else if (!signupEmail) {
      setSignupEmailError("Email is required");
      setSignupEmailErrorBoolean(true);
      setTimeout(() => {
        setSignupEmailError("");
        setSignupEmailErrorBoolean(false);
      }, 3000);
    } else if (!signupPassword) {
      setSignupPasswordError("Password is required");
      setSignupPasswordErrorBoolean(true);
      setTimeout(() => {
        setSignupPasswordError("");
        setSignupPasswordErrorBoolean(false);
      }, 3000);
    } else if (!signupEmail.includes("@")) {
      setSignupEmailError("Email is not valid");
      setSignupEmailErrorBoolean(true);
      setTimeout(() => {
        setSignupEmailError("");
        setSignupEmailErrorBoolean(false);
      }, 3000);
    } else if (signupPassword.length <= 6) {
      setSignupPasswordError("Password must be at least 6 characters");
      setSignupPasswordErrorBoolean(true);
      setTimeout(() => {
        setSignupPasswordError("");
        setSignupPasswordErrorBoolean(false);
      }, 3000);
    } else if (age < 13) {
      setSignupBirthdayError("You must be 13 years or above");
      setTimeout(() => {
        setSignupBirthdayError("");
      }, 3000);
    } else if (!signupGender) {
      setSignupGenderError("Gender is required");
      setTimeout(() => {
        setSignupGenderError("");
      }, 3000);
    } else {
      try {
        setSubmiting(true);
        const response = await loginServices.signUp(data);
        window.localStorage.setItem("logedinUser", JSON.stringify(response));
        router.push("/chats/");
        window.localStorage.setItem("theme", "light-mode");
      } catch (error) {
        setSubmiting(false);
        setSignupError(error.response.data.error);
        setTimeout(() => {
          setSignupError("");
        }, 6000);
      }
    }
  };

  // Signin Change Handlers



  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  // Signup Change Handlers

  // Signup Change birthday handler
  const signupBirthdayChangeHandler = (value) => {
    setSignupBirthday(value);
  };

  const signupUsernameChangeHandler = (e) => {
    setSignupUsername(e.target.value);
  };

  const signupFirstnameChangeHandler = (e) => {
    setSignupFirstname(e.target.value);
  };

  const signupLastnameChangeHandler = (e) => {
    setSignupLastname(e.target.value);
  };

  const signupEmailChangeHandler = (e) => {
    setSignupEmail(e.target.value);
  };

  const signupPasswordChangeHandler = (e) => {
    setSignupPassword(e.target.value);
  };

  const signupGenderHandler = (e) => {
    setSignupGender(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "80vw",
          height: "50vh",
          transform: "translate(-50%, -50%)",
          padding: "10px",
          backgroundColor: theme.colors.background,
        }}
      >
        <Box>
          <Signin
            // Signin Change Handlers
            signInHandlerSubmit={signInHandlerSubmit}
            emailChangeHandler={emailChangeHandler}
            passwordChangeHandler={passwordChangeHandler}
            signUpHandlerSubmit={signUpHandlerSubmit}
            signupRef={signupRef}
            loginError={loginError}
            signInSubmiting={signInSubmiting}
            // Signup Change Handlers
            signupUsernameChangeHandler={signupUsernameChangeHandler}
            signupFirstnameChangeHandler={signupFirstnameChangeHandler}
            signupLastnameChangeHandler={signupLastnameChangeHandler}
            signupEmailChangeHandler={signupEmailChangeHandler}
            signupPasswordChangeHandler={signupPasswordChangeHandler}
            signupBirthdayChangeHandler={signupBirthdayChangeHandler}
            signupGenderHandler={signupGenderHandler}
            // Form Error states
            emailError={emailError}
            emailErrorBoolean={emailErrorBoolean}
            passwordError={passwordError}
            passwordErrorBoolean={passwordErrorBoolean}
            // Signup Form Error states
            signupUsernameError={signupUsernameError}
            signupUsernameErrorBoolean={signupUsernameErrorBoolean}
            signupFirstnameError={signupFirstnameError}
            signupFirstnameErrorBoolean={signupFirstnameErrorBoolean}
            signupLastnameError={signupLastnameError}
            signupLastnameErrorBoolean={signupLastnameErrorBoolean}
            signupEmailError={signupEmailError}
            signupEmailErrorBoolean={signupEmailErrorBoolean}
            signupPasswordError={signupPasswordError}
            signupPasswordErrorBoolean={signupPasswordErrorBoolean}
            signupBirthdayError={signupBirthdayError}
            signupGenderError={signupGenderError}
            signupError={signupError}
            // Signup Values
            signupBirthday={signupBirthday}
            signupGender={signupGender}
            submiting={submiting}
          />
          <br />
        </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                gap: "100px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  backgroundColor:theme.colors.background1,

                }}
              >
                  <Logo height={230} />
              </Box>
              <Typography
                variant="h1"
                sx={{
                  background:
                    "linear-gradient(to right, rgb(214, 67, 181), rgb(120, 79, 195))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",

                  marginLeft: "-80px",
                }}
              >
                Covale
              </Typography>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

const Signin = (props) => {
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        flex: 1,
        padding: "10px",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "rgb(180, 17, 180)",
        borderRadius: "10px",
        width: "350px",
      }}
    >
      <form onSubmit={props.signInHandlerSubmit} className={styles.signin_form}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: "bold",
            color: "rgb(180, 17, 180)",
            marginBottom: "1rem",
            marginTop: "10px",
          }}
        >
          Sign in
        </Typography>
        <TextField
          label="Email"
          color="secondary"
          size="small"
          onChange={props.emailChangeHandler}
          helperText={props.emailError}
          error={props.emailErrorBoolean}
        />
        {/* <br /> */}
        <br />
        <TextField
          label="Password"
          size="small"
          type={"password"}
          color="secondary"
          onChange={props.passwordChangeHandler}
          helperText={props.passwordError}
          error={props.passwordErrorBoolean}
        />
        <br />
        <p
          style={{
            fontSize: "0.8rem",
            color: "red",
            marginTop: "-10px",
          }}
        >
          {props.loginError}
        </p>
        {/* <br /> */}
        {props.signInSubmiting ? (
          <LoadingButton
            loading={props.signInSubmiting}
            endIcon={" "}
            loadingPosition="end"
            variant="contained"
          >
            Sign In
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit" color="secondary">
            Signin
          </Button>
        )}

        {/* <Link href="#/recover">
          <a>Forgot password?</a>
        </Link> */}
        <hr />
      </form>
      <CreateAccount
        ref={props.signupRef}
        signUpHandlerSubmit={props.signUpHandlerSubmit}
        // Signup Change Handlers
        signupUsernameChangeHandler={props.signupUsernameChangeHandler}
        signupFirstnameChangeHandler={props.signupFirstnameChangeHandler}
        signupLastnameChangeHandler={props.signupLastnameChangeHandler}
        signupEmailChangeHandler={props.signupEmailChangeHandler}
        signupPasswordChangeHandler={props.signupPasswordChangeHandler}
        signupBirthdayChangeHandler={props.signupBirthdayChangeHandler}
        signupGenderHandler={props.signupGenderHandler}
        // Signup Form Error states
        signupUsernameError={props.signupUsernameError}
        signupUsernameErrorBoolean={props.signupUsernameErrorBoolean}
        signupFirstnameError={props.signupFirstnameError}
        signupFirstnameErrorBoolean={props.signupFirstnameErrorBoolean}
        signupLastnameError={props.signupLastnameError}
        signupLastnameErrorBoolean={props.signupLastnameErrorBoolean}
        signupEmailError={props.signupEmailError}
        signupEmailErrorBoolean={props.signupEmailErrorBoolean}
        signupPasswordError={props.signupPasswordError}
        signupPasswordErrorBoolean={props.signupPasswordErrorBoolean}
        signupBirthdayError={props.signupBirthdayError}
        signupGenderError={props.signupGenderError}
        signupError={props.signupError}
        // Signup Values
        signupBirthday={props.signupBirthday}
        singupGender={props.singupGender}
        submiting={props.submiting}
      />
    </Box>
  );
};
