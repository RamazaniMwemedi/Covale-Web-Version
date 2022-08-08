import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/styles";
// My Modules
import DrawerComponent from "./components/DrawerComponent";
import CalenderLeft from "./components/CalenderLeft";
import CalenderSection from "./components/CalenderSection";

export default function Calendar() {
  const theme = useTheme();
  const [value, setValue] = React.useState(new Date());
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
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
      <CalenderLeft handleChange={handleChange} value={value} />
      <Box component="main" sx={{ display: "flex", height: "100%",  }}>
        {/* App will start here */}
        <CalenderSection handleChange={handleChange} value={value} />
      </Box>
    </Box>
  );
}
