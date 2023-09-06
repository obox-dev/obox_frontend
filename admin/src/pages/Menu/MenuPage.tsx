import { useEffect } from "react";
import { useParams } from "react-router";
import { MenuNavigation } from "./components/MenuPage/MenuNavigation";
import { Menu } from "./components/MenuPage/Menu";
import { useMenu } from "./components/MenuPage/useMenu";
import "./Menu.scss";

const HARDCODED_RESTAURANT_ID = "6d8c575c-a32f-41de-b9fd-614643f7b55b";

export const MenuPage = () => {
  const { menuId } = useParams();
  const restaurantId = HARDCODED_RESTAURANT_ID;
  const {
    openMenuCreateDialog,
    loadSingleMenu,
    loadAllMenus,
    menuList,
    menuActions,
  } = useMenu({
    restaurant_id: restaurantId,
  });

  useEffect(() => {
    if (menuId) {
      loadSingleMenu(menuId);
    }
  }, [menuId]);

  useEffect(() => {
    if (restaurantId) {
      loadAllMenus();
    }
  }, [restaurantId]);

  return (
    <div>
      <MenuNavigation
        items={menuList}
        addMenu={openMenuCreateDialog}
        actions={menuActions}
      />
      {menuId && <Menu menuId={menuId} />}
    </div>
  );
};
