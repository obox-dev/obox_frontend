import * as yup from 'yup';
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { useState, useRef } from "react";
import { useTranslation } from '@libs/react-i18next';
import { InputVariants } from "@shared/components/atoms/Input";
import { FormInput } from "@shared/components/atoms/FormInput";
import {
  MenuService,
  CategoriesService,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
} from "@shared/services";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";

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

  const onCreateSubmit = async (data: CreateCategoryRequest, afterSubmit: () => void) => {
    try {
      const response = await CategoriesService.create(data);
      await loadCategories(menuId);
      // Navigate to category page here
      afterSubmit();
    } catch (error) {
      throw error;
    }
  };

  const onEditSubmit = async ({ category_id, name }: Category, afterSubmit: () => void) => {
    try {
      const id = category_id;
      const request: UpdateCategoryRequest = {
        name,
      };
      await CategoriesService.update(id, request);
      await loadCategories(menuId);
      afterSubmit();
    } catch (error) {
      throw error;
    }
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
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);

      const defaultValues: Category = {
        ...category,
      };

      const validationSchema = new yup.ObjectSchema({
        name: yup.string().required(t('common:validation:isRequired', { field: t('common:name') })),
      });

      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
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
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onEditSubmit(data as Category, closeDialog);
            }}
          >
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="category_id"
              />
              <FormInput
                placeholder={t("menu:updateCategoryForm.placeholder")}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
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
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);
      const defaultValues: CreateCategoryRequest = {
        menu_id: menuId,
        name: '',
      };

      const validationSchema = new yup.ObjectSchema({
        name: yup.string().required(t('common:validation:isRequired', { field: t('common:name') })).min(1, t('common:validation:morethan', { field: t('common:name') }))
        .max(200, t('common:validation:lessthan', { field: t('common:name') })).trim(),
      });

      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
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
            ref={formRef}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateCategoryRequest, closeDialog);
            }}
          >
            <>
              <FormInput type={InputVariants.HIDDEN} name="menu_id" value={menuId} />
              <FormInput
                placeholder={t("menu:createCategoryForm.placeholder")}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
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
