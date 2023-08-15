import { Sidebar } from "@admin/layout/Sidebar/Sidebar";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { useTranslation } from '@libs/react-i18next';
import { useCategories } from "./components/MenuCategories/useCategories";

export const Menu = () => {
  const { t } = useTranslation();
  const { openCategoryCreateDialog } = useCategories();
  return (
    <Sidebar
      header={
        <div className="d-flex justify-content-between align-items-center">
          <h4>{t("menu:categories")}</h4>
          <Button variant={ButtonVariants.SECONDARY} text={`+ ${t("menu:addcategory")}`} onClick={openCategoryCreateDialog}></Button>
        </div>
      }
    >
      <div>
        <ul>

        </ul>
      </div>
    </Sidebar>
    // dishes
  )
}
