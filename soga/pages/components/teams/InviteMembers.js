import {
  Autocomplete,
  Avatar,
  Checkbox,
  Paper,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/styles";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { inviteFriends } from "../../../services/teams";
import { useGetFriends, useCheckLogedinUserToken } from "../../../hooks/hooks";
import { RTC_ADDRESS } from "../../../config";
import { useSelector } from "react-redux";

const notificationSocket = io.connect(`${RTC_ADDRESS}/notification`);

const InviteMembers = ({ teamId, showInviteMembersHandler }) => {
  const [selectedColleagues, setSelectedColleagues] = useState([]);
  const userStore = useSelector((state) => state.user);
  const user = userStore.user;
  const userId = user ? user.id : null;
  const token = useCheckLogedinUserToken();
  useEffect(() => {
    if (userId) {
      notificationSocket.emit("join_notification_room", "notification");
    }
  }, [userId]);
  // invitingBool state
  const [invitingBool, setInvitingBool] = useState(false);
  const friends = useGetFriends();
  const theme = useTheme();
  const sendInvitation = async () => {
    if (token && selectedColleagues.length > 0 && teamId) {
      setInvitingBool(true);
      const res = await inviteFriends(token, teamId, selectedColleagues);
      console.log("RES Status :", res.status);
      if (res.status == 200) {
        const invitations = res.data;
        if (invitations.length > 0) {
          invitations.forEach((invitation) => {
            const notification = {
              senderId: invitation.inviter.id,
              recieverId: invitation.invitee.id,
              typeofNotification: "joinTeam",
              notifiHead: "Invitation to join a team",
              notifiBody: `${invitation.inviter.firstname} ${invitation.inviter.lastname} invited you to join the ${invitation.team.teamName} team`,
              link: `/teams/join/?s=${invitation.inviter.id}&r=${invitation.invitee.id}&ti=${invitation.team.id}&ii=${invitation.id}&t=${invitation.token}`,
            };
            console.log("Notification :", notification)
            notificationSocket.emit("send_notification", notification);
          });
        }
        // showInviteMembersHandler();
        setSelectedColleagues((prev) => []);
        setInvitingBool(false);
      }
    }
  };
  // Handler for selected friends
  // Step 3 Change Handler
  const selectedColuegesChangeHandler = (values) => {
    const friendsIds = values.map((value) => {
      return value.id;
    });
    setSelectedColleagues(friendsIds);
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
        m: 1,
        p: 1,
        borderRadius: "10px",
      }}
    >
      {" "}
      <Typography variant="body1">Invite your Colleagues</Typography>
      <br />
      <Box
        sx={{
          height: "auto",
          display: "block",
          alingItem: "center",
          textAlign: "center",
        }}
      >
        {friends ? (
          <>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={friends}
              getOptionLabel={
                (person) => `${person.firstname} ${person.lastname}`
                // <PersonOption person={person} />
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Coleages"
                  placeholder="Search a Coleage"
                  color="secondary"
                  size="small"
                />
              )}
              sx={{ width: "auto", maxHeight: "200px" }}
              onChange={(event, value) => selectedColuegesChangeHandler(value)}
            />
          </>
        ) : (
          <Box
            sx={
              {
                // marginTop: "100px",
                // marginLeft: "130px",
                // padding: "145px",
              }
            }
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {friends &&
          (invitingBool ? (
            <LoadingButton
              loading
              startIcon={<SaveIcon />}
              loadingPosition="start"
              variant="contained"
            >
              Inviting
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "10px",
              }}
              onClick={() => {
                sendInvitation();
              }}
              size="small"
            >
              Invite
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default InviteMembers;
