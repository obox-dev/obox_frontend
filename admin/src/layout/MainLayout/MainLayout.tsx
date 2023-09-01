import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Header } from "../../components/organisms/Header";
import { Footer } from "../../components/organisms/Footer";
import Home from "../../pages/Home/Home";
import Restaurants from "../../pages/Restaurants/Restaurants";
import { MenuPage } from "../../pages/Menu/MenuPage";
import NotFound from "../../pages/Page_404/NotFound";
import { MenuDishPage } from "../../pages/Menu/components/MenuDish/MenuDishPage";

export const MainLayout: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const userIsAuthenticated = true; // Replace this with your authentication logic

  return (
    <div className="main-layout d-flex flex-column min-vh-100">
      <Header userIsAuthenticated={userIsAuthenticated} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:menuId" element={<MenuPage />} />
          <Route
            path="/menu/:menuId/category/:categoryId"
            element={<MenuPage />}
          />
          <Route
            path="/menu/:menuId/category/:categoryId/create-dish"
            element={<MenuDishPage />}
          />
          <Route
            path="/menu/:menuId/category/:categoryId/dish/:dishId"
            element={<MenuDishPage />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};
