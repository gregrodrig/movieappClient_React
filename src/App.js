import { Link, Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import MovieDetails from "./views/MovieDetails/MovieDetails";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <header className={styles.title}>
        <Link to="/">Películas</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:idPelicula" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
