import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesGrid.module.css";
import axiosConnection from "../ConnectionApi/ConnectionApi";

function MoviesGrid() {
  const [movies, setMovie] = useState(null);

  useEffect(() => {
    axiosConnection("peliculas", setMovie);
  }, []);

  return (
    <>
      {movies != null ? (
        <ul className={styles.moviesGrid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p>no hay peliculas</p>
      )}
    </>
  );
}

export default MoviesGrid;
