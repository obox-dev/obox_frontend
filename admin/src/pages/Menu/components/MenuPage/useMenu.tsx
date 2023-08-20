import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { Menu, RestaurantsService } from "@shared/services";
import { Input, InputVariants } from "@shared/components/atoms/Input";
import { CreateMenuRequest, MenuService } from "@shared/services/MenuService";

interface UseMenuProps {
  restaurant_id: string;
}

const DEFAULT_LANGUAGE_CODE = 'en';

export const useMenu = (props: UseMenuProps) => {
  const { restaurant_id } = props;
  const [menuList, setMenuList] = useState<Menu[]>([]);

  const navigate = useNavigate();
  const { openDialog } = useDialog();

  const loadMenus = async () => {
    try {
      const menus = await RestaurantsService.getMenusByRestaurantId(restaurant_id);
      setMenuList(menus);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const onCreateSubmit = async (data: CreateMenuRequest) => {
    const { menu_id } = await MenuService.create(
      data
    );
    await loadMenus();
    navigate(`/menu/${menu_id}`);
  }

  const openMenuCreateDialog = () =>
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
          title="Enter your form name"
          size="lg"
          okText="OK"
          cancelText="Cancel"
        >
          <Form
            ref={formRef as React.ForwardedRef<Menu>}
            onSubmit={onCreateSubmit}
          >
            <Input
              type={InputVariants.HIDDEN}
              name="restaurant_id"
              value={restaurant_id}
            />
            <Input
              type={InputVariants.HIDDEN}
              name="language_code"
              value={DEFAULT_LANGUAGE_CODE}
            />
            <Input
              placeholder="Enter menu name"
              type={InputVariants.TEXT}
              name="name"
            />
          </Form>
        </Dialog>
      );
  });

  return {
    openMenuCreateDialog,
    menuList,
    setMenuList,
    loadMenus,
  };
}
