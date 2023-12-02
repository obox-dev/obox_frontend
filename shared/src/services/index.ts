export { API } from './ApiService';
export { CategoriesService } from './CategoriesService';
export { MenuService } from './MenuService';
export { DishesService } from './DishService';
export { RestaurantsService } from './RestaurantsService';
export { AttachmentService } from './AttachmentsService';
export { MarksService } from './MarksService';
export type { FileToUpload, AttachmentOrFile } from './AttachmentsService';

export type {
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  CategoryResponse,
} from './CategoriesService';
export type { MenuResponse, Menu } from './RestaurantsService';
export type { MarksResponse } from './MarksService';
