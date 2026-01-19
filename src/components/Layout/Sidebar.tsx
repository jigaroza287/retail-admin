import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <List>
        <ListItemButton component={NavLink} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListSubheader>Catalog</ListSubheader>
        <ListItemButton component={NavLink} to="/categories">
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>{" "}
        <ListItemButton component={NavLink} to="/orders">
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/users">
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
