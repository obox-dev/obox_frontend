import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from '@admin/routes/MainRouter';
import { MainLayout } from './layout/MainLayout/MainLayout';
import { AuthLayout } from './layout/AuthLayout/AuthLayout';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useEffect, useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = useSelector(
    (state: RootState) => state.session.accessToken
  );

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [accessToken]);
  const renderLayout = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return (
        <MainLayout>
          <MainRouter />
        </MainLayout>
      );
    }

    return (
      <AuthLayout>
        <MainRouter />
      </AuthLayout>
    );
  };
  // const user = false;
  return (
    <Router>
      {/* <MainRouter /> */}
      {renderLayout(isAuthenticated)}
    </Router>
  );
};

export default App;
