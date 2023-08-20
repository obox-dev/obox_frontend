import { useEffect } from "react";
import { MenuNavigation } from "./components/MenuPage/MenuNavigation";
import { Menu } from "./components/MenuPage/Menu";
import { useMenu } from "./components/MenuPage/useMenu";
import './Menu.scss';

const HARDCODED_RESTAURANT_ID = "cce45739-fcb7-428d-991f-bdbe976d71e6";

export const MenuPage = () => {
  const id = HARDCODED_RESTAURANT_ID;
  const { openMenuCreateDialog, loadMenus, menuList, menuActions  } = useMenu({
    restaurant_id: id,
  });

  useEffect(() => {
    if (id) {
      loadMenus();
    }
  }, [id]);


  return (
    <div>
      <MenuNavigation items={menuList} addMenu={openMenuCreateDialog} actions={menuActions} />
      {id && <Menu />}
    </div>
  );
};
