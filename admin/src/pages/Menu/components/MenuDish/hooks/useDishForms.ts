import {
  CreateDishRequest,
  Dish,
  DishInStock,
  DishResponse,
  WeightUnit,
} from '@shared/services/DishService';
import { mapDishContent } from '@shared/mappers/DishMapper';
import { EntityState } from '@shared/utils/types';
import { useDishFormValidation } from '../validation/useDishFormValidation';
import { useEffect } from 'react';
import { useGetCategory } from '../../MenuCategories/hooks';
import { useMemo } from 'react';
import { mapCategoryContent } from '../../MenuCategories/mappers/mapCategoryContent';

type ExcludeKeys = 'price' | 'weight' | 'calories';
type ExcludedAsOptionalString = Record<ExcludeKeys, string | null>;
export type DishDefaultValues = Omit<CreateDishRequest, ExcludeKeys> &
  ExcludedAsOptionalString;

const mapDishToDefaultValues = (dish: Dish): DishDefaultValues => ({
  category_id: dish.category_id,
  name: dish.name,
  description: dish.description || '',
  price: dish.price.toString() || '',
  weight: dish.weight?.toString() || '',
  weight_unit: dish.weight_unit,
  calories: dish.calories?.toString() || '',
  allergens: dish.allergens,
  marks: dish.marks,
  image: dish.image,
  state: dish.state,
  in_stock: dish.in_stock,
  language: dish.language,
});

interface UseDishFormsProps {
  menuId: string;
  categoryId: string;
  currentLanguage: string;
}

export const useDishForms = (props: UseDishFormsProps) => {
  const { menuId, categoryId, currentLanguage} = props;
  const { createDishSchema } = useDishFormValidation();

  const createDishDefaultValues: DishDefaultValues = {
    category_id: categoryId,
    name: '',
    description: '',
    price: '',
    weight: '',
    weight_unit: undefined,
    calories: '',
    allergens: [],
    marks: [],
    image: null,
    state: EntityState.ENABLED,
    in_stock: DishInStock.ENABLED,
    language: currentLanguage,
  };

  const { loadAllCategories, categoriesList } = useGetCategory({
    menuId,
  });

  const getDefaultValues = (dish?: DishResponse): DishDefaultValues => {
    if (dish) {
      const dishItem = mapDishContent(dish, currentLanguage);
      return mapDishToDefaultValues(dishItem);
    }
    return createDishDefaultValues;
  };

  useEffect(() => {
    const load = async () => {
      await loadAllCategories();
    };
    load();
  }, []);

  const categoryOptions = useMemo(() => {
    return categoriesList.map((category) => {
      const { category_id, name } = mapCategoryContent(category, currentLanguage);
      return { value: category_id, label: name };
    });
  }, [categoriesList]);

  const defaultCategory = useMemo(() => {
    return categoryOptions.find((category) => category.value === categoryId);
  }, [categoryOptions.length]);

  const weightUnitOptions = [
    { label: 'gramms', value: WeightUnit.GRAMMS },
    { label: 'ml', value: WeightUnit.MILLILITERS },
  ];

  return {
    getDefaultValues,
    createDishSchema,
    createDishDefaultValues,
    defaultCategory,
    weightUnitOptions,
  };
};
