import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import React, { useState, useRef, useCallback } from "react";
import { Input, InputVariants } from "@shared/components/atoms/Input";
import {
  MenuService,
  CategoriesService,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  Category,
} from "@shared/services";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";

export const useCategories = (menuId: string) => {
  const { openDialog } = useDialog();
  const [categoriesList, setCategoriesList] = useState<
    Category[]
  >([]);

  const loadCategories = async (id: string) => {
    try {
      const categories = await MenuService.getCategoriesByMenuId(
        id
      );
      setCategoriesList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onCreateSubmit = useCallback(async (data: CreateCategoryRequest) => {
    await CategoriesService.create(
      data
    );
    await loadCategories(menuId);
  }, [menuId]);

  const onEditSubmit = async ({ category_id, name }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
    };
    await CategoriesService.update(id, request);
    await loadCategories(menuId);
  };

  const onDeleteSubmit = async ({ category_id }: Category) => {
    try {
      await CategoriesService.delete(category_id);
      await loadCategories(menuId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openCategoryEditDialog = (
    category: Category
  ) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef | null>(null);
      const [val, setVal] = useState(category.name);
      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
              closeDialog();
            }
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title="Edit Category"
          size="lg"
          okText="OK"
          cancelText="Cancel"
        >
          <Form
            ref={formRef as React.ForwardedRef<Category>}
            onSubmit={onEditSubmit}
          >
            <Input
              type={InputVariants.HIDDEN}
              name="category_id"
              value={category.category_id}
            />
            <Input
              placeholder="Enter your category name"
              type={InputVariants.TEXT}
              name="name"
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
              }}
            />
          </Form>
        </Dialog>
      );
    });

  const menuCategoriesActions: IAction<Category>[] = [
    {
      label: "Edit",
      callback: (category: Category) =>
        openCategoryEditDialog(category),
    },
    {
      label: "Delete",
      callback: (category: Category) =>
        openCategoryDeleteDialog(category),
    },
  ];

  const openCategoryCreateDialog = () =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef | null>(null);
      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
              closeDialog();
            }
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title="Create Category"
          size="lg"
          okText="OK"
          cancelText="Cancel"
        >
          <Form
            ref={formRef as React.ForwardedRef<Category>}
            onSubmit={onCreateSubmit}
          >
            <Input
              type={InputVariants.HIDDEN}
              name="menu_id"
              value={menuId}
            />
            <Input
              placeholder="Enter your category name"
              type={InputVariants.TEXT}
              name="name"
            />
          </Form>
        </Dialog>
      );
  });

  const openCategoryDeleteDialog = (category: Category) =>
  openDialog(({ closeDialog }) => {
    return (
      <Dialog
        okCallback={() => {
          onDeleteSubmit(category);
          closeDialog();
        }}
        cancelCallback={() => {
          closeDialog();
        }}
        title="Delete Category"
        size="lg"
        okText="OK"
        cancelText="Cancel"
        okButtonVariant={ButtonVariants.DANGER}
      >
        <p>Are you sure you want to delete this category: <strong>{category.name}</strong>?</p>
      </Dialog>
    );
  });


  return {
    openCategoryCreateDialog,
    categoriesList,
    menuCategoriesActions,
    loadCategories,
  };
};
