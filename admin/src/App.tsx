import { BrowserRouter as Router } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout/MainLayout";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
