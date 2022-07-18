import * as React from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// My Modules
import DrawerComponent from "./components/DrawerComponent";
import CalenderLeft from "./components/CalenderLeft";
import CalenderSection from "./components/CalenderSection"

export default function Calls() {
      const [value, setValue] = React.useState(new Date());
const handleChange = (newValue, ) => {
    setValue(newValue);
    }

    return (
        <Box sx={{ display: "flex", height:"100%" }}>
        <CssBaseline />
        <DrawerComponent />
        <CalenderLeft handleChange={handleChange} value={value} />
        <Box component="main" sx={{ display: "flex", height:"100%" }}>
            {/* App will start here */}
            <CalenderSection handleChange={handleChange} value={value}/>
        </Box>
        </Box>
    );
    }