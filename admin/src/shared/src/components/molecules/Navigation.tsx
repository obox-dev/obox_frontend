import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname === '/restaurants');

  const handleLinkClick = (link: string) => {
    setIsActive(link === 'restaurants');
    if (link === 'restaurants') {
      navigate('/');
    } else if (link === 'menu') {
      navigate('/');
    } else if (link === 'Home') {
    navigate('/');
    }
  };

  return (
    <Nav>
      
      <Nav.Link
        className={`nav-link ${isActive ? 'text-light' : 'text-secondary'}`}
        onClick={() => handleLinkClick('restaurants')}
      >
        Restaurants
      </Nav.Link>
      <Nav.Link
        className={`nav-link ${!isActive ? 'text-light' : 'text-secondary'}`}
        onClick={() => handleLinkClick('menu')}
      >
        Menu
      </Nav.Link>
    </Nav>
  );
};

export default Navigation;
