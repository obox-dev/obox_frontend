import { API } from "./ApiService";

export interface Menu {
  menu_id: string,
  restaurant_id: string,
  name: string
  language_code: string
};

export class RestaurantsService {
  static async getMenusByRestaurantId(restaurantId: string) {
    return API.get<null, Menu[]>(`/restaurants/${restaurantId}/menus/`);
  }
}
