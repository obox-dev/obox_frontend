import { SidebarNavigation } from '../../components/organisms/SidebarNavigation';
import { MainProvider } from '@admin/providers/main';
import './MainLayout.scss';

interface IMainLayout {
  children: JSX.Element;
}

export const MainLayout = (props: IMainLayout) => {
  const { children } = props;
  const userIsAuthenticated = true; // Replace this with your authentication logic

  return (
    <div className="main-layout d-flex min-vh-100">
      <SidebarNavigation userIsAuthenticated={userIsAuthenticated} />
      <main className="flex-grow-1">
        <MainProvider>
          {/* <MainRouter /> */}
          {children}
        </MainProvider>
      </main>
    </div>
  );
};
