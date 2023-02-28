import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import * as React from "react";
// My Modules
import DrawerComponent from "../components/others/DrawerComponent";
import PeopleLeft from "../components/colleagues/PeopleLeft";
import router from "next/router";
import { Typography } from "@mui/material";

export default function People() {
  // user
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // user from localStorage
    const signedInUser = localStorage.getItem("logedinUser");
    if (!signedInUser) {
      router.push("/");
    }
    if (user === null) {
      setUser(JSON.parse(signedInUser));
    }
  }, [user]);



  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <DrawerComponent/>
      <PeopleLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "-5pc" }}>
        <Typography variant="h1" color="secondary">
          Sugested People
        </Typography>
      </Box>
    </Box>
  );
}
