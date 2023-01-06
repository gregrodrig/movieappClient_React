import styles from "./MovieDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  axiosGet,
  axiosDelete,
} from "../../utils/api/Connection/ConnectionApi";
import imgCover from "../../assets/img/NoCoverImg.jpg";
import Spinner from "../../components/Spinner/Spinner";
import { Empty } from "../../components/EmptyMovie/Empty";
import { ThreeDots } from "../../components/Dropdown/ThreeDots/ThreeDots";

function MovieDetails() {
  const { idPelicula } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const urlAPI = "http://localhost:8000/images/";

  useEffect(() => {
    setLoading(true);
    axiosGet(`peliculas/${idPelicula}`, setMovie);
    setLoading(false);
  }, [idPelicula]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Seguro deseas eliminar la película "${movie.titulo}", No.: ${idPelicula}`
      )
    ) {
      axiosDelete(`peliculas/${idPelicula}`, setMovie);
      alert(
        `La película "${movie.titulo}", No.: ${idPelicula} ya fue eliminada con éxito!`
      );
    }
  };
  return (
    <>
      {isLoading && <Spinner />}
      {!movie ? (
        <div>
          <Empty msg="pelicula" />
        </div>
      ) : (
        <div className={styles.detailsContainer}>
          <img
            height={500}
            className={`${styles.col} ${styles.movieImage}`}
            src={!movie.imagen ? imgCover : urlAPI + movie.imagen}
            alt={movie.titulo}
          />
          <div className={`${styles.col} ${styles.movieDetails}`}>
            <div className={styles.menuTitle}>
              <p className={styles.firstItem}>
                <strong>Título:</strong> {movie.titulo}
              </p>
              <ThreeDots
                item={[
                  <Link onClick={() => handleDelete()}>Eliminar</Link>,
                  <Link to={`/updatemovie/${idPelicula}`}>Actualizar</Link>,
                ]}
              />
            </div>
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
