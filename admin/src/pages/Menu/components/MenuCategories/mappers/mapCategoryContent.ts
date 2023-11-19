import { Category, CategoryResponse } from '@shared/services';

export const mapCategoryContent = (
  categoryItem: CategoryResponse,
  language: string
): Category => {
  const { content, ...category } = categoryItem;

  return {
    ...content[language],
    ...category,
  };
};
