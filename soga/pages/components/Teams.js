import React, { useState } from "react";
import FloatingAButton from "./FloatingAButton";
import {
  Avatar,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
  Icon,
  InputLabel,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTheme } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

// My components
import AddMoreFriends from "./AddMoreFriends";
import Team from "./Team";
import FloatingATeamB from "./FloatingATeamB";
import CreateTeam from "./CreateTeam";

const Teams = ({ teams, openCreateTeam, toggleShowTeam, teamLoading }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.colors.background1,
          borderRadius: "5px",
          marginBottom: "10px",
          alignItems: "center",
          textAlign: "center",
          justiContent: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
          <InputLabel color="secondary">Teams</InputLabel>

          <OutlinedInput
            startAdornment={
              <InputAdornment
                sx={{
                  marginLeft: "-15px",
                }}
                position="start"
              >
                <IconButton>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
            id="outlined-adornment-password"
            type="text"
            value=""
            label="Team"
            onChange={() => {}}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            color="secondary"
          />
        </FormControl>
      </Box>
      {teamLoading ? (
        <Stack spacing={1}>
          {[...Array(7)].map((_, i) => (
            <ListItem
              key={i}
              sx={{
                display: "flex",
                // border style
                borderStyle: " solid ",
                // border color
                borderColor: "lightgrey",
                // border width
                borderWidth: "2px",
                borderRadius: "0.5rem",
              }}
            >
              {/* Avatar skeleton */}
              <Skeleton
                variant="circle"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
              {/* Skeleton for user first and lastname */}
              <Box sx={{}}>
                <Skeleton
                  variant="rect"
                  width={185}
                  height={20}
                  style={{ marginLeft: "10px" }}
                />
                <Skeleton
                  variant="rect"
                  width={185}
                  height={8}
                  style={{ marginLeft: "10px", marginTop: "8px" }}
                />
              </Box>
            </ListItem>
          ))}
          {/* A skeleton of ListItem skeleton for chat */}
        </Stack>
      ) : (
        <>
          {teams &&
            //   If teams are greater than 0
            (teams.length > 0 ? (
              <Box>
                {openCreateTeam && (
                  <CreateTeam toggleShowTeam={toggleShowTeam} />
                )}

                {!openCreateTeam && (
                  <FloatingATeamB toggleShowTeam={toggleShowTeam} />
                )}
                {teams.map((team,i) => {
                  return <Team key={i} team={team} />;
                })}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", marginTop: "150px" }}>
                <Typography variant="h5" color="secondary">
                  No Team yet
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  Click the{" "}
                  {
                    <Icon>
                      <AddIcon
                        sx={{
                          width: "15px",
                          height: "15px",
                        }}
                      />
                    </Icon>
                  }{" "}
                  to start a team
                </Typography>
              </Box>
            ))}
        </>
      )}
    </>
  );
};

export default Teams;
