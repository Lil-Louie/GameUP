import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import CreatePage from "./pages/CreateGamePage";



function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/Explore" element={<ExplorePage />} />
            <Route path="/create-game" element={<CreatePage />} />
        </Routes>
      </Router>
  );
}

export default App;
