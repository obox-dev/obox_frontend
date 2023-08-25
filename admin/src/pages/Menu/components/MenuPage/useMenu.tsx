import * as yup from 'yup';
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
  MenuService,
  UpdateMenuRequest,
} from "@shared/services/MenuService";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useTranslation } from '@libs/react-i18next';

interface UseMenuProps {
  restaurant_id: string;
}

const DEFAULT_LANGUAGE_CODE = "en";

export const useMenu = (props: UseMenuProps) => {
  const { t } = useTranslation();
  const { restaurant_id } = props;
  const [menuList, setMenuList] = useState<Menu[]>([]);

  const navigate = useNavigate();
  const { openDialog } = useDialog();

  const loadMenus = async () => {
    try {
      const menus = await RestaurantsService.getMenusByRestaurantId(
        restaurant_id
      );
      setMenuList(menus);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onCreateSubmit = async (data: CreateMenuRequest, afterSubmit: () => void) => {
    try {
      const response = await MenuService.create(data);
      await loadMenus();
      navigate(`/menu/${response.menu_id}`);
      afterSubmit();
    } catch (error) {
      throw error;
    }
  };

  const openMenuCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);

      const defaultValues: CreateMenuRequest = {
        name: '',
        language_code: DEFAULT_LANGUAGE_CODE,
        restaurant_id,
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
          title={t("menu:createMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
        >
          <Form ref={formRef} defaultValues={defaultValues} validationSchema={validationSchema} onSubmit={async (data) => {
              await onCreateSubmit(data as CreateMenuRequest, closeDialog);
          }}>
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="restaurant_id"
                value={restaurant_id}
              />
              <FormInput
                type={InputVariants.HIDDEN}
                name="language_code"
              />
              <FormInput
                placeholder={t("menu:createMenuForm.placeholder")}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      )
    });
  }

  const onEditSubmit = async ({ menu_id, name }: Menu, afterSubmit: () => void) => {
    try {
      const id = menu_id;
      const request: UpdateMenuRequest = {
        name,
      };
      await MenuService.update(id, request);
      await loadMenus();
      afterSubmit();
    } catch (error) {
      throw error;
    }
  };

  const openMenuEditDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);
      const defaultValues: Menu = {
        ...menu,
      };

      const validationSchema = new yup.ObjectSchema({
        name: yup.string().required(t('common:validation:isRequired', { field: t('common:name') })),
      });
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
          title={t("menu:updateMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
        >
          <Form ref={formRef} defaultValues={defaultValues} validationSchema={validationSchema} onSubmit={async (data) => {
              await onEditSubmit(data as Menu, closeDialog);
          }}>
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="restaurant_id"
              />
              <FormInput
                type={InputVariants.HIDDEN}
                name="language_code"
              />
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

  const onDeleteSubmit = async ({ menu_id }: Menu) => {
    try {
      await MenuService.delete(menu_id);
      await loadMenus();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openMenuDeleteDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(menu);
            closeDialog();
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
          {t("menu:deleteMenuForm.message")} {" "}
            <strong>{menu.name}</strong>?
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
    loadMenus,
    menuActions,
  };
};
