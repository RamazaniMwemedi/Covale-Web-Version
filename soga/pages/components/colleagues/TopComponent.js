import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";

const TopComponent = ({
  showSearchField,
  handleToggleShowSearch,
  title,
  routeUrl,
  routeText,
}) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        position: "sticky",
        top: "0",
        bgcolor: theme.colors.background1,
        p: 1,
        zIndex: 1,
      }}
    >
      <Typography variant="h6" color="secondary">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {showSearchField ? (
          <FormControl
            sx={{
              m: 1,
            }}
            variant="outlined"
          >
            <OutlinedInput
              startAdornment={
                <InputAdornment
                  sx={{
                    marginLeft: "-15px",
                  }}
                  position="start"
                >
                  <IconButton onClick={handleToggleShowSearch}>
                    <SearchOffRoundedIcon color="secondary" />
                  </IconButton>
                </InputAdornment>
              }
              id="outlined-adornment-password"
              type="text"
              sx={{
                height: "35px",
                borderRadius: "15px",
              }}
              color="secondary"
            />
          </FormControl>
        ) : (
          <IconButton
            sx={{
              backgroundColor: theme.colors.textBackground,
            }}
            size="small"
            onClick={handleToggleShowSearch}
          >
            <SearchRoundedIcon color="secondary" />
          </IconButton>
        )}
        <Button
          onClick={() => {
            router.push(routeUrl);
          }}
          variant="contained"
          sx={{
            ml: 1,
            borderRadius: "8px",
            borderColor: "plum",
            borderWidth: "1.5px",
            padding: "8px",
            textTransform: "unset",
            height: "25px",
          }}
          color="secondary"
          size="small"
        >
          {routeText}
        </Button>
      </Box>
    </Box>
  );
};

TopComponent.propTypes = {
  showSearchField: PropTypes.bool.isRequired,
  handleToggleShowSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  routeUrl: PropTypes.string.isRequired,
  routeText: PropTypes.string.isRequired,
};

export default TopComponent;
