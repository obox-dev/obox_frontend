import {
  CreateDishRequest,
  UpdateDishRequest,
  DishesService,
} from "@shared/services/DishService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DishForm } from "./MenuDishForm";
import { useDish } from "./useDish";

export const MenuDishPage = () => {
  const [defaultValues, setDefaultValues] = useState<
    CreateDishRequest | UpdateDishRequest
  >({});
  const { menuId, categoryId, dishId } = useParams();
  const {
    createDishValidationSchema,
    onCreateSubmit,
    getDefaultValues,
    onEditSubmit,
  } = useDish(categoryId!);

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  useEffect(() => {
    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      setDefaultValues(getDefaultValues(response));
    };
    if (dishId) {
      loadDish(dishId);
    }
  }, [dishId]);

  return (
    <DishForm
      onSubmit={(data) => {
        if (dishId) {
          onEditSubmit(dishId, data as UpdateDishRequest, navigateToCategory);
        } else {
          onCreateSubmit(data as CreateDishRequest, navigateToCategory);
        }
      }}
      defaultValues={defaultValues}
      validationSchema={createDishValidationSchema}
    />
  );
};
