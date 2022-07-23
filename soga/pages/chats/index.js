import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// Components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";
import chatService from "../../services/chats";
import { responsiveFontSizes } from "@mui/material";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const router = useRouter();

  const token = user ? user.token : null;

  useEffect((user, router) => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (!user) {
      setUser(JSON.parse(signedInUser));
    } else {
      setUser(null);
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // log chats
  console.log(chats);

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    setUser(null);
    router.push("/");
    console.log("signoutHandler");
  };
  console.log("User", user);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <App user={user} signoutHandler={signoutHandler} />
      )}
    </>
  );
}

// Signout handler

function App({ user, signoutHandler }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <ChatLeft user={user} />
        
      </Box>
    </Box>
  );
}
