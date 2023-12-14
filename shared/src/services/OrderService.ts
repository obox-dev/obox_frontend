import { ReferenceType } from '@shared/utils/types';
import { API } from './ApiService';

export interface OrderRequest {
  reference_id: string;
  reference_type: ReferenceType;
  sorted_list: string[];
}

export class OrderService {
  static async orderById(params: OrderRequest): Promise<void> {
    return API.post<OrderRequest, void>('/order/', params);
  }
}
