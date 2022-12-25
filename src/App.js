import { Link, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import MovieDetails from "./views/MovieDetails/MovieDetails";
import { Search } from "../src/components/Search/Search";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <header className={styles.header}>
        <div className={`${styles.title} ${styles.item}`}>
          <Link to="/">Películas</Link>
        </div>
        <div className={styles.item}>
          <Search />
        </div>
        <div className={`${styles.userReg} ${styles.item}`}>
          <Link to="/login">Iniciar Sesion</Link> /{" "}
          <Link to="/register">Register</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:idPelicula" element={<MovieDetails />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
