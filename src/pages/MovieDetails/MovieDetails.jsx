import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConnection from "../../components/ConnectionApi/ConnectionApi";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axiosConnection(`peliculas/${movieId}`, setMovie);
  }, [movieId]);

  return (
    <>
      {movie != null ? (
        <div className={styles.detailsContainer}>
          <img
            className={`${styles.col} ${styles.movieImage}`}
            src={movie.imagen}
            alt={movie.titulo}
          />
          <div className={`${styles.col} ${styles.movieDetails}`}>
            <p className={styles.firstItem}>
              <strong>Título:</strong> {movie.titulo}
            </p>
            <p>
              <strong>Generos:</strong>{" "}
              {movie.generos.map((genero) => genero.genero).join(", ")}
            </p>
            <p>
              <strong>Sinopsis:</strong> {movie.sinopsis}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p>No hay datos de la película</p>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
