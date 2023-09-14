import * as yup from "yup";
import { useTranslation } from "@libs/react-i18next";
import {
  CreateDishRequest,
  Dish,
  DishState,
} from "@shared/services/DishService";

type ExcludeKeys = "price" | "weight" | "calories";
type ExcludedAsOptionalString = Record<ExcludeKeys, string | null>;
export type DishDefaultValues = Omit<CreateDishRequest, ExcludeKeys> &
  ExcludedAsOptionalString;

const mapDishToDefaultValues = (dish: Dish): DishDefaultValues => ({
  category_id: dish.category_id,
  name: dish.name,
  description: dish.description || "",
  price: dish.price.toString() || "",
  weight: dish.weight?.toString() || "",
  calories: dish.calories?.toString() || "",
  allergens: dish.allergens,
  tags: dish.tags,
  state: dish.state,
});

export const useDishForms = (categoryId: string) => {
  const { t } = useTranslation();

  const createDishDefaultValues: DishDefaultValues = {
    category_id: categoryId,
    name: "",
    description: "",
    price: "",
    weight: "",
    calories: "",
    allergens: [],
    tags: [],
    state: DishState.ENABLED,
  };

  const MIN_NAME_LENGTH = 1;
  const MAX_NAME_LENGTH = 200;
  // const MIN_PRICE = 1;
  const MAX_PRICE = 100000;
  const MIN_WEIGHT = 1;
  const MAX_WEIGHT = 100000;
  const MIX_CALORIES = 1;
  const MAX_CALORIES = 30000;

  const createDishValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        t("common:validation:isRequired", { field: t("dishForm:name") })
      )
      .min(
        MIN_NAME_LENGTH,
        t("common:validation:morethan", {
          field: t("common:name"),
          min: MIN_NAME_LENGTH,
        })
      )
      .max(
        MAX_NAME_LENGTH,
        t("common:validation:lessthan", {
          field: t("common:name"),
          max: MAX_NAME_LENGTH,
        })
      )
      .trim(),
    price: yup
      .number()
      .required(
        t("common:validation:isRequired", { field: t("dishForm:price") })
      )
      .typeError(
        t("common:validation:isRequired", { field: t("dishForm:price") })
      )
      .positive()
      .max(
        MAX_PRICE,
        t("dishForm:maxprice", { field: t("dishForm:price"), max: MAX_PRICE })
      ),
    description: yup.string(),
    weight: yup
      .mixed()
      .nullable()
      .test(
        "min-max",
        t("dishForm:weightbetween", {
          field: t("dishForm:weight"),
          min: MIN_WEIGHT,
          max: MAX_WEIGHT,
        }),
        (value) => {
          if ((value as number) === null) return true;
          return (
            (value as number) >= MIN_WEIGHT && (value as number) <= MAX_WEIGHT
          );
        }
      ),
    calories: yup
      .mixed()
      .nullable()
      .test(
        "min-max",
        t("dishForm:caloriesbetween", {
          field: t("dishForm:calories"),
          min: MIX_CALORIES,
          max: MAX_CALORIES,
        }),
        (value) => {
          if ((value as number) === null) return true;
          return (
            (value as number) >= MIX_CALORIES &&
            (value as number) <= MAX_CALORIES
          );
        }
      ),
    state: yup.string(),
  }) as yup.ObjectSchema<Partial<Dish>>;

  const getDefaultValues = (dish?: Dish): DishDefaultValues => {
    if (dish) {
      return mapDishToDefaultValues(dish);
    }
    return createDishDefaultValues;
  };

  return {
    getDefaultValues,
    createDishValidationSchema,
    createDishDefaultValues,
  };
};
