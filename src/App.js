import { Link, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import MovieDetails from "./views/MovieDetails/MovieDetails";
import { Search } from "../src/components/Search/Search";
import styles from "./App.module.css";
import { MovieAdd } from "./views/MovieAdd/MovieAdd";
import GenderAdd from "./views/Gender/GenderAdd/GenderAdd";
import Gender from "./views/Gender/Gender";
import Country from "./views/Country/Country";
import Actor from "./views/Actor/Actor";
import Director from "./views/Director/Director";
import GeneralAdd from "./views/GeneralAdd/GeneralAdd";
import Modal from "./components/Bootstrap/Modal/Modal";
import { GeneralModel } from "./components/InfoTable/InfoTable";

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
          <Link to="/register">Registrar</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies/:idPelicula" element={<MovieDetails />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/addmovie" element={<MovieAdd />} />
          <Route path="/updatemovie/:idPelicula" element={<MovieAdd />} />
          <Route path="/updatemodel/:idModel" element={<GeneralModel />} />
          <Route path="/general" element={<GeneralAdd />} />
          <Route path="/addgender" element={<GenderAdd />} />
          <Route path="/gender" element={<Gender />} />
          <Route path="/country" element={<Country />} />
          <Route path="/actor" element={<Actor />} />
          <Route path="/director" element={<Director />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
