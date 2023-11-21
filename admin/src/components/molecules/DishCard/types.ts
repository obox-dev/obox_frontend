import { DishActions } from '@admin/pages/Menu/components/MenuDish/types';
import { DishResponse } from '@shared/services/DishService';

export interface IDishCard {
  dishItem: DishResponse;
  actions: DishActions;
  language: string;
}
