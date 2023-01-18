import { Link, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import MovieDetails from "./views/MovieDetails/MovieDetails";
import { Search } from "../src/components/Search/Search";
import styles from "./App.module.css";
import { MovieAdd } from "./views/MovieAdd/MovieAdd";
import Genero from "./views/Genero/Genero";
import Pais from "./views/Pais/Pais";
import Actor from "./views/Actor/Actor";
import Director from "./views/Director/Director";
import AgregarEditarDirector from "./views/Director/AgregarEditarDirector";
import AgregarEditarGenero from "./views/Genero/AgregarEditarGenero";
import AgregarEditarPais from "./views/Pais/AgregarEditarPais";
import AgregarEditarActor from "./views/Actor/AgregarEditarActor";

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
          {/*HOME*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          {/*PELICULA*/}
          <Route path="/addmovie" element={<MovieAdd />} />
          <Route path="/updatemovie/:idPelicula" element={<MovieAdd />} />
          <Route path="/movies/:idPelicula" element={<MovieDetails />} />
          {/*ACTOR*/}
          <Route path="/actor" element={<Actor />} />
          <Route path="/actor/add" element={<AgregarEditarActor />} />
          <Route path="/actor/edit/:idActor" element={<AgregarEditarActor />} />
          {/*DIRECTOR*/}
          <Route path="/director" element={<Director />} />
          <Route path="/director/add" element={<AgregarEditarDirector />} />
          <Route
            path="/director/edit/:idDirector"
            element={<AgregarEditarDirector />}
          />
          {/*GENERO*/}
          <Route path="/genero" element={<Genero />} />
          <Route path="/genero/add" element={<AgregarEditarGenero />} />
          <Route
            path="/genero/edit/:idGenero"
            element={<AgregarEditarGenero />}
          />
          {/*PAIS*/}
          <Route path="/pais" element={<Pais />} />
          <Route path="/pais/add" element={<AgregarEditarPais />} />
          <Route path="/pais/edit/:idPais" element={<AgregarEditarPais />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
