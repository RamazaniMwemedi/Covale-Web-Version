import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// React-Redux hooks
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import { addNewMessageToTeamIdFromSender } from "../Redux/slices/team";
import config from "../config";
// Socket.IO
// https://rtcommunication.herokuapp.com/
// http://localhost:5005/
const socketIO: any = io;

const teamSocket = socketIO.connect(`${config.RTC_ADDRESS}/team`);

import { getTeams } from "../services/teams";
import { allTeams } from "../Redux/slices/team";
import { RootState, TeamInterface } from "../interfaces/myprofile";

export const useTeamId = (id: string) => {
  const allTeams = useSelector((state: RootState) => state.teams);
  const [team, setTeam] = useState<TeamInterface>();
  useEffect(() => {
    if (allTeams.teams) {
      if (allTeams.teams.length > 0 && id) {
        setTeam(allTeams.teams.find((team) => team.id === id));
      }
    }
  }, [allTeams, id]);

  return team;
};

export const useGetTeams = (token: string) => {
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

export const useJoinTeamRoom = (id: string) => {
  useEffect(() => {
    if (id) {
      teamSocket.emit("join_team_room", id);
    }
  }, [id]);
};

export const useRecieveNewTeamMessage = (user: string, userId: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    teamSocket.on("receive_message_to_team", (data: any) => {
      if (data && data.sender != userId) {
        dispatch(
          addNewMessageToTeamIdFromSender({
            teamId: data.teamId,
            data: data,
          })
        );
      }
    });
  }, [teamSocket, user]);
};
const mod = {
  useTeamId,
  useGetTeams,
  useJoinTeamRoom,
  useRecieveNewTeamMessage,
};

export default mod;
