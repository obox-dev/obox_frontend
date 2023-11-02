import { API } from './ApiService';
import { MenuState } from './MenuService';

export interface MenuContent {
  name: string;
}

export interface MenuResponse {
  menu_id: string,
  restaurant_id: string,
  translation_id: string,
  state: MenuState,
  content: Record<string, MenuContent>,
}
export interface Menu {
  menu_id: string,
  restaurant_id: string,
  translation_id: string,
  state: MenuState,
  name: string,
}

export class RestaurantsService {
  static async getMenusByRestaurantId(restaurantId: string) {
    return API.get<null, MenuResponse[]>(`/restaurants/${restaurantId}/menus/`);
  }
}
