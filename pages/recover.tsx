import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import validator from "validator";

import Logo from "../assets/Logo";

const Recover = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const checkEmail = () => {
    setLoading(true);
    if (!validator.isEmail(email)) {
      setError("Invalid email address");
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
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
        <Typography align="center" variant="h6">
          Find your account
        </Typography>
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
        {error && <Alert severity="error">{error}</Alert>}
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
    </Box>
  );
};

export default Recover;
