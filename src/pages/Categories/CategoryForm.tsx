import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createCategory, fetchCategories } from "../../api/categories";
import type { Category } from "../../types/catalog";

interface FormData {
  name: string;
  parentId: string | "";
}

export default function CategoryForm() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      parentId: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      name: data.name,
      parentId: data.parentId || null,
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 480 }}>
      <Typography variant="h6" mb={2}>
        Add Category
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Category Name"
          fullWidth
          {...register("name", { required: true })}
          margin="normal"
        />

        <TextField
          select
          label="Parent Category"
          fullWidth
          {...register("parentId")}
          margin="normal"
        >
          <MenuItem value="">None</MenuItem>
          {categories?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}
