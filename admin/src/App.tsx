import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import { Menu } from "./pages/Menu/Menu";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
