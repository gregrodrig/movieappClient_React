import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesGrid.module.css";
import axiosGet from "../../utils/api/Connection/ConnectionApi";

function MoviesGrid() {
  const [movies, setMovie] = useState(null);

  useEffect(() => {
    axiosGet("peliculas", setMovie);
  }, []);

  return (
    <>
      {!movies ? (
        <p>no hay películas</p>
      ) : (
        <ul className={styles.moviesGrid}>
          {movies.map((movie) => (
            <MovieCard key={movie.idPelicula} movie={movie} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesGrid;
