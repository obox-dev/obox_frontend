import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../../components/organisms/Header';
import { Footer } from '../../components/organisms/Footer';
import Home from '../../pages/Home/Home';
import Restaurants from '../../pages/Restaurants/Restaurants';
import { MenuPage } from '../../pages/Menu/MenuPage';

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
        </Routes>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};
