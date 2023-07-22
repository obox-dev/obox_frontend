import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import RestIco from '@admin/assets/layout/header/rest_ico.png';
import MenuIco from '@admin/assets/layout/header/menu_ico.png';

const Navigation = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname === '/');

  const handleLinkClick = (link: string) => {
    if (link === 'restaurants') {
      setIsActive(true);
    } else if (link === 'menu') {
      setIsActive(false);
    }
  };

  return (
    <Nav>
      <Nav.Item>
        <NavLink
          to="/restaurants"
          className={`nav-link ${isActive ? 'text-light' : 'text-secondary'}`}
          onClick={() => handleLinkClick('restaurants')}
        >
          <img src={RestIco} alt="R" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
          Restaurants
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/menu"
          className={`nav-link ${!isActive ? 'text-light' : 'text-secondary'}`}
          onClick={() => handleLinkClick('menu')}
        >
          <img src={MenuIco} alt="M" style={{  width: '30px', height: '30px', marginRight: '5px'  }} />
          Menu
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
