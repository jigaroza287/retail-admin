import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const drawerWidth = 240;

export function Sidebar() {
  const { user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <List>
        <ListItemButton component={NavLink} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/categories">
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>{" "}
        <ListItemButton component={NavLink} to="/orders">
          <ListItemText primary="Orders" />
        </ListItemButton>
        {user?.role?.toLowerCase() === "admin" && (
          <ListItemButton component={NavLink} to="/users">
            <ListItemText primary="Users" />
          </ListItemButton>
        )}{" "}
      </List>
    </Drawer>
  );
}
