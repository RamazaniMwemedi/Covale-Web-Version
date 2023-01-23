import React, { useState } from "react";
import FloatingAButton from "../chats/FloatingAButton";
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
import GroupAddIcon from "@mui/icons-material/GroupAdd";

// My components
import AddMoreFriends from "../chats/AddMoreFriends";
import Team from "./Team";
import FloatingATeamB from "./FloatingATeamB";
import CreateTeam from "./CreateTeam";
import { useSelector } from "react-redux";

const Teams = ({ openCreateTeam, toggleShowTeam }) => {
  const theme = useTheme();
  const [filterTeamName, setfilterTeamName] = useState("");
  const [allFilteredTeams, setAllFilteredTeams] = useState([]);
  let teamLoading = true;
  const teams = useSelector((state) => {
    if (state.teams.teams) {
      teamLoading = false;
    }
    return state.teams.teams;
  });
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
            value={filterTeamName}
            label="Team"
            onChange={(e) => {
              setfilterTeamName(e.target.value);
              setAllFilteredTeams(
                //  When the e.target.value is empty, this return an empty array otherwise it returns an array of filtered chats
                e.target.value.length < 1
                  ? []
                  : teams.filter((team) =>
                      team.teamName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
              );
            }}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            color="secondary"
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          // it should be scrowable
          height: "79vh",
          overflowY: "scroll",
          overflowX: "hidden",
          borderRadius: "5px",
          marginBottom: "10px",
          alignItems: "center",
          textAlign: "center",
          justiContent: "center",
        }}
      >
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
            {filterTeamName.length > 0 && allFilteredTeams.length > 0 ? (
              <Box>
                {allFilteredTeams.map((team, i) => {
                  return <Team key={i} team={team} />;
                })}
              </Box>
            ) : (
              filterTeamName.length > 0 && (
                <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                  <Typography variant="h6" color="secondary">
                    No Team found
                  </Typography>
                </Box>
              )
            )}
            {teams &&
              filterTeamName.length < 1 &&
              //   If teams are greater than 0
              (teams.length > 0 ? (
                <Box>
                  {openCreateTeam && (
                    <CreateTeam toggleShowTeam={toggleShowTeam} />
                  )}

                  {teams.map((team, i) => {
                    return <Team key={i} team={team} />;
                  })}
                  {!openCreateTeam && (
                    <FloatingATeamB toggleShowTeam={toggleShowTeam} />
                  )}
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
                        <GroupAddIcon
                          sx={{
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      </Icon>
                    }{" "}
                    to start a team
                  </Typography>
                  {openCreateTeam && (
                    <CreateTeam toggleShowTeam={toggleShowTeam} />
                  )}
                  {!openCreateTeam && (
                    <FloatingATeamB toggleShowTeam={toggleShowTeam} />
                  )}
                </Box>
              ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Teams;
