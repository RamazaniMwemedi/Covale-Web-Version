import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// My Modules
import DrawerComponent from "./components/others/DrawerComponent";

export default function About() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerComponent />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* App will start here */}
        <Typography variant="h4" component="h1" gutterBottom>
          About
        </Typography>
      </Box>
    </Box>
  );
}
