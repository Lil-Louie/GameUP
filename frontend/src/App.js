import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/Explore" element={<ExplorePage />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
