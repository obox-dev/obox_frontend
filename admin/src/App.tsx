import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Home from '../src/pages/Home';
import Restaurants from '../src/pages/Restaurants';
import Menu from '../src/pages/Menu';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
