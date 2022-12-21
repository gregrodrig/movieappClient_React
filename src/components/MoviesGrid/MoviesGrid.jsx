import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesGrid.module.css";
import axiosGet from "../../utils/api/Connection/ConnectionApi";
import Spinner from "../../components/Spinner/Spinner";
import { UseQuery } from "../../utils/hooks/UseQuery";

function MoviesGrid() {
  const [movies, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const query = UseQuery();
  const search = query.get("titulo");

  useEffect(() => {
    setLoading(true);
    const searchUrl = search ? `/peliculas/titulo/${search}` : "peliculas";
    axiosGet(searchUrl, setMovie);
    setLoading(false);
  }, [search]);

  return (
    <>
      {isLoading && <Spinner />}
      {!movies ? (
        <p className={styles.center}>No hay películas para mostrar!</p>
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
