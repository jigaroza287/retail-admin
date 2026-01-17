import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

import { productSchema, ProductFormData } from "./Product.schema";
import { createProduct, updateProduct } from "./Product.api";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {
  mode: "add" | "edit";
  defaultValues?: ProductFormData;
  productId?: string;
}

export default function ProductForm({
  mode,
  defaultValues,
  productId,
}: ProductFormProps) {
  const navigate = useNavigate();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      inStock: true,
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: ProductFormData): Promise<void> => {
    if (mode === "add") {
      await createProduct(data);
    } else {
      if (!productId) return;
      await updateProduct(productId, data);
    }

    navigate("/products");
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500 }}>
      <Typography variant="h6" mb={2}>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          {...register("price", { valueAsNumber: true })}
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
        />

        <FormControlLabel
          control={<Switch {...register("inStock")} defaultChecked />}
          label="In Stock"
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          {...register("description")}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {mode === "add" ? "Create" : "Update"}
        </Button>
      </Box>
    </Paper>
  );
}
