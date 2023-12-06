import { SidebarNavigation } from '../../components/organisms/SidebarNavigation';
import { MainProvider } from '@admin/providers/main';
import { MainRouter } from '@admin/routes/MainRouter';
import './MainLayout.scss';

export const MainLayout = () => {
  const userIsAuthenticated = true; // Replace this with your authentication logic

  return (
    <div className="main-layout d-flex min-vh-100">
      <SidebarNavigation userIsAuthenticated={userIsAuthenticated} />
      <main className="flex-grow-1">
        <MainProvider>
          <MainRouter />
        </MainProvider>
      </main>
    </div>
  );
};
