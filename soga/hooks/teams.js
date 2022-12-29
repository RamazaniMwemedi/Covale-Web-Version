const { useRouter } = require("next/router");
const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");
const io = require("socket.io-client");

const { addNewMessageToTeamIdFromSender } = require("../Redux/slices/team");
const { RTC_ADDRESS } = require("../config");
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/

const teamSocket = io.connect(`${RTC_ADDRESS}/team`);

const { getTeams } = require("../services/teams");
const { allTeams } = require("../Redux/slices/team");

const useTeamId = (id) => {
  const allTeams = useSelector((state) => state.teams);
  const [team, setTeam] = useState(null);
  useEffect(() => {
    if (allTeams.teams) {
      if (allTeams.teams.length > 0 && id) {
        setTeam(allTeams.teams.find((team) => team.id === id));
      }
    }
  }, [allTeams, id]);

  return team;
};

const useGetTeams = (token) => {
  const router = useRouter();

  const dispatch = useDispatch();

  // Get chat by id and set it to chat
  useEffect(() => {
    // Clear Chat Store

    if (token) {
      getTeams(token).then((res) => {
        dispatch(allTeams(res));
      });
    }
  }, [token]);
};

const useJoinTeamRoom = (id) => {
  useEffect(() => {
    if (id) {
      teamSocket.emit("join_team_room", id);
    }
  }, [id]);
};

const useRecieveNewTeamMessage = (user, userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    teamSocket.on("receive_message_to_team", (data) => {
      if (data && data.sender != userId) {
        dispatch(
          addNewMessageToTeamIdFromSender({
            teamId: data.teamRoom,
            data: data,
          })
        );
      }
    });
  }, [teamSocket, user]);
};
module.exports = {
  useTeamId,
  useGetTeams,
  useJoinTeamRoom,
  useRecieveNewTeamMessage,
};
