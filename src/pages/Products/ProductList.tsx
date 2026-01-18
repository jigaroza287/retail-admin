import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { Product } from "../../types/product";
import { fetchProducts } from "./Product.api";
import { SearchBar } from "../../components/Table/SearchBar";
import { PaginationControl } from "../../components/Table/PaginationControl";
import { FilterBar } from "../../components/Table/FilterBar";

export default function ProductList() {
  const navigate = useNavigate();

  // State for search + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["products", { search, page, limit }],
    queryFn: () => fetchProducts({ search, page, limit }),
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Products
      </Typography>

      {/* Search + Add Button */}
      <FilterBar>
        <SearchBar value={search} onChange={setSearch} />
        <Button variant="contained" onClick={() => navigate("/products/add")}>
          Add Product
        </Button>
      </FilterBar>

      <Paper sx={{ padding: 2 }}>
        {isLoading ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.data.map((p: Product) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell>{p.inStock ? "Yes" : "No"}</TableCell>
                    <TableCell>{p.description ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <PaginationControl
              total={data?.total ?? 0}
              page={page}
              limit={limit}
              onChange={(newPage, newLimit) => {
                setPage(newPage);
                setLimit(newLimit);
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
