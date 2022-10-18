import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";

// Hooks
import { useCheckLogedinUser } from "../../hooks/hooks";
import LoadingLogo from "../components/LoadingLogo";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../Redux/slices/user";
// Redux

export default function Chat() {
  const theme = useTheme();
  const userLoading = useCheckLogedinUser();
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    userStore = null;
    router.push("/login");
    dispatch(removeUser());
  };

  return (
    <>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: theme.colors.background,
          }}
        >
          <CssBaseline />
          {userStore.user ? (
            <>
              <DrawerComponent
                signoutHandler={signoutHandler}
                user={userStore.user}
              />
              <ChatLeft user={userStore.user} />

              <ClickaChat />
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </>
  );
}

const ClickaChat = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        margin: "200px",
      }}
    >
      <Typography variant="h1">Click a chat</Typography>
    </Box>
  );
};
