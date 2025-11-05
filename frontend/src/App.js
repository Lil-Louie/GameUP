import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"



function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/Explore" element={<ExplorePage />} />
        </Routes>
      </Router>
  );
}

export default App;
