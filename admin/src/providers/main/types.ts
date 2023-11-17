export interface MainProviderInterface {
  menuLanguage: string;
  menuId?: string;
  categoryId?: string;
  setMenuId: (id: string) => void;
  setCategoryId: (id: string) => void;
}
