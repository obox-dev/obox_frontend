import { useEffect } from "react";
import { useParams } from "react-router";
import { MenuNavigation } from "./components/MenuPage/MenuNavigation";
import { Menu } from "./components/MenuPage/Menu";
import { useMenu } from "./components/MenuPage/useMenu";
import './Menu.scss';

const HARDCODED_RESTAURANT_ID = "cce45739-fcb7-428d-991f-bdbe976d71e6";

export const MenuPage = () => {
  const { menuId } = useParams();
  const restaurantId = HARDCODED_RESTAURANT_ID;
  const { openMenuCreateDialog, loadMenus, menuList, menuActions  } = useMenu({
    restaurant_id: restaurantId,
  });

  useEffect(() => {
    if (restaurantId) {
      loadMenus();
    }
  }, [restaurantId]);


  return (
    <div>
      <MenuNavigation items={menuList} addMenu={openMenuCreateDialog} actions={menuActions} />
      {menuId && <Menu menuId={menuId} />}
    </div>
  );
};
