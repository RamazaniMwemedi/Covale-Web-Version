import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TopComponent = ({
  showSearchField,
  handleToggleShowSearch,
  title,
  routeUrl,
  routeText,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
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
                placeholder="Search for colleagues"
                onChange={handleSearchTerm}
                value={searchTerm}
              />
            </FormControl>
            <Box
              sx={{
                width: "30%",
                minHeight: "100px",
                maxHeight: "600px",
                borderRadius: "8px",
                boxShadow: 1,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.4)",
                position: "absolute",
                top: "55px",
                backdropFilter: "blur(5px)",

                zIndex: 1,
                overflowY: "scroll",
                overflowX: "hidden",
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {searchTerm.length > 0 ? (
                <SearchField searchTerm={searchTerm} />
              ) : (
                <Typography
                  sx={{
                    pt: 4,
                  }}
                  variant="body1"
                >
                  Start typing to search for colleagues
                </Typography>
              )}
            </Box>
          </Box>
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

// Search field and results display

const SearchField = ({ searchTerm }) => {
  const colleaguesStore = useSelector((state) => state.colleagues);
  const colleagues =
    colleaguesStore.colleagues.explore && colleaguesStore.colleagues.explore
      ? colleaguesStore.colleagues.explore
      : [];
  const theme = useTheme();

  const filteredColleagues = colleagues.filter((colleague) => {
    // search by username or first name or last name
    return (
      colleague.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <Box
      sx={
        {
          //  Should be on top of the other components
        }
      }
    >
      {filteredColleagues.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            gap: 1,
          }}
        >
          {filteredColleagues.map((colleague) => (
            <Box
              key={colleague.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                gap: 1,
              }}
            >
              <ColleagueCard colleague={colleague} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6" color="secondary">
            No results found
          </Typography>
          <Typography variant="body2" color="secondary">
            Try searching for a colleague's name
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const ColleagueCard = ({ colleague }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        width: "100%",
        bgcolor: theme.colors.background1,
        borderRadius: "8px",
        p: 1,
        mb: 1,
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/profile/${colleague.id}`);
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: "10px",
            }}
            alt={colleague.firstname}
            // src={colleague.avatar}
          >
            {colleague.firstname[0]} {colleague.lastname[0]}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">
              {colleague.firstname} {colleague.lastname}
            </Typography>
            <Typography variant="caption">
              {/* Colleague Bio */}
              {colleague.bio && colleague.bio.length > 30
                ? colleague.bio.slice(0, 30) + "..."
                : colleague.bio}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
