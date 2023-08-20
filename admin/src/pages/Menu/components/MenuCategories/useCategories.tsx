import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from '@libs/react-i18next';
import { Input, InputVariants } from "@shared/components/atoms/Input";
import {
  MenuService,
  CategoriesService,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
} from "@shared/services";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { categorySchema } from "./categoryValidation";

export const useCategories = (menuId: string) => {
  const { t } = useTranslation(["common", "menu"]);
  const { openDialog } = useDialog();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const loadCategories = async (id: string) => {
    try {
      const categories = await MenuService.getCategoriesByMenuId(id);
      setCategoriesList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onCreateSubmit = useCallback(
    async (data: CreateCategoryRequest) => {
      await CategoriesService.create(data);
      await loadCategories(menuId);
    },
    [menuId]
  );

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

  const openCategoryEditDialog = (category: Category) =>
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

  const menuCategoriesActions: IAction<Category>[] = [
    {
      label: t("common:buttons:edit"),
      callback: (category: Category) =>
        openCategoryEditDialog(category),
    },
    {
      label: t("common:buttons:delete"),
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
          title={t("menu:createCategoryForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
        >
          <Form
            ref={formRef as React.ForwardedRef<Category>}
            onSubmit={onCreateSubmit}
          >
            <Input type={InputVariants.HIDDEN} name="menu_id" value={menuId} />
            <Input
              placeholder={t("menu:createCategoryForm.placeholder")}
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
          title={t("menu:deleteCategoryForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>{t("menu:deleteCategoryForm.message")} <strong>{category.name}</strong></p>
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
