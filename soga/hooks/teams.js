const { useRouter } = require("next/router");
const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");

const { getTeams } = require("../services/teams");
const { allTeams } = require("../Redux/slices/team");

const useTeamId = (id) => {
  const allTeams = useSelector((state) => state.chats);
  const [team, setTeam] = useState(null);
  useEffect(() => {
    if (allTeams.teams) {
      if (allTeams.teams.length > 0 && id) {
        setChat(allTeams.teams.find((team) => team.id === id));
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
        console.log("My RES: ", res);
        dispatch(allTeams(res));
      });
    }
  }, [token]);
};

module.exports = {
  useTeamId,
  useGetTeams,
};
