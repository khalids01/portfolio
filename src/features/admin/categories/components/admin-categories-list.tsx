"use client";

import { useState } from "react";
import { useAdminCategories } from "../useAdminCategories";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
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
  type Category,
  type CategoryType,
} from "@/features/categories/types";

const countLabels = [
  ["projects", "Projects"],
  ["experiences", "Experience"],
  ["educations", "Education"],
  ["skills", "Skills"],
] as const;

export function AdminCategoriesList() {
  const [activeType, setActiveType] = useState<CategoryType>("project");
  const { list, remove, reorder } = useAdminCategories(activeType);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

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

  const confirmDelete = () => {
    if (!deleteCategory || remove.isPending) return;

    remove.mutate(deleteCategory.id, {
      onSuccess: () => setDeleteCategory(null),
    });
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
                    onClick={() => setDeleteCategory(category)}
                    disabled={remove.isPending}
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={Boolean(deleteCategory)}
        onOpenChange={(open) => {
          if (!open && !remove.isPending) setDeleteCategory(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete{" "}
              <strong className="text-foreground">
                {deleteCategory?.name ?? "this category"}
              </strong>
              . Linked items will stay in the admin panel without this category.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="rounded-md border bg-muted/20 p-3">
            <div className="mb-2 text-sm font-medium">Connected items</div>
            <div className="space-y-2 text-sm">
              {countLabels.map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{label}</span>
                  <Badge variant="outline" className="rounded-md">
                    {deleteCategory?.usageCounts[key] ?? 0}
                  </Badge>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 border-t pt-2 font-medium">
                <span>Total</span>
                <Badge variant="secondary" className="rounded-md">
                  {deleteCategory?.usageCounts.total ?? 0}
                </Badge>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                confirmDelete();
              }}
              disabled={remove.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {remove.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
