import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosGet from "../../utils/api/Connection/ConnectionApi";
import imgCover from "../../assets/img/NoCoverImg.jpg";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";

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
          <Empty />
        </div>
      ) : (
        <div className={styles.detailsContainer}>
          <img
            height={500}
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
              <strong>Director:</strong>{" "}
              {movie.directors.map((director) => director.nombre).join(", ")}
            </p>
            <p>
              <strong>Sinopsis:</strong> {movie.sinopsis}
            </p>
            <p>
              <strong>Duración:</strong> {movie.duracion}
            </p>
            <p>
              <strong>Año:</strong> {movie.anno}
            </p>
            <p>
              <strong>País:</strong> {movie.paisByTblPaisIdPais.pais}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
