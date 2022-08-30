import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
// CSS
import styles from "../styles/Login.module.css";
// My modules
import loginServices from "../services/login";
import CreateAccount from "./components/CreateAccount";

const LoginPage = () => {
  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(false));
  }, []);
  // User
  const [user, setUser] = useState(null);
  // Signin form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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

  const [error, setError] = useState("");
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

        console.log(response);
        if (response) {
          window.localStorage.setItem("logedinUser", JSON.stringify(response));
          router.push(`/chats/`);
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
        router.push("/chats/");
        console.table(response);
        window.localStorage.setItem("logedinUser", JSON.stringify(response));
      } catch (error) {
        setSubmiting(false);
        setSignupError(error.response.data.error);
        console.log(error.response.data.error);
        setTimeout(() => {
          setSignupError("");
        }, 6000);
      }
    }
  };

  // Signin Change Handlers

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const firstnameChangeHandler = (e) => {
    setFirstname(e.target.value);
  };

  const lastnameChangeHandler = (e) => {
    setLastname(e.target.value);
  };

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
    console.log("value is: ", value);
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
        height:"100vh"
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
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  paddingBottom: "40px",
                  transform: "rotate(20deg)",
                }}
              >
                <svg
                  width="220pt"
                  height="180pt"
                  version="1.1"
                  viewBox="0 0 752 752"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m222.54 206.77c-12.695 0-24.988 5.0898-33.965 14.07-8.9766 8.9766-14.07 21.27-14.07 33.965 0.003906 12.621 5.043 24.848 13.93 33.809 7.9102 7.9766 18.562 12.309 29.684 13.375l17.176 30.652c-9.8086 12.637-15.473 28.238-15.492 44.277v0.007812c0 19.109 7.7344 37.777 21.246 51.289 13.516 13.512 32.18 21.238 51.289 21.238h0.007813c15.059-0.019531 29.898-4.8008 42.141-13.57 10.961-7.8516 19.059-18.965 24.234-31.383h29.758c5.0273 12.695 13.082 24.113 24.133 32.188 12.348 9.0234 27.414 13.949 42.707 13.969h0.039062c4.5352-0.011719 9-0.91016 13.449-1.7656l16.031 27.812c-2.7891 6.1836-4.5469 12.797-4.5508 19.602v0.007812c0 12.695 5.0898 24.988 14.07 33.965 8.9766 8.9766 21.27 14.07 33.965 14.07 12.695 0 24.988-5.0898 33.965-14.07 8.9766-8.9766 14.07-21.27 14.07-33.965 0-12.691-5.0898-24.988-14.07-33.965-8.9766-8.9766-21.27-14.059-33.957-14.059h-0.11328c-0.58984 0.007813-1.1914 0.10156-1.7852 0.12891l-14.613-25.363c10.129-12.738 16.012-28.594 16.039-44.918v-0.015625c-0.003906-19.105-7.7266-37.777-21.242-51.289-13.512-13.516-32.184-21.238-51.289-21.238h-0.007812c-15.793 0.015625-31.348 5.2773-43.906 14.855-11.234 8.5664-19.176 20.613-23.855 33.898h-27.035c-4.5156-13.559-12.426-25.902-23.738-34.695-12.652-9.832-28.414-15.238-44.434-15.25h-0.007812c-4.8203 0-9.5586 0.98047-14.281 1.9336l-15.004-26.758c4.582-7.4922 7.4922-15.934 7.5117-24.754v-0.015625c0-12.691-5.082-24.984-14.059-33.965-8.9766-8.9805-21.273-14.066-33.965-14.07zm0 18.941c7.5 0 15.273 3.2188 20.57 8.5195 5.2969 5.2969 8.5078 13.062 8.5078 20.562-0.015625 6.125-2.1055 12.398-5.7617 17.305-3.0078 4.0312-3.3711 9.5195-0.91406 13.91l18.582 33.152c2.8516 5.1133 8.9531 7.6641 14.598 6.1055 4.6172-1.2734 9.418-1.9219 14.207-1.9258 11.715 0.011718 23.59 4.0859 32.836 11.273 9.2461 7.1836 16.121 17.68 19.027 29.016v0.007813c0 0.003906 0.007812 0.003906 0.007812 0.007812 1.4336 5.6172 6.5859 9.6289 12.387 9.6367h34.785c5.7227 0.003906 10.84-3.8867 12.359-9.4062 3.0703-11.137 9.9844-21.375 19.164-28.379 9.1797-7 20.883-10.957 32.43-10.969 13.914 0 28.062 5.8555 37.895 15.688 9.832 9.832 15.688 23.984 15.688 37.895-0.027344 13.031-5.1484 26.27-13.902 35.918h-0.007812v0.007812c-3.7031 4.0938-4.3555 10.203-1.6016 14.984l18.535 32.18c2.5859 4.4805 7.6953 6.9883 12.82 6.2891h0.007812v-0.007812c1.1602-0.16016 2.3711-0.23438 3.5898-0.25 7.4883 0.007812 15.242 3.2109 20.535 8.5 5.3008 5.2969 8.5195 13.074 8.5195 20.57 0 7.4961-3.2188 15.27-8.5195 20.57-5.3008 5.3008-13.074 8.5195-20.57 8.5195s-15.27-3.2188-20.57-8.5195c-5.3008-5.3008-8.5195-13.074-8.5195-20.57 0.003906-4.8359 1.2695-9.75 3.5977-13.984v-0.007812h0.007813c2.1445-3.9102 2.0859-8.6992-0.14062-12.562l-0.007813-0.007813-19.488-33.816c-2.8594-4.957-8.8008-7.4453-14.344-5.9961l-0.007812 0.007813h-0.007813c-4.3945 1.1602-8.9492 1.7617-13.496 1.7773h-0.019531c-11.184-0.015626-22.504-3.7227-31.531-10.324-9.0312-6.6016-16.004-16.266-19.414-26.918l-0.007813-0.007812c-1.6875-5.2578-6.6523-8.8945-12.176-8.9023h-37.105c-5.4492 0.007812-10.359 3.543-12.109 8.7031-3.5625 10.418-10.551 19.816-19.508 26.23-8.957 6.418-20.105 10.004-31.125 10.016-13.914 0-28.059-5.8516-37.895-15.688-9.8359-9.832-15.695-23.977-15.695-37.887v-0.007813c0.019531-12.805 4.9453-25.785 13.422-35.379l-0.019531 0.007813c3.5898-4.0469 4.2383-10.012 1.6016-14.734v-0.007812l-20.387-36.371-0.007812-0.019531c-2.2383-3.9961-6.4805-6.5078-11.062-6.5469h-0.007813c-7.4531-0.066406-15.148-3.3086-20.395-8.6016-5.25-5.293-8.4336-13.016-8.4375-20.469 0-7.4961 3.2188-15.27 8.5195-20.57 5.3008-5.3008 13.074-8.5195 20.57-8.5195zm251.14 222.54-0.019531 0.007812c-0.011719 0.003906-0.023438-0.003906-0.035156 0 0.019531-0.003906 0.039062-0.003906 0.054687-0.007812zm48.523 0.47266c0.007813 0 0.011719 0.011719 0.019532 0.007812h-0.027344z"
                    fill="#e62a75"
                  />
                </svg>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  color: "rgb(180, 17, 180)",
                  marginLeft: "-80px",
                }}
              >
                Covale
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: "100",
                color: "purple",
                marginBottom: "1rem",
              }}
              variant="subtitle1"
            >
              Lorem
            </Typography>
          </Box>
          {/* <ContinueAs user={user} /> */}
        </Box>
        <Box>
          <Signin
            // Signin Change Handlers
            signInHandlerSubmit={signInHandlerSubmit}
            emailChangeHandler={emailChangeHandler}
            passwordChangeHandler={passwordChangeHandler}
            usernameChangeHandler={usernameChangeHandler}
            firstnameChangeHandler={firstnameChangeHandler}
            lastnameChangeHandler={lastnameChangeHandler}
            signUpHandlerSubmit={signUpHandlerSubmit}
            error={error}
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
