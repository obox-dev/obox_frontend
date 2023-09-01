import * as yup from "yup";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { Menu, RestaurantsService } from "@shared/services";
import { InputVariants } from "@shared/components/atoms/Input";
import { FormInput } from "@shared/components/atoms/FormInput";
import {
  CreateMenuRequest,
  CreateMenuResponse,
  MenuService,
  UpdateMenuRequest,
} from "@shared/services/MenuService";
import { useRequest } from "@shared/hooks";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useTranslation } from "@libs/react-i18next";

interface UseMenuProps {
  restaurant_id: string;
}

const DEFAULT_LANGUAGE_CODE = "en";

export const useMenu = (props: UseMenuProps) => {
  const { t } = useTranslation();
  const { restaurant_id } = props;
  const [menuList, setMenuList] = useState<Menu[]>([]);

  const navigate = useNavigate();
  const { openDialog, closeAll } = useDialog();

  const loadMenus = () => {
    return RestaurantsService.getMenusByRestaurantId(restaurant_id);
  };

  const { execute: loadAllMenus } = useRequest({
    requestFunction: loadMenus,
    onSuccess: (result: Menu[]) => {
      setMenuList(result);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });

  const { execute: loadSingleMenu } = useRequest({
    requestFunction: MenuService.getById,
    redirect404: true,
  });

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: MenuService.create,
    onSuccess: async (result: CreateMenuResponse) => {
      await loadAllMenus();
      navigate(`/menu/${result.menu_id}`);
      closeAll();
    },
    onError: (error) => {
      throw error;
    },
  });

  const openMenuCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);

      const defaultValues: CreateMenuRequest = {
        name: "",
        language_code: DEFAULT_LANGUAGE_CODE,
        restaurant_id,
      };

      const validationSchema = new yup.ObjectSchema({
        name: yup
          .string()
          .required(
            t("common:validation:isRequired", { field: t("common:name") })
          )
          .min(1, t("common:validation:morethan", { field: t("common:name") }))
          .max(
            200,
            t("common:validation:lessthan", { field: t("common:name") })
          )
          .trim(),
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
          title={t("menu:createMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateMenuRequest);
            }}
          >
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="restaurant_id"
                value={restaurant_id}
              />
              <FormInput type={InputVariants.HIDDEN} name="language_code" />
              <FormInput
                placeholder={t("menu:createMenuForm.placeholder")}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  };

  const editSubmit = async ({ menu_id, name }: Menu) => {
    const id = menu_id;
    const request: UpdateMenuRequest = {
      name,
    };

    return MenuService.update(id, request);
  };

  const { execute: onEditSubmit } = useRequest({
    requestFunction: editSubmit,
    onSuccess: async () => {
      await loadAllMenus();
      closeAll()
    },
    onError: (error) => {
      throw error;
    },
  });

  const openMenuEditDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);
      const defaultValues: Menu = {
        ...menu,
      };

      const validationSchema = new yup.ObjectSchema({
        name: yup
          .string()
          .required(
            t("common:validation:isRequired", { field: t("common:name") })
          ),
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
          title={t("menu:updateMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onEditSubmit(data as Menu);
            }}
          >
            <>
              <FormInput type={InputVariants.HIDDEN} name="restaurant_id" />
              <FormInput type={InputVariants.HIDDEN} name="language_code" />
              <FormInput
                placeholder={t("menu:createMenuForm.placeholder")}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: MenuService.delete,
    onSuccess: async () => {
      await loadAllMenus();
      navigate("/menu")
    },
    onFinally: () => closeAll(),
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });

  const openMenuDeleteDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(menu.menu_id);
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t("menu:deleteMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>
            {t("menu:deleteMenuForm.message")} <strong>{menu.name}</strong>?
          </p>
        </Dialog>
      );
    });

  const menuActions: IAction<Menu>[] = [
    {
      label: t("common:buttons:edit"),
      callback: (menu: Menu) => openMenuEditDialog(menu),
    },
    {
      label: t("common:buttons:delete"),
      callback: (menu: Menu) => openMenuDeleteDialog(menu),
    },
  ];

  return {
    openMenuCreateDialog,
    menuList,
    setMenuList,
    loadSingleMenu,
    loadAllMenus,
    menuActions,
  };
};
