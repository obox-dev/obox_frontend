import { BrowserRouter as Router } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout/MainLayout";
import { DialogProvider } from "@shared/providers/DialogProvider";

const App = () => {
  return (
    <DialogProvider>
      <Router>
        <MainLayout />
      </Router>
    </DialogProvider>
  );
};

export default App;
