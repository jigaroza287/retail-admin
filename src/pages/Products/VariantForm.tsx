import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createVariant,
  updateVariant,
  fetchProductDetail,
} from "../../api/productDetails";

interface FormData {
  sku: string;
  size?: string;
  color?: string;
}

export default function VariantForm() {
  const params = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const productId = params.id; // for add
  const variantId = params.variantId; // for edit

  const isEdit = Boolean(variantId);

  const { data: productData } = useQuery({
    enabled: isEdit,
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetail(productId!),
  });

  const variant = isEdit
    ? productData?.variants.find((v) => v.id === variantId)
    : null;

  const mutation = useMutation({
    mutationFn: (payload: FormData) =>
      isEdit
        ? updateVariant(variantId!, payload)
        : createVariant(productId!, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product", productId] });
      navigate(`/products/${productId}`);
    },
  });

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      sku: "",
      size: "",
      color: "",
    },
  });

  if (variant) {
    setValue("sku", variant.sku);
    setValue("size", variant.size ?? "");
    setValue("color", variant.color ?? "");
  }

  const onSubmit = (data: FormData): void => {
    mutation.mutate(data);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 480 }}>
      <Typography variant="h6" mb={2}>
        {isEdit ? "Edit Variant" : "Add Variant"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="SKU"
          fullWidth
          {...register("sku", { required: true })}
          margin="normal"
        />

        <TextField
          label="Size"
          fullWidth
          {...register("size")}
          margin="normal"
        />

        <TextField
          label="Color"
          fullWidth
          {...register("color")}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}
