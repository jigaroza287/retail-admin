import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import { useThemeContext } from "../../theme/ThemeContext";

export function Navbar() {
  const { mode, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          Khushi Imitation Jewelry
        </Typography>

        <Typography sx={{ mr: 2 }}>{user?.name}</Typography>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>

        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
