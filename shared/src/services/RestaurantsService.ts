import { EntityState } from '@shared/utils/types';
import { API } from './ApiService';

export interface MenuContent {
  name: string;
}
export interface MenuResponse {
  menu_id: string,
  restaurant_id: string,
  translation_id: string,
  state: EntityState,
  content: Record<string, MenuContent>,
}

export type Menu = Omit<MenuResponse, 'content'> & MenuContent;

export class RestaurantsService {
  static async getMenusByRestaurantId(restaurantId: string) {
    return API.get<null, MenuResponse[]>(`/restaurants/${restaurantId}/menus/`);
  }
}
