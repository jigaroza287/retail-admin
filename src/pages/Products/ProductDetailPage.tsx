import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { fetchProductDetail, deleteVariant } from "../../api/productDetails";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id!),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  if (isLoading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (!data) {
    return <Box p={4}>Not found</Box>;
  }

  const { product, variants, categoryName } = data;

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {product.name}
      </Typography>

      <Typography variant="body1" mb={4}>
        Category: <strong>{categoryName}</strong>
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate(`/products/${product.id}/variants/add`)}
      >
        Add Variant
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell width={80}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {variants.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.sku}</TableCell>
                <TableCell>{v.size ?? "-"}</TableCell>
                <TableCell>{v.color ?? "-"}</TableCell>
                <TableCell>
                  {new Date(v.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/variants/${v.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteMutation.mutate(v.id)}
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
