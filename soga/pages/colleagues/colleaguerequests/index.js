import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

// My Modules
import DrawerComponent from "../../components/others/DrawerComponent";
import PeopleLeft from "../../components/colleagues/PeopleLeft";
import PersonRequest from "../../components/colleagues/PersonRequest";
import userServices from "../../../services/user";
import { useTheme } from "@mui/system";
import TopComponent from "../../components/colleagues/TopComponent";
import { useSelector } from "react-redux";

export default function Explore() {
  const [users, setUsers] = React.useState([]);
  const router = useRouter();
  const [showSearchField, setShowSearchField] = React.useState(false);
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true);

  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;

  const handleToggleShowSearch = () => {
    setShowSearchField((prev) => !prev);
  };

  React.useEffect(() => {
    if (token) {
      userServices.friendReqRecieved(token).then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100vh",
        bgcolor: theme.colors.background,
      }}
    >
      {" "}
      {/* <CssBaseline /> */}
      <DrawerComponent />
      <PeopleLeft />{" "}
      <Box
        sx={{
          flex: 1,
          grow: 1,
          height: "100%",
          marginLeft: "-4rem",
        }}
      >
        <Box
          sx={{
            // flex: 1,
            // grow: 1,
            height: "100%",
          }}
        >
          {" "}
          <TopComponent
            handleToggleShowSearch={handleToggleShowSearch}
            routeText="Colleagues Requests Sent"
            routeUrl="/colleagues/colleaguerequests/sent"
            showSearchField={showSearchField}
            title="Colleague Requests"
          />
          {loading ? (
            <p>Loadind</p>
          ) : (
            <>
              {users.length > 0 ? (
                <People users={users} token={token} />
              ) : (
                <NoFriendsRequest />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const People = ({ users, token }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "10px",
      }}
    >
      {users.map((user) => (
        <PersonRequest key={user.id} user={user} token={token} />
      ))}
    </Box>
  );
};

const NoFriendsRequest = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginTop: "190px",
      }}
    >
      <Typography variant="h5">
        You Have No Friend Request At The Momemt
      </Typography>
      <br />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => router.push("/colleagues/explore")}
      >
        Explore New People{" "}
      </Button>
    </Box>
  );
};
