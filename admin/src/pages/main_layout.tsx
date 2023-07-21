import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from './Home';

const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  const userIsAuthenticated = false; // Replace this with your authentication logic


  return (
    <div className="main-layout">
      <Header userIsAuthenticated={userIsAuthenticated} />
      <main>
        <Home />
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default MainLayout;
5
