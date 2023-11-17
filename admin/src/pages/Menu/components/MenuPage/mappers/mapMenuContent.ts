import { Menu, MenuResponse } from '@shared/services';

export const mapMenuContent = (
  menuItem: MenuResponse,
  language: string
): Menu => {
  const { content, ...menu } = menuItem;

  return {
    ...content[language],
    ...menu,
  };
};
