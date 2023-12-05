import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CreateDishRequest,
  Dish,
  DishInStock,
  DishResponse,
  WeightUnit,
} from '@shared/services/DishService';
import { EntityState } from '@shared/utils/types';
import { mapCategoryContent } from '../../MenuCategories/mappers/mapCategoryContent';
import { AllergensService } from '@shared/services';
import { MarksService } from '@shared/services';
import {
  Allergens,
  AllergensResponse,
} from '@shared/services/AllergensService';
import { Marks, MarksResponse } from '@shared/services/MarksService';
import { OptionType } from '@shared/components/atoms/SelectInput/types';
import { mapDishContent } from '@shared/mappers/DishMapper';
import { useRequest } from '@admin/hooks';
import { useGetCategory } from '../../MenuCategories/hooks';
import { useDishFormValidation } from '../validation/useDishFormValidation';
import { useRestaurant } from '@shared/hooks/useRestaurant';

type ExcludeNullableKeys =
  | 'price'
  | 'weight'
  | 'calories'
  | 'special_price'
  | 'cooking_time';

type ExcludeSelectOptionsKeys =
  | 'category_id'
  | 'weight_unit'
  | 'allergens'
  | 'marks';
type ExcludedAsNullableString = Record<ExcludeNullableKeys, string | null>;
type ExcludedAsSelectOptions = Record<
  ExcludeSelectOptionsKeys,
  OptionType<string>[] | OptionType<string> | undefined
>;
export type DishDefaultValues = Omit<
  CreateDishRequest,
  ExcludeNullableKeys | ExcludeSelectOptionsKeys
> &
  ExcludedAsNullableString &
  ExcludedAsSelectOptions;
interface UseDishFormsProps {
  menuId: string;
  categoryId: string;
  currentLanguage: string;
  dish?: DishResponse;
}

export const useDishForms = (props: UseDishFormsProps) => {
  const { menuId, categoryId, currentLanguage, dish } = props;
  const { createDishSchema } = useDishFormValidation();
  const { restaurantId } = useRestaurant();

  const [defaultValues, setDefaultValues] = useState<DishDefaultValues>();

  const { loadAllCategories, categoriesList } = useGetCategory({
    menuId,
  });

  const createDishDefaultValues: DishDefaultValues = {
    category_id: undefined,
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

  const getCreateDishDefaultValues = useCallback(
    (defaultCategory: OptionType<string>) => {
      return {
        ...createDishDefaultValues,
        category_id: defaultCategory,
      };
    },
    [categoryId, categoriesList.length]
  );

  const getUpdateDishDefaultValues = useCallback((
    dish: Dish,
    category: OptionType<string>,
    allergens: OptionType<string>[],
    marks: OptionType<string>[],
    weight_unit?: OptionType<string>
  ): DishDefaultValues => ({
    category_id: category,
    name: dish.name,
    description: dish.description || '',
    price: dish.price.toString() || '',
    special_price: dish.special_price?.toString() || '',
    cooking_time: dish.cooking_time?.toString() || '',
    weight: dish.weight?.toString() || '',
    calories: dish.calories?.toString() || '',
    image: dish.image,
    state: dish.state,
    in_stock: dish.in_stock,
    language: dish.language,
    marks,
    allergens,
    weight_unit,
  }), [dish]);

  const weightUnitOptions = [
    { label: 'gramms', value: WeightUnit.GRAMMS },
    { label: 'ml', value: WeightUnit.MILLILITERS },
    { label: 'pieces', value: WeightUnit.PIECES },
  ];

  const [allAllergens, setAllAllergens] = useState<AllergensResponse[]>([]);

  const loadAllAllergensByRestaurantId = () => {
    return AllergensService.getAllergensByRestaurantId(restaurantId);
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

  const [allMarks, setAllMarks] = useState<MarksResponse[]>([]);

  const loadAllMarksByRestId = () => {
    return MarksService.getMarksByRestaurantId(restaurantId);
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

  const loadFormOptions = useCallback(async () => {
    await loadAllCategories();
    await loadAllMarks();
    await loadAllAllergens();
  }, []);

  useEffect(() => {
    loadFormOptions();
  }, []);

  useEffect(() => {
    if (categoriesList.length) {
      
      if (!dish) {
        const preSelectedCategory = categoriesList.find(
          (category) => category.category_id === categoryId
        );
        const defaultCategory = mapCategoryContent(
          preSelectedCategory!,
          currentLanguage
        );
        setDefaultValues(
          getCreateDishDefaultValues({
            label: defaultCategory.name,
            value: defaultCategory.category_id,
          })
        );
      } else if (allAllergens.length && allMarks.length) {
        const { allergens, marks, category_id, weight_unit } = dish;
        const preSelectedCategory = categoriesList.find(
          (category) => category.category_id === category_id
        );

        const defaultCategory = mapCategoryContent(
          preSelectedCategory!,
          currentLanguage
        );

        const selectedCategory = {
          label: defaultCategory.name,
          value: defaultCategory.category_id,
        };

        const selectedAllergens = allAllergens.filter((allergen) => allergens?.includes(allergen.allergen_id)).map((allergen) => ({
          value: allergen.allergen_id,
          label: allergen.content[currentLanguage].name,
        }));

        const selectedMarks = allMarks.filter((mark) => marks?.includes(mark.mark_id)).map((mark) => ({
          value: mark.mark_id,
          label: mark.content[currentLanguage].name,
        }));

        const selectedWeightUnit = weightUnitOptions.find((wu) => wu.value === weight_unit);

        const dishContent = mapDishContent(dish, currentLanguage);

        const defaults = getUpdateDishDefaultValues(dishContent, selectedCategory, selectedAllergens, selectedMarks, selectedWeightUnit);

        setDefaultValues(defaults);
      }
    }
  }, [categoriesList, allAllergens, allMarks, dish]);

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

  const categoryOptions = useMemo(() => {
    return categoriesList.map((category) => {
      const { category_id, name } = mapCategoryContent(
        category,
        currentLanguage
      );
      return { value: category_id, label: name };
    });
  }, [categoriesList]);

  const allergensOptions = useMemo(() => {
    return allAllergens.map((allergen) => {
      const { allergen_id, name } = mapAllergensContent(
        allergen,
        currentLanguage
      );
      return { value: allergen_id, label: name };
    });
  }, [allAllergens]);

  const marksOptions = useMemo(() => {
    return allMarks.map((mark) => {
      const { mark_id, name } = mapMarkContent(mark, currentLanguage);
      return { value: mark_id, label: name };
    });
  }, [allMarks]);

  return {
    loadFormOptions,
    createDishSchema,
    defaultValues,
    weightUnitOptions,
    allergensOptions,
    marksOptions,
    categoryOptions,
    categoriesList,
  };
};
