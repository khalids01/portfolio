"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_TYPES,
  slugifyCategoryName,
  type CategoryType,
} from "@/features/categories/types";
import { useAdminCategories } from "../useAdminCategories";

type CategoryFormData = {
  name: string;
  slug: string;
  categoryType: CategoryType;
  order: number;
};

const emptyDefaults: CategoryFormData = {
  name: "",
  slug: "",
  categoryType: "project",
  order: 0,
};

interface CategoryFormProps {
  categoryId: string | null;
  defaultCategoryType: CategoryType;
  onSuccess: () => void;
}

export function CategoryForm({
  categoryId,
  defaultCategoryType,
  onSuccess,
}: CategoryFormProps) {
  const { list, create, update } = useAdminCategories(defaultCategoryType);

  const category = categoryId
    ? list.data?.data.find((c) => c.id === categoryId)
    : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues: { ...emptyDefaults, categoryType: defaultCategoryType },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        categoryType: category.categoryType,
        order: category.order,
      });
    } else {
      reset({ ...emptyDefaults, categoryType: defaultCategoryType });
    }
  }, [category, categoryId, defaultCategoryType, reset]);

  useEffect(() => {
    if (!categoryId && nameValue) {
      setValue("slug", slugifyCategoryName(nameValue), { shouldDirty: true });
    }
  }, [nameValue, categoryId, setValue]);

  const onSubmit = (data: CategoryFormData) => {
    const payload = {
      name: data.name,
      slug: data.slug || slugifyCategoryName(data.name),
      categoryType: data.categoryType,
      order: data.order,
    };

    if (categoryId) {
      update.mutate(
        { id: categoryId, name: payload.name, slug: payload.slug, order: payload.order },
        { onSuccess },
      );
    } else {
      create.mutate(payload, { onSuccess });
    }
  };

  const isPending = create.isPending || update.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <Input id="slug" {...register("slug", { required: true })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={watch("categoryType")}
            onValueChange={(v) => setValue("categoryType", v as CategoryType)}
            disabled={!!categoryId}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input
            type="number"
            id="order"
            {...register("order", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? categoryId
              ? "Updating..."
              : "Creating..."
            : categoryId
              ? "Update Category"
              : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
