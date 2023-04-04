import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

import CssBaseline from "@mui/material/CssBaseline";
// My Modules
import DrawerComponent from "../components/others/DrawerComponent";
import MeetLeft from "../components/meets/MeetLeft";
import MeetSection from "../components/meets/MeetSection";

export default function Calendar() {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  React.useLayoutEffect(() => {
    // Loged in user from localStorage
    const signedInUser = localStorage.getItem("logedinUser");
    if (!signedInUser) {
      router.push("/");
    }
    if (user === null) {
      setUser(JSON.parse(signedInUser));
    }
  }, [user]);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <DrawerComponent user={user} />
      <Box component="main" sx={{ display: "flex", height: "100%" }}>
        {/* App will start here */}
        <MeetLeft />
        <MeetSection />
      </Box>
    </Box>
  );
}
