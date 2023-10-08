import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SidebarNavigation } from "../../components/organisms/SidebarNavigation";
import Home from "../../pages/Home/Home";
import { MenuPage } from "../../pages/Menu/MenuPage";
import NotFound from "../../pages/Page_404/NotFound";
import { MenuDishPage } from "../../pages/Menu/components/MenuDish/MenuDishPage";

export const MainLayout: React.FC = () => {
  const userIsAuthenticated = true; // Replace this with your authentication logic

  return (
    <div className="main-layout d-flex min-vh-100">
      <SidebarNavigation userIsAuthenticated={userIsAuthenticated} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
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
    </div>
  );
};
