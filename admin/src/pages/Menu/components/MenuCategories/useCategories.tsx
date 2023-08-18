import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from '@libs/react-i18next';
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
  const { t } = useTranslation(["common", "menu"]);
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
          title={t("menu:updateCategoryForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
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
              placeholder={t("menu:updateCategoryForm.placeholder")}
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
      label: t("common:buttons:edit"),
      callback: (category: GetCategoriesByMenuIdResponseItem) =>
        openCategoryEditDialog(category),
    },
    {
      label: t("common:buttons:delete"),
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
          title={t("menu:createCategoryForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
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
              placeholder={t("menu:createCategoryForm.placeholder")}
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
          title={t("menu:deleteCategoryForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>{t("menu:deleteCategoryForm.message")} {category.name}</p>
        </Dialog>
      );
    });


  return {
    openCategoryCreateDialog,
    categoriesList,
    menuCategoriesActions,
  };
};
