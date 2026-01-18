import { TablePagination } from "@mui/material";

interface Props {
  total: number;
  page: number;
  limit: number;
  onChange: (page: number, limit: number) => void;
}

export function PaginationControl({ total, page, limit, onChange }: Props) {
  return (
    <TablePagination
      component="div"
      count={total}
      page={page - 1}
      rowsPerPage={limit}
      onPageChange={(_, newPage) => onChange(newPage + 1, limit)}
      onRowsPerPageChange={(e) => onChange(1, Number(e.target.value))}
    />
  );
}
