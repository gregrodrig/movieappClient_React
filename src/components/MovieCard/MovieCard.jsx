import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export function MovieCard({ movie }) {
  /* const imageUrl =
    "https://sites.google.com/site/jonathanandres320/_/rsrc/1467124695099/autos-de-rapido-y-furioso/rapido-y-furioso1.jpg" +
    movie.imagen;*/
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img
          width={230}
          height={345}
          className={styles.movieImage}
          src={movie.imagen}
          alt={movie.titulo}
        />
        <div>{movie.titulo}</div>
      </Link>
    </li>
  );
}
