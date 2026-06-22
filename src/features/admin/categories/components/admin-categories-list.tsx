"use client";

import { useState } from "react";
import { useAdminCategories } from "../useAdminCategories";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { CategoryForm } from "./category-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CATEGORY_TYPES,
  type CategoryType,
} from "@/features/categories/types";

export function AdminCategoriesList() {
  const [activeType, setActiveType] = useState<CategoryType>("project");
  const { list, remove, reorder } = useAdminCategories(activeType);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = list.data?.data ?? [];

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= categories.length) return;
    const orderedIds = categories.map((c) => c.id);
    [orderedIds[index], orderedIds[nextIndex]] = [
      orderedIds[nextIndex],
      orderedIds[index],
    ];
    reorder.mutate(orderedIds);
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeType}
        onValueChange={(v) => setActiveType(v as CategoryType)}
      >
        <TabsList>
          {CATEGORY_TYPES.map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {activeType === "project" && (
        <p className="text-sm text-muted-foreground">
          Order controls Featured Projects tabs on the homepage. &quot;All&quot; is
          always shown first and is not managed here.
        </p>
      )}

      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            categoryId={editingId}
            defaultCategoryType={activeType}
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {list.isLoading && <div>Loading categories...</div>}
        {!list.isLoading && categories.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No {activeType} categories yet.
            </CardContent>
          </Card>
        )}
        {categories.map((category, index) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{category.name}</CardTitle>
                    <Badge variant="outline">{category.slug}</Badge>
                  </div>
                  <CardDescription>Order: {category.order}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveCategory(index, -1)}
                    disabled={index === 0 || reorder.isPending}
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveCategory(index, 1)}
                    disabled={
                      index === categories.length - 1 || reorder.isPending
                    }
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove.mutate(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
