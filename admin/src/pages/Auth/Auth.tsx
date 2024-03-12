import { Outlet } from 'react-router';
import './Auth.scss';

const Auth = () => {
  return (
    <div className="auth">
      <Outlet />
    </div>
  );
};

export default Auth;
