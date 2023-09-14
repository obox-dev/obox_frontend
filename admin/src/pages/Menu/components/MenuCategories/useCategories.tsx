import * as yup from "yup";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { useState, useRef } from "react";
import { useTranslation } from "@libs/react-i18next";
import { InputVariants } from "@shared/components/atoms/Input";
import { FormInput } from "@shared/components/atoms/FormInput";
import {
  MenuService,
  CategoriesService,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
  CreateCategoryResponse,
} from "@shared/services";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useRequest } from "@admin/hooks";
import { useNavigate } from "react-router-dom";

export const useCategories = (menuId: string) => {
  const { t } = useTranslation(["common", "menu"]);
  const { openDialog, closeAll } = useDialog();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const navigate = useNavigate();

  const loadCategories = () => {
    return MenuService.getCategoriesByMenuId(menuId);
  };

  const { execute: loadAllCategories } = useRequest({
    requestFunction: loadCategories,
    onSuccess: (result: Category[]) => {
      setCategoriesList(result);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });

  const { execute: loadSingleCategory } = useRequest({
    requestFunction: CategoriesService.getById,
    redirect404: true,
  });

  const MIN_NAME_LENGTH = 1;
  const MAX_NAME_LENGTH = 200;

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        t("common:validation:isRequired", { field: t("common:name") })
      )
      .min(
        MIN_NAME_LENGTH,
        t("common:validation:morethan", {
          field: t("common:name"),
          min: MIN_NAME_LENGTH,
        })
      )
      .max(
        MAX_NAME_LENGTH,
        t("common:validation:lessthan", {
          field: t("common:name"),
          max: MAX_NAME_LENGTH,
        })
      )
      .trim(),
  });

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: CategoriesService.create,
    onSuccess: async (result: CreateCategoryResponse) => {
      await loadAllCategories();
      navigate(`/menu/${menuId}/category/${result.category_id}`);
      closeAll();
    },
    onError: (error) => {
      throw error;
    },
  });

  const editSubmit = async ({ category_id, name }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
    };
    return CategoriesService.update(id, request);
  };

  const { execute: onEditSubmit } = useRequest({
    requestFunction: editSubmit,
    onSuccess: async () => {
      await loadAllCategories();
      closeAll();
    },
    onError: (error) => {
      throw error;
    },
  });

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: CategoriesService.delete,
    onSuccess: async () => {
      await loadAllCategories();
      navigate(`/menu/${menuId}`);
    },
    onFinally: () => closeAll(),
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });

  const openCategoryEditDialog = (category: Category) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);

      const defaultValues: Category = {
        ...category,
      };

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
              await onEditSubmit(data as Category);
            }}
          >
            <>
              <FormInput type={InputVariants.HIDDEN} name="category_id" />
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
      callback: (category: Category) => openCategoryEditDialog(category),
    },
    {
      label: t("common:buttons:delete"),
      callback: (category: Category) => openCategoryDeleteDialog(category),
    },
  ];

  const openCategoryCreateDialog = () =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);
      const defaultValues: CreateCategoryRequest = {
        menu_id: menuId,
        name: "",
      };

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
              await onCreateSubmit(data as CreateCategoryRequest);
            }}
          >
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="menu_id"
                value={menuId}
              />
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
            onDeleteSubmit(category.category_id);
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
          <p>
            {t("menu:deleteCategoryForm.message")}{" "}
            <strong>{category.name}</strong>
          </p>
        </Dialog>
      );
    });

  return {
    openCategoryCreateDialog,
    categoriesList,
    menuCategoriesActions,
    loadAllCategories,
    loadSingleCategory,
  };
};
