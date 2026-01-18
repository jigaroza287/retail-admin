import { Chip } from "@mui/material";
import { UserRole } from "../../auth/auth.types";

interface Props {
  role: UserRole;
}

export function UserRoleBadge({ role }: Props) {
  const color =
    role === "admin" ? "error" : role === "manager" ? "primary" : "default";

  return <Chip label={role.toUpperCase()} color={color} size="small" />;
}
