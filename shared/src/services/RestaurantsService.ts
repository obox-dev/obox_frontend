import { API } from "./ApiService";
import { MenuState } from "./MenuService";

export interface Menu {
  menu_id: string,
  restaurant_id: string,
  name: string,
  language_code: string,
  state: MenuState,
};

export class RestaurantsService {
  static async getMenusByRestaurantId(restaurantId: string) {
    return API.get<null, Menu[]>(`/restaurants/${restaurantId}/menus/`);
  }
}
