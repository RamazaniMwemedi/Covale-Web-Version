import * as React from "react";
import Box from "@mui/material/Box";

import Logo from "../assets/Logo";
import { useTheme } from "@mui/styles";
import { Button, TextField, Typography } from "@mui/material";

function Index() {
  // Coming soon Page

  const theme = useTheme();
  React.useEffect(() => {
    theme.themeChengeHandler("dark-mode");
  }, []);

  const NavBar = () => {
    return (
      <Box
        sx={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          backgroundColor: theme.colors.background1,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "98%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Logo height={50} width={50} />
            <Typography
              variant="body1"
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
        </Box>
      </Box>
    );
  };

  const ComingSoon = () => {
    

    return (
      <Box
        sx={{
          // All the content will be in center of the page
          display: "grid",
          // placeItems: "center",
          width: "100%",
          backgroundColor: theme.colors.background,
        }}
      >
        <br />
        <br />
        
        <Box
          sx={{
            // Rotateing the logo animation in 360 degree
            animation: "spin 50s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        >
          <Logo height={300} width={300} />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <span
            
            className="comming_soon"
          >
            Coming Soon
          </span>
        </Typography>
        <br />
        <br />
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="body1"
        >
          Are you ready to take your team's productivity to the next level?
          Covale has the solution. Our platform is designed to streamline
          processes, improve collaboration, and create a more engaged and
          motivated workforce. Stay tuned for our launch, and experience the
          power of Covale for yourself.
        </Typography>
      </Box>
    );
  };

  const JoinWaitlist = () => {
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [emailHelperText, setEmailHelperText] = React.useState("");

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleEmailBlur = (e) => {
      if (e.target.value === "") {
        setEmailError(true);
        setEmailHelperText("Email is required");
      } else {
        setEmailError(false);
        setEmailHelperText("");
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: theme.colors.background,
        }}
      >
        <br />
        <br />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Join the wait list
        </Typography>
        <br />
        <br />
        <Typography
          sx={{
            width: "50%",
            textAlign: "center",
          }}
          variant="body2"
        >
          We're working hard to bring Covale to you as soon as possible. Enter
          your email address below to be notified when we launch.
        </Typography>
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.colors.background1,
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <TextField
            sx={{
              // Remove border
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            size="small"
            variant="outlined"
            label="Email"
            value={email}
            error={emailError}
            helperText={emailHelperText}
            onChange={handleEmailChange}
            color="secondary"
          />
          <Button
            sx={{
              marginLeft: "10px",
              color: "#fff",
              bgcolor: "#9c27b0",
              textTransform: "none",
            }}
            variant="contained"
            color="secondary"
          >
            Notify Me
          </Button>
        </Box>
        <br />
        <br />
        <br />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        bgcolor: theme.colors.background,
        height: "100vh",
      }}
    >
      <NavBar />
      <ComingSoon />
      <JoinWaitlist />
    </Box>
  );
}

export default Index;
