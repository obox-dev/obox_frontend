import { useState } from "react";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useTranslation } from "@libs/react-i18next";
import {
  Dish,
  DishesService,
} from "@shared/services/DishService";
import { CategoriesService } from "@shared/services/CategoriesService";

export const useDish = (categoryId: string) => {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const [dishList, setDishList] = useState<Dish[]>([]);

  const loadDishes = async (category_id: string) => {
    try {
      const dish = await CategoriesService.getDishesByCategoryId(category_id);
      setDishList(dish);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onDeleteSubmit = async ({ dish_id }: Dish) => {
    try {
      await DishesService.delete(dish_id);
      await loadDishes(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openDishDeleteDialog = (dish: Dish) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(dish);
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
            {t("menu:deleteMenuForm.message")} <strong>{dish.name}</strong>?
          </p>
        </Dialog>
      );
    });

  const menuDishesActions: IAction<Dish>[] = [
    {
      label: t("common:buttons:edit"),
      callback: (dish: Dish) => console.log(dish),
    },
    {
      label: t("common:buttons:delete"),
      callback: (dish: Dish) => openDishDeleteDialog(dish),
    },
  ];

  return {
    loadDishes,
    dishList,
    menuDishesActions
  };
};
