import { Allergens, AllergensResponse } from '@shared/services';

export const mapAllergensContent = (
  allergenItem: AllergensResponse,
  language: string
): Allergens => {
  const { content, ...allergen } = allergenItem;

  return {
    ...content[language],
    ...allergen,
  };
};