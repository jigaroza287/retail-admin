import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { useState } from "react";

import {
  deleteProduct,
  fetchProducts,
  PaginatedProducts,
} from "../../api/products";
import type { ProductListItem } from "../../types/catalog";

import { useNavigate } from "react-router-dom";
import { FilterBar } from "../../components/Table/FilterBar";
import { PaginationControl } from "../../components/Table/PaginationControl";
import { SearchBar } from "../../components/Table/SearchBar";

export default function ProductList() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery<PaginatedProducts>({
    queryKey: ["products", { search, page, limit }],
    queryFn: () => fetchProducts({ search, page, limit }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Products
      </Typography>

      <FilterBar>
        <SearchBar value={search} onChange={setSearch} />
        <Button variant="contained" onClick={() => navigate("/products/add")}>
          Add Product
        </Button>
      </FilterBar>

      <Paper>
        {isLoading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>Loading...</Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Variants</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell width={80}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.data.map((p: ProductListItem) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.categoryName}</TableCell>
                    <TableCell>{p.variantCount}</TableCell>
                    <TableCell>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => navigate(`/products/${p.id}`)}>
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => deleteMutation.mutate(p.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <PaginationControl
              total={data?.total ?? 0}
              page={page}
              limit={limit}
              onChange={(p, l) => {
                setPage(p);
                setLimit(l);
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
