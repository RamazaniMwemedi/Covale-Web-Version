import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import * as React from "react";
// My Modules
import DrawerComponent from "../components/DrawerComponent";
import PeopleLeft from "../components/PeopleLeft";
import router from "next/router";

export default function People() {
  // user
  const [user, setUser] = React.useState(null);


  React.useEffect(
    () => {
      // user from localStorage
      const signedInUser = localStorage.getItem("logedinUser");
      if (!signedInUser) {
        router.push("/");
      }
      if (user === null) {
        setUser(JSON.parse(signedInUser));
      }
    },
    [user]
  );

  // Signout Handler
  const signoutHandler = () => {
    setUser(null);
    localStorage.removeItem("logedinUser");
    router.push("/");
  }

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <PeopleLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}
