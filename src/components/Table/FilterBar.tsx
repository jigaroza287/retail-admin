import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function FilterBar({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
    >
      {children}
    </Box>
  );
}
