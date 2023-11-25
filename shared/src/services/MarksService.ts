import { useRestaurant } from '@shared/hooks/useRestaurant';
import { API } from './ApiService';

const {restaurantId} = useRestaurant();

export interface MarksContent {
  name: string;
}

export type Marks = MarksContent & Omit<MarksResponse, 'content'>;

export interface MarksResponse {
  mark_id: string;
  translation_id: string;
  content: Record<string, MarksContent>;
}

export class MarksService {
  static async getMarksByRestaurantId(): Promise<MarksResponse[]> {
    return API.get<null, MarksResponse[]>(
      `/marks/${restaurantId}/restaurant-marks`
    );
  }
}