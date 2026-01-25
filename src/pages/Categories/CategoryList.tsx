import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { deleteCategory, fetchCategories } from "../../api/categories";
import type { Category } from "../../types/catalog";

export default function CategoryList() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Categories
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/categories/add")}
      >
        Add Category
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell width={80} />
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/products?category=${cat.id}`)}
                  >
                    View Products
                  </Button>
                </TableCell>
                <TableCell>
                  {new Date(cat.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => deleteMutation.mutate(cat.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
