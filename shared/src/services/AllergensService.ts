import { useRestaurant } from '@shared/hooks/useRestaurant';
import { API } from './ApiService';

const {restaurantId} = useRestaurant();

export interface AllergensContent {
  name: string;
}

export type Allergens = AllergensContent & Omit<AllergensResponse, 'content'>;

export interface AllergensResponse {
  allergen_id: string;
  translation_id: string;
  content: Record<string, AllergensContent>;
}

export class AllergensService {
  static async getAllergensByRestaurantId(): Promise<AllergensResponse[]> {
    return API.get<null, AllergensResponse[]>(
      `/allergens/${restaurantId}/restaurant-allergens`
    );
  }
}
