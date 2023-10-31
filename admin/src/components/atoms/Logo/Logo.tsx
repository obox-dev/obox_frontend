import { NavLink } from 'react-router-dom';
import { LogoIcon } from '@admin/assets/icons/LogoIcon';
import './Logo.scss';

const Logo = () => {
  return (
    <NavLink to="/">
      <div className='logo'>
        <LogoIcon />
      </div>
    </NavLink>
  );
};

export default Logo;
