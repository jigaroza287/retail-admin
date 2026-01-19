import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Breadcrumbs,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVariant, fetchProductDetail } from "../../api/productDetails";

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
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        {variants.length} variant(s)
      </Typography>

      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/products">Products</Link>
        <Typography>{product.name}</Typography>
      </Breadcrumbs>

      <Typography variant="h5" mb={2}>
        {product.name}
      </Typography>

      <Typography variant="body1" mb={4}>
        Category: <strong>{categoryName}</strong>
      </Typography>

      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        onClick={() => navigate(`/products/edit/${product.id}`)}
      >
        Edit Product
      </Button>

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
                <IconButton
                  onClick={() => navigator.clipboard.writeText(v.sku)}
                >
                  <ContentCopyIcon />
                </IconButton>
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
      <Button onClick={() => navigate("/products")} sx={{ mb: 2 }}>
        ← Back to Products
      </Button>
    </Box>
  );
}
