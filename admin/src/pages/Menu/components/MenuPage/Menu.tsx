import { Sidebar } from "@admin/layout/Sidebar/Sidebar";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { useTranslation } from '@libs/react-i18next';
import { useCategories } from "../MenuCategories/useCategories";
import { MenuCategoryList } from "../MenuCategories/MenuCategoryList";
import { useParams } from "react-router";
import { useEffect } from "react";

export const Menu = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { openCategoryCreateDialog, loadCategories, categoriesList, menuCategoriesActions } = useCategories(id!);

  useEffect(() => {
    if (id) {
      loadCategories(id);
    }
  }, [id]);
  return (
    <div className="menu__page d-flex">
    <Sidebar
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h4>{t("menu:categories")}</h4>
          <Button variant={ButtonVariants.SECONDARY} text={`+ ${t("menu:addcategory")}`} onClick={openCategoryCreateDialog}></Button>
        </div>
      }
    >
        <MenuCategoryList actions={menuCategoriesActions} categoryItems={categoriesList}/>
    </Sidebar>
    <div className="menu__dishes flex-grow-1 p-2">
      {id}
    </div>
    </div>

  )
}
