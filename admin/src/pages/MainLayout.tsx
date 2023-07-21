import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from './Home';
import Restaurants from './Restaurants';
import Menu from './Menu';

const MainLayout: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const userIsAuthenticated = false; // Replace this with your authentication logic

  return (
    <div className="main-layout">
      <Header userIsAuthenticated={userIsAuthenticated} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu" element={<Menu />} />
          {/* Add more routes for other pages if needed */}
        </Routes>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default MainLayout;
