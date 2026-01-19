import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchCategories } from "../../api/categories";
import { createProduct } from "../../api/products";

interface FormData {
  name: string;
  categoryId: string;
}

export default function ProductForm() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    },
  });

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <>
      <Button onClick={() => navigate("/products")} sx={{ mb: 2 }}>
        ← Back to Products
      </Button>
      <Paper sx={{ p: 3, maxWidth: 480 }}>
        <Typography variant="h6" mb={2}>
          Add Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Product Name"
            fullWidth
            {...register("name", { required: true })}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Category"
            {...register("categoryId", { required: true })}
            margin="normal"
          >
            {categories?.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Paper>
    </>
  );
}
