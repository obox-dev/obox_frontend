import { useState } from 'react';
import { useRequest } from '@admin/hooks';
import { Menu, MenuService, RestaurantsService } from '@shared/services';

interface GetMenuParams {
  restaurant_id: string;
}

export const useGetMenu = (args: GetMenuParams) => {
  const { restaurant_id } = args;

  const [menuList, setMenuList] = useState<Menu[]>([]);

  const loadMenus = () => {
    return RestaurantsService.getMenusByRestaurantId(restaurant_id);
  };

  const { execute: loadAllMenus } = useRequest({
    requestFunction: loadMenus,
    onSuccess: (result: Menu[]) => {
      setMenuList(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  const { execute: loadSingleMenu } = useRequest({
    requestFunction: MenuService.getById,
    redirect404: true,
  });

  return {
    loadSingleMenu,
    loadAllMenus,
    menuList,
  };
};
