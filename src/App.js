import { Link, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <header>
        <Link to="/" className={styles.title}>
          Películas
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
