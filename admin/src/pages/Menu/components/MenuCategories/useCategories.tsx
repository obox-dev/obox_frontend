import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input, InputVariants } from "@shared/components/atoms/Input";
import {
  MenuService,
  CategoriesService,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  GetCategoriesByMenuIdResponseItem,
  Category,
} from "@shared/services";
import { ButtonVariants } from "@shared/components/atoms/Button";

export const useCategories = () => {
  const { openDialog } = useDialog();
  const [categoriesList, setCategoriesList] = useState<
    GetCategoriesByMenuIdResponseItem[]
  >([]);
  const HARDCODED_MENU_ID = "0ef77fa3-9507-4926-b095-37b6eec3459b";

  const loadCategories = async () => {
    try {
      const categories = await MenuService.getCategoriesByMenuId(
        HARDCODED_MENU_ID
      );
      setCategoriesList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onCreateSubmit = useCallback(async (data: CreateCategoryRequest) => {
    console.log(data);
    const category: CreateCategoryResponse = await CategoriesService.create(
      data
    );
    await loadCategories();
  }, []);

  const onEditSubmit = async ({ category_id, name }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
    };
    const category = await CategoriesService.patch(id, request);
    await loadCategories();
  };

  const onDeleteSubmit = async ({ category_id }: Category) => {
    try {
      await CategoriesService.delete(category_id);
      await loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openCategoryEditDialog = (
    category: GetCategoriesByMenuIdResponseItem
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
          title="Enter your category name"
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

  const menuCategoriesActions = [
    {
      label: "Edit",
      callback: (category: GetCategoriesByMenuIdResponseItem) =>
        openCategoryEditDialog(category),
    },
    {
      label: "Delete",
      callback: (category: GetCategoriesByMenuIdResponseItem) =>
        openCategoryDeleteDialog(category),
    },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

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
          title="Enter your category name"
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
              value={HARDCODED_MENU_ID}
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

    const openCategoryDeleteDialog = (category: GetCategoriesByMenuIdResponseItem) =>
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
          title="Are you sure you want to delete this category?"
          size="lg"
          okText="OK"
          cancelText="Cancel"
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>Confirming the deletion of category: {category.name}</p>
        </Dialog>
      );
    });


  return {
    openCategoryCreateDialog,
    categoriesList,
    menuCategoriesActions,
  };
};
