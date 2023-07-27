import LogoImage from '@admin/assets/layout/header/Logo.png';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return <NavLink to="/">
    <img src={LogoImage} alt="Logo" style={{ width: "4rem", height: "4rem" }} />
    </NavLink>
};

export default Logo;
