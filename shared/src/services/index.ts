import { API } from './ApiService';
// import { CategoriesService } from './CategoriesService';
// import { MenuService } from './MenuService';
// import { DishesService } from './DishService';
// import { RestaurantsService } from './RestaurantsService';
// import { AttachmentService } from './AttachmentsService';
// import { MarksService } from './MarksService';
// import { AllergensService } from './AllergensService';
// import { SearchService } from './SearchService';
// import { OrderService } from './OrderService';
// import { AuthService } from './AuthService';
import axios from 'axios';

export * from './ApiService';
export * from './CategoriesService';
export * from './MenuService';
export * from './DishService';
export * from './RestaurantsService';
export * from './AttachmentsService';
export * from './MarksService';
export * from './AllergensService';
export * from './SearchService';
export * from './OrderService';
export * from './AuthService';

// const services = [
//   CategoriesService,
//   MenuService,
//   DishesService,
//   RestaurantsService,
//   AttachmentService,
//   MarksService,
//   AllergensService,
//   OrderService,
//   AuthService,
//   SearchService,
// ]

export const confiureServices = (provider: typeof axios) => {
  API.setFetchProvider(provider);
};