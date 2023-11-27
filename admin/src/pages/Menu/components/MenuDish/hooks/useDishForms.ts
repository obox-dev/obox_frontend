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
import { useRequest } from '@admin/hooks';
import { AllergensService } from '@shared/services';
import { MarksService } from '@shared/services';
import { useState } from 'react';
import {
  Allergens,
  AllergensResponse,
} from '@shared/services/AllergensService';
import { Marks, MarksResponse } from '@shared/services/MarksService';

type ExcludeKeys =
  | 'price'
  | 'weight'
  | 'calories'
  | 'special_price'
  | 'cooking_time';
type ExcludedAsOptionalString = Record<ExcludeKeys, string | null>;
export type DishDefaultValues = Omit<CreateDishRequest, ExcludeKeys> &
  ExcludedAsOptionalString;

const mapDishToDefaultValues = (dish: Dish): DishDefaultValues => ({
  category_id: dish.category_id,
  name: dish.name,
  description: dish.description || '',
  price: dish.price.toString() || '',
  special_price: dish.special_price?.toString() || '',
  cooking_time: dish.cooking_time?.toString() || '',
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
  const { menuId, categoryId, currentLanguage } = props;
  const { createDishSchema } = useDishFormValidation();

  const createDishDefaultValues: DishDefaultValues = {
    category_id: categoryId,
    name: '',
    description: '',
    price: '',
    special_price: '',
    cooking_time: '',
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

  const categoryOptions = useMemo(() => {
    return categoriesList.map((category) => {
      const { category_id, name } = mapCategoryContent(
        category,
        currentLanguage
      );
      return { value: category_id, label: name };
    });
  }, [categoriesList]);

  // const defaultCategory = useMemo(() => {
  //   return categoryOptions.find((category) => category.value === categoryId);
  // }, [categoryOptions.length]);

  const weightUnitOptions = [
    { label: 'gramms', value: WeightUnit.GRAMMS },
    { label: 'ml', value: WeightUnit.MILLILITERS },
  ];

  const [allAllergens, setAllAllergens] = useState<AllergensResponse[]>([]);

  const loadAllAllergensByRestaurantId = () => {
    return AllergensService.getAllergensByRestaurantId();
  };

  const { execute: loadAllAllergens } = useRequest({
    requestFunction: loadAllAllergensByRestaurantId,
    onSuccess: (result: AllergensResponse[]) => {
      setAllAllergens(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  const mapAllergensContent = (
    allergeneItem: AllergensResponse,
    language: string
  ): Allergens => {
    const { content, ...allergen } = allergeneItem;

    return {
      ...content[language],
      ...allergen,
    };
  };

  const allergensOptions = useMemo(() => {
    return allAllergens.map((allergen) => {
      const { allergen_id, name } = mapAllergensContent(
        allergen,
        currentLanguage
      );
      return { value: allergen_id, label: name };
    });
  }, [allAllergens]);

  const [allMarks, setAllMarks] = useState<MarksResponse[]>([]);

  const loadAllMarksByRestId = () => {
    return MarksService.getMarksByRestaurantId();
  };

  const { execute: loadAllMarks } = useRequest({
    requestFunction: loadAllMarksByRestId,
    onSuccess: (result: MarksResponse[]) => {
      setAllMarks(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  useEffect(() => {
    const load = async () => {
      await loadAllMarks();
      await loadAllAllergens();
      await loadAllCategories();
    };
    load();
  }, []);

  const mapMarkContent = (
    allergeneItem: MarksResponse,
    language: string
  ): Marks => {
    const { content, ...allergen } = allergeneItem;

    return {
      ...content[language],
      ...allergen,
    };
  };

  const marksOptions = useMemo(() => {
    return allMarks.map((mark) => {
      const { mark_id, name } = mapMarkContent(mark, currentLanguage);
      return { value: mark_id, label: name };
    });
  }, [allMarks]);

  return {
    getDefaultValues,
    createDishSchema,
    createDishDefaultValues,
    weightUnitOptions,
    allergensOptions,
    marksOptions,
    categoryOptions,
  };
};
