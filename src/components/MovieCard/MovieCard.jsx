import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import imgCover from "../../assets/img/NoCoverImg.jpg";

export function MovieCard({ movie }) {
  const urlAPI = "http://localhost:8000/images/";
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.idPelicula}>
        <img
          width={230}
          height={345}
          className={styles.movieImage}
          src={!movie.imagen ? imgCover : urlAPI + movie.imagen}
          alt={movie.titulo}
        />
        <div>{movie.titulo}</div>
      </Link>
    </li>
  );
}
