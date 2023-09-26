import {
  CreateDishRequest,
  UpdateDishRequest,
  DishesService,
  Dish,
} from "@shared/services/DishService";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DishForm } from "./MenuDishForm";
import { useDish } from "./useDish";
import { useDishForms } from "./useDishForms";
import type { DishDefaultValues } from './useDishForms';


export const MenuDishPage = () => {
  const [defaultValues, setDefaultValues] = useState<DishDefaultValues | null>(null);
  const [loading, setLoading] = useState<boolean>(!!useParams().dishId);
  const { menuId, categoryId, dishId } = useParams();

  const { onCreateSubmit, onEditSubmit } = useDish(categoryId!);
  const { createDishValidationSchema, getDefaultValues } = useDishForms(categoryId!);
  const navigate = useNavigate();

  const navigateToCategory = useCallback(() => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  }, [navigate, menuId, categoryId]);

  useEffect(() => {
    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      setDefaultValues(getDefaultValues(response));
      setLoading(false);
    };

    if (dishId) {
      loadDish(dishId);
    } else {
      setDefaultValues(getDefaultValues());
      setLoading(false);
    }
  }, [dishId]);

  const handleOnSubmit = useCallback(async (data: Partial<Dish>) => {
    if (dishId) {
      await onEditSubmit(dishId, data as UpdateDishRequest);
    } else {
      await onCreateSubmit(data as CreateDishRequest);
    }
  }, [dishId, onEditSubmit, onCreateSubmit, navigateToCategory]);

  return (
    <div className="page-loader">
      {loading || !defaultValues ? (
        <div>
          {/* <h4>Loading...</h4>
          <ColorRingLoader
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass="loader"
            colors={["#FFF633", "#f47e60"]}
          /> */}
        </div>
      ) : (
        <DishForm
          onSubmit={handleOnSubmit}
          defaultValues={defaultValues}
          validationSchema={createDishValidationSchema}
        />
      )}
    </div>
  );
};

