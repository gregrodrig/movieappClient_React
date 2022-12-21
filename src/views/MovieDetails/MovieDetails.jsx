import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosGet from "../../utils/api/Connection/ConnectionApi";
import imgCover from "../../assets/img/NoCoverImg.jpg";
import Spinner from "../../components/Spinner/Spinner";

function MovieDetails() {
  const { idPelicula } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosGet(`peliculas/${idPelicula}`, setMovie);
    setLoading(false);
  }, [idPelicula]);

  return (
    <>
      {isLoading && <Spinner />}
      {!movie ? (
        <div>
          <p className={styles.center}>No hay datos de la película!</p>
        </div>
      ) : (
        <div className={styles.detailsContainer}>
          <img
            className={`${styles.col} ${styles.movieImage}`}
            src={!movie.imagen ? imgCover : movie.imagen}
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
      )}
    </>
  );
}

export default MovieDetails;
