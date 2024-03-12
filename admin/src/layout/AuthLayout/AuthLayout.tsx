import { LogoIcon } from '@admin/assets/icons';
import './AuthLayout.scss';

interface IAuthLayout {
  children: JSX.Element;
}

export const AuthLayout = (props: IAuthLayout) => {
  const { children } = props;
  return (
    <main className="auth-layout d-flex min-vh-100">
      <div className="auth-layout__start">
        <LogoIcon />
      </div>
      <div className="auth-layout__end">{children}</div>
    </main>
  );
};
