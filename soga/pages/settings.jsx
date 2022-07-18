import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// My Modules
import DrawerComponent from "./components/DrawerComponent";

export default function Settings() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerComponent />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* App will start here */}
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
      </Box>
    </Box>
  );
}
