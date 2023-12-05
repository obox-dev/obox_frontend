import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '@admin/pages/Home/Home';
import { MenuPage } from '@admin/pages/Menu/MenuPage';
import NotFound from '@admin/pages/Page_404/NotFound';
import { MenuDishPage } from '@admin/pages/Menu/components/MenuDish/MenuDishPage';
import { CategoryPage } from '@admin/pages/Menu/components/MenuCategories/CategoryPage';
import Review from '@admin/pages/Review/Review';
import Analytics from '@admin/pages/Analytics/Analytics';
import Tutorials from '@admin/pages/Tutorials/Tutorials';
import Customization from '@admin/pages/Customization/Customization';
import AllMenus from '@admin/pages/AllMenus/AllMenus';
import Privacy from '@admin/pages/Privacy/Privacy';
import Pricing from '@admin/pages/Pricing/Pricing';
import RestaurantSettings from '@admin/pages/RestaurantSettings/RestaurantSettings';
import QRSettings from '@admin/pages/QRSettings/QRSettings';
import {TagsPage} from '@admin/pages/Tags/TagsPage';
import { MarksPage } from '@admin/pages/Tags/pages/Marks/MarksPage';
import { Allergens } from '@admin/pages/Tags/pages/Allergenes/Allergenes';


export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:menuId" element={<MenuPage />} />
      <Route path="/menu/:menuId/category/:categoryId" element={<CategoryPage />} />
      <Route
        path="/menu/:menuId/category/:categoryId/create-dish"
        element={<MenuDishPage />}
      />
      <Route
        path="/menu/:menuId/category/:categoryId/dish/:dishId"
        element={<MenuDishPage />}
      />
      <Route path="/tags" element={<TagsPage />} >
        <Route index element={<Navigate to="marks" />} />
        <Route path="marks" element={<MarksPage/>} />
        <Route path="allergens" element={<Allergens />} />
      </Route>
      <Route path="/reviews" element={<Review />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/customization" element={<Customization />} />
      <Route path="/all-menus" element={<AllMenus />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/restaurant-settings" element={<RestaurantSettings />} />
      <Route path="/qr-settings" element={<QRSettings />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};
