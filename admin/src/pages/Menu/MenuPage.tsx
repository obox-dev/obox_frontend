import { useParams } from "react-router";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { Dialog } from "@shared/components/molecules/Dialog/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { MenuNavigation } from "./components/MenuPage/MenuNavigation";
import { Menu } from "./components/MenuPage/Menu";
import './Menu.scss';
import { useEffect, useState } from "react";
import { Menu as IMenu, RestaurantsService } from "@shared/services";
import { useMenu } from "./components/MenuPage/useMenu";

const HARDCODED_RESTAURANT_ID = "cce45739-fcb7-428d-991f-bdbe976d71e6";

// RestaurantsService

export const MenuPage = () => {
  const id = HARDCODED_RESTAURANT_ID;
  const { openMenuCreateDialog, loadMenus, menuList } = useMenu({
    restaurant_id: id,
  });

  useEffect(() => {
    if (id) {
      loadMenus();
    }
  }, [id]);


  return (
    <div>
      {/* <h1>Menu</h1>
      <p>Menu items go here.</p>
      <Button onClick={openMenuDialog} text="Open menu dialog" variant={ButtonVariants.PRIMARY}/> */}
      <MenuNavigation items={menuList} addMenu={openMenuCreateDialog} />
      {id && <Menu />}
    </div>
  );
};
