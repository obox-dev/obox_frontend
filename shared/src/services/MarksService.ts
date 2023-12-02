import { useRestaurant } from '@shared/hooks/useRestaurant';
import { API } from './ApiService';

const { restaurantId } = useRestaurant();

export interface MarksContent {
  name: string;
}

export interface MarksResponse {
  mark_id: string;
  translation_id: string;
  content: Record<string, MarksContent>;
}

export type Marks = MarksContent & Omit<MarksResponse, 'content'>;

export interface CreateMarksRequest {
  name: string;
  language: string;
}

export interface UpdateMarksRequest {
  name: string;
  language: string;
}

export interface CreateMarksResponse {
  mark_id: string;
}

export class MarksService {
  static async getMarksByRestaurantId(): Promise<MarksResponse[]> {
    return API.get<null, MarksResponse[]>(
      `/marks/${restaurantId}/restaurant-marks`
    );
  }

  static async getById(id: string): Promise<MarksResponse> {
    return API.get<void, MarksResponse>(`marks/${id}`);
  }

  static async create(params: CreateMarksRequest) {
    return API.post<CreateMarksRequest, CreateMarksResponse>('/marks/', params);
  }

  static async update(id: string, params: UpdateMarksRequest) {
    return API.patch<UpdateMarksRequest,CreateMarksRequest>(`/marks/${id}`, params);
  }
  
  static async delete(id: string) {
    return API.delete<void, void>(`/marks/${id}`);
  }
}
