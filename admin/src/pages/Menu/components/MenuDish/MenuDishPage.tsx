import {
  CreateDishRequest,
  UpdateDishRequest,
  DishesService,
} from "@shared/services/DishService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DishForm } from "./MenuDishForm";
import { useDish } from "./useDish";
import { useDishForms } from "./useDishForms";

export const MenuDishPage = () => {
    const [defaultValues, setDefaultValues] = useState<
    CreateDishRequest | UpdateDishRequest
  >({});
  const { menuId, categoryId, dishId } = useParams();
  const { onCreateSubmit, onEditSubmit } = useDish(
    categoryId!
  );

  const { createDishValidationSchema, createDishDefaultValues, getDefaultValues } = useDishForms(
    categoryId!
  );

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  useEffect(() => {
    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      setDefaultValues(getDefaultValues(response) as CreateDishRequest | UpdateDishRequest)
    };
    if (dishId) {
      loadDish(dishId);
    } else {
      setDefaultValues(getDefaultValues() as CreateDishRequest | UpdateDishRequest);
    }
  }, [dishId]);

  return (
    <DishForm
      onSubmit={ async (data) => {
        if (dishId) {
          await onEditSubmit(dishId, data as UpdateDishRequest, navigateToCategory);
        } else {
          await onCreateSubmit(data as CreateDishRequest, navigateToCategory);
        }
      }}
      defaultValues={defaultValues}
      validationSchema={createDishValidationSchema}
    />
  );
};
