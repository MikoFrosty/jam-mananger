import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function AppBarComponent() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <PhotoCameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Album layout
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
