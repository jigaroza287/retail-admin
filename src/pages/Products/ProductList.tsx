import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

export default function ProductList() {
  const { data, isLoading, error } = useProducts();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper sx={{ padding: 2 }}>
      <h2>Products</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.inStock ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/products/add")}
      >
        Add Product
      </Button>
    </Paper>
  );
}
