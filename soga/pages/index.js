import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
// CSS
import styles from "../styles/Login.module.css";
// My modules
import loginServices from "../services/login";
import CreateAccount from "./components/CreateAccount";

const LoginPage = () => {
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
  const [signupGender, setSignupGender]= useState(null)

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
  const [signupGenderError, setSignupGenderError] = useState("")
  const [signupError, setSignupError] = useState("")
  const signupRef = useRef(null);

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
        const data = {
          email,
          password,
        };
        const response = await loginServices.signIn(data);

        console.log(response);
        if (response) {
          window.localStorage.setItem("logedinUser", JSON.stringify(response));
          router.push(`/chats/${1}`);
        }
      } catch (exception) {
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
      setSignupBirthdayError("You must be 13 years or above")
      setTimeout(() => {
        setSignupBirthdayError("")
      }, 3000);
    }else if(!signupGender){
      setSignupGenderError("Gender is required")
      setTimeout(() => {
        setSignupGenderError("")
      }, 3000);
    } else {
      try {
        const response = await loginServices.signUp(data);
        router.push("/chats/");
        console.table(response);
        window.localStorage.setItem("logedinUser", JSON.stringify(response));
      } catch (error) {
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
    setSignupGender(e.target.value)
   }

  return (
    <div className={styles.login}>
      <div className={styles.login_left}>
        <div className={styles.login_left_top}>
          <h1 className={styles.main_soga}>Covalent</h1>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "purple",
              marginBottom: "1rem",
            }}
          >
            Connect with people you love, share your stories and explore the
            world.
          </p>
        </div>
        {/* <ContinueAs user={user} /> */}
      </div>
      <div className={styles.login_right}>
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
        />
        <br />
      </div>
    </div>
  );
};

export default LoginPage;

const Signin = (props) => {
  return (
    <div className={styles.signin_container}>
      <form onSubmit={props.signInHandlerSubmit} className={styles.signin_form}>
        <h4>Sign in</h4>
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
        <Button variant="contained" type="submit" color="secondary">
          Signin
        </Button>
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
      />
    </div>
  );
};

const ContinueAs = ({ user }) => {
  console.log("The user is: ", user);
  return (
    <div className={styles.continue_as}>
      <Typography variant="h5">Continue as</Typography>
      <div className={styles.continue_as_user}>
        <h4>{user.username}</h4>
      </div>
    </div>
  );
};
